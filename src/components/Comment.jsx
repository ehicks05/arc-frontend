import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";
import useUser from "../useUser";

import { Button, Comments, CommentCreateForm, VoteInput } from "./index";
import {
  useDeleteCommentMutation,
  Direction,
  useCreateUserCommentVoteMutation,
  useDeleteUserCommentVoteMutation,
} from "../generated/graphql";
import { DIRECTION_TO_VALUE } from "./utils";
import CommentEditForm from "./CommentEditForm";
import { formatDistance } from "date-fns";

const Comment = ({ comment, refetchPost, notInTree }) => {
  const { username } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteComment({ variables: { id } });
      await refetchPost();
    }
  };

  const [createUserCommentVote] = useCreateUserCommentVoteMutation();
  const [deleteUserCommentVote] = useDeleteUserCommentVoteMutation();

  const handleVote = async (direction) => {
    comment.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === comment.userVote.direction
      ? await deleteUserCommentVote({
          variables: { commentId: comment.id },
        })
      : await createUserCommentVote({
          variables: { input: { commentId: comment.id, direction } },
        });
  };

  const isAuthor = username === comment.authorId;

  const bgClass =
    comment.level % 2 === 0 || notInTree
      ? "bg-neutral-50 dark:bg-neutral-900"
      : "bg-neutral-100 dark:bg-neutral-800";
  return (
    <div
      className={`${bgClass} p-2 border dark:border-gray-600`}
      key={comment.id}
    >
      <div className="flex gap-2">
        {!minimized && (
          <VoteInput
            netVotes={comment.netVotes}
            direction={comment.userVote?.direction}
            handleUpvote={() => handleVote(Direction.Up)}
            handleDownvote={() => handleVote(Direction.Down)}
          />
        )}
        {minimized && <div className="w-4"></div>}
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
              {!showEditForm && (
                <div className="whitespace-pre-line">{comment.content}</div>
              )}

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
                      username
                        ? () => setShowEditForm(!showEditForm)
                        : showAuthModal
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={!isAuthor}
                    className="text-xs"
                    onClick={
                      username
                        ? () => handleClickDelete(comment.id)
                        : showAuthModal
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

              {comment.commentForest?.length > 0 && (
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

const Header = ({ comment, minimized, setMinimized }) => {
  return (
    <div className="flex gap-2 text-xs">
      <button className="text-base" onClick={() => setMinimized(!minimized)}>
        {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
      </button>
      <Link
        className={`opacity-75 ${!comment.authorId && "pointer-events-none"}`}
        to={`/users/${comment?.authorId}`}
      >
        {comment?.authorId || "[Deleted]"}
      </Link>
      <span>
        <span className="opacity-50" title={new Date(comment.createdAt)}>
          {formatDistance(new Date(comment.createdAt), new Date())}
        </span>
        {comment.createdAt !== comment.updatedAt && (
          <span title={new Date(comment.updatedAt)}>*</span>
        )}
      </span>
      <span className="opacity-50">
        {comment.netVotes} pts
      </span>
    </div>
  );
};

export default Comment;
