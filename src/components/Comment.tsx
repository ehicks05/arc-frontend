import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { useModal } from 'react-modal-hook';
import { formatDistance } from 'date-fns';
import { HydratedComment } from '@/types';
import { AuthDialog, CommentEditForm } from '@/components';
import { useUser } from '@/hooks';

import { Button, Comments, CommentCreateForm, VoteInput } from './index';
import {
  useDeleteCommentMutation,
  VoteDirection,
  useCreateUserCommentVoteMutation,
  useDeleteUserCommentVoteMutation,
  CommentFragment,
} from '@/generated/graphql';
import { DIRECTION_TO_VALUE } from '@/constants';

interface Props {
  comment: HydratedComment;
  refetchPost: () => void;
  notInTree?: boolean;
}

const Comment = ({ comment, refetchPost, notInTree }: Props) => {
  const { user } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClickDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await deleteComment({ variables: { input: { id } } });
      refetchPost();
    }
  };

  const [createUserCommentVote] = useCreateUserCommentVoteMutation();
  const [deleteUserCommentVote] = useDeleteUserCommentVoteMutation();

  const handleVote = async (direction: VoteDirection) =>
    comment.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === comment.userVote.direction
      ? deleteUserCommentVote({ variables: { input: { commentId: comment.id } } })
      : createUserCommentVote({
          variables: { input: { commentId: comment.id, direction } },
        });

  const isAuthor = user?.id === comment.author?.id;

  const bgClass =
    comment.level % 2 === 0 || notInTree
      ? 'bg-neutral-50 dark:bg-neutral-900'
      : 'bg-neutral-100 dark:bg-neutral-800';
  return (
    <div className={`${bgClass} p-2 border-y dark:border-gray-800`} key={comment.id}>
      <div className="flex gap-2">
        {!minimized && (
          <VoteInput
            direction={comment.userVote?.direction}
            handleUpvote={() => handleVote(VoteDirection.Up)}
            handleDownvote={() => handleVote(VoteDirection.Down)}
          />
        )}
        {minimized && <div className="w-4" />}
        <div className="w-full">
          <Header
            comment={comment}
            minimized={minimized}
            setMinimized={setMinimized}
          />
          {!minimized && (
            <>
              {showEditForm && (
                <CommentEditForm
                  comment={comment}
                  setEditMode={setShowEditForm}
                  refetchPost={refetchPost}
                />
              )}
              <div className="flex flex-col gap-5 p-1 text-sm dark:text-neutral-200">
                {!showEditForm &&
                  comment.content.split(/\n\n/).map(p => (
                    <p key={p} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
              </div>

              {!comment.deleted && !showEditForm && (
                <div className="flex pt-1 gap-4">
                  <Button
                    className="text-xs"
                    onClick={
                      user ? () => setShowReplyForm(!showReplyForm) : showAuthModal
                    }
                  >
                    Reply
                  </Button>
                  {isAuthor && (
                    <>
                      <Button
                        disabled={!isAuthor}
                        className="text-xs"
                        onClick={
                          user ? () => setShowEditForm(!showEditForm) : showAuthModal
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={!isAuthor}
                        className="text-xs"
                        onClick={
                          user ? () => handleClickDelete(comment.id) : showAuthModal
                        }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              )}

              {showReplyForm && (
                <div className="mt-2">
                  <CommentCreateForm
                    postId={comment.post.id}
                    parentComment={comment}
                    setEditMode={setShowReplyForm}
                    refetchPost={refetchPost}
                  />
                </div>
              )}

              {comment?.commentForest && comment.commentForest.length > 0 && (
                <div className="mt-2">
                  <Comments
                    comments={comment.commentForest}
                    refetchPost={refetchPost}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  comment: CommentFragment;
  minimized: boolean;
  setMinimized: (isMinimized: boolean) => void;
}

const Header = ({ comment, minimized, setMinimized }: HeaderProps) => (
  <div className="flex items-center gap-1 text-xs opacity-50">
    <button className="text-sm" onClick={() => setMinimized(!minimized)}>
      {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
    </button>
    <Link
      className={`${!comment.author?.id && 'pointer-events-none'}`}
      to={`/users/${comment?.author?.id}`}
    >
      {comment?.author?.username || '[Deleted]'}
    </Link>
    <span>|</span>
    <span>
      <span title={new Date(comment.createdAt).toLocaleString()}>
        {formatDistance(new Date(comment.createdAt), new Date())}
      </span>
      {comment.createdAt !== comment.updatedAt && (
        <span title={new Date(comment.updatedAt).toLocaleString()}>*</span>
      )}
    </span>
    <span>|</span>
    <span>{comment.netVotes} pts</span>
  </div>
);

export default Comment;
