import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { useModal } from 'react-modal-hook';
import { formatDistance } from 'date-fns';
import AuthDialog from './AuthDialog';
import useUser from '../useUser';

import { Button, Comments, CommentCreateForm, VoteInput } from './index';
import {
  useDeleteCommentMutation,
  Direction,
  useCreateUserCommentVoteMutation,
  useDeleteUserCommentVoteMutation,
  CommentFragment,
} from '../generated/graphql';
import { DIRECTION_TO_VALUE, HydratedComment } from './utils';
import CommentEditForm from './CommentEditForm';

interface Props {
  comment: HydratedComment;
  refetchPost: () => void;
  notInTree?: boolean;
}

const Comment = ({ comment, refetchPost, notInTree }: Props) => {
  const { username } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClickDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await deleteComment({ variables: { id } });
      refetchPost();
    }
  };

  const [createUserCommentVote] = useCreateUserCommentVoteMutation();
  const [deleteUserCommentVote] = useDeleteUserCommentVoteMutation();

  const handleVote = async (direction: Direction) =>
    comment.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === comment.userVote.direction
      ? deleteUserCommentVote({ variables: { commentId: comment.id } })
      : createUserCommentVote({
          variables: { input: { commentId: comment.id, direction } },
        });

  const isAuthor = username === comment.authorId;

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
            handleUpvote={() => handleVote(Direction.Up)}
            handleDownvote={() => handleVote(Direction.Down)}
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
              <div className="flex flex-col gap-4 text-sm leading-tight">
                {!showEditForm &&
                  comment.content.split('\n').map(p => (
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
                      username
                        ? () => setShowReplyForm(!showReplyForm)
                        : showAuthModal
                    }
                  >
                    Reply
                  </Button>
                  <Button
                    disabled={!isAuthor}
                    className="text-xs"
                    onClick={
                      username ? () => setShowEditForm(!showEditForm) : showAuthModal
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={!isAuthor}
                    className="text-xs"
                    onClick={
                      username ? () => handleClickDelete(comment.id) : showAuthModal
                    }
                  >
                    Delete
                  </Button>
                </div>
              )}

              {showReplyForm && (
                <div className="mt-2">
                  <CommentCreateForm
                    postId={comment.postId}
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
  <div className="flex gap-2 text-xs">
    <button className="text-base" onClick={() => setMinimized(!minimized)}>
      {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
    </button>
    <Link
      className={`opacity-75 ${!comment.authorId && 'pointer-events-none'}`}
      to={`/users/${comment?.authorId}`}
    >
      {comment?.authorId || '[Deleted]'}
    </Link>
    <span>
      <span
        className="opacity-50"
        title={new Date(comment.createdAt).toLocaleString()}
      >
        {formatDistance(new Date(comment.createdAt), new Date())}
      </span>
      {comment.createdAt !== comment.updatedAt && (
        <span title={new Date(comment.updatedAt).toLocaleString()}>*</span>
      )}
    </span>
    <span className="opacity-50">{comment.netVotes} pts</span>
  </div>
);

export default Comment;
