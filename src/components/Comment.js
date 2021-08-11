import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";
import { Auth } from "@supabase/ui";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";

import { Button, Comments, CommentForm, VoteInput } from "./index";
import {
  useDeleteCommentMutation,
  Direction,
  useCreateUserCommentVoteMutation,
  useDeleteUserCommentVoteMutation,
} from "../generated/graphql";
import { DIRECTION_TO_VALUE } from "./utils";
import CommentEditForm from "./CommentEditForm";

const Comment = ({ comment, refetchPost }) => {
  const { user } = Auth.useUser();
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

  const isAuthor = user?.id === comment.author?.id;

  const bgClass =
    comment.level % 2 === 0
      ? "bg-gray-50 dark:bg-gray-900"
      : "bg-white dark:bg-black";
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
                      user
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
                      user
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
                      user ? () => handleClickDelete(comment.id) : showAuthModal
                    }
                  >
                    Delete
                  </Button>
                </div>
              )}

              {showReplyForm && (
                <div className="mt-2">
                  <CommentForm
                    postId={comment.postId}
                    parentComment={comment}
                    toggleReplyBox={setShowReplyForm}
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
    <div className="flex gap-4 text-xs">
      <button className="text-base" onClick={() => setMinimized(!minimized)}>
        {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
      </button>
      <Link
        className={`${!comment.author && "pointer-events-none"}`}
        to={`/users/${comment?.author?.id}`}
      >
        {comment?.author?.username || "[Deleted]"}
      </Link>
      <span>
        <TimeAgo
          title={new Date(comment.createdAt)}
          datetime={comment.createdAt}
          opts={{ minInterval: 60 }}
        />
        {comment.createdAt !== comment.updatedAt && (
          <span title={new Date(comment.updatedAt)}>*</span>
        )}
      </span>
    </div>
  );
};

export default Comment;
