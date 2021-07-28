import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";

import { Button, Comments, CommentForm } from "./index";
import { useDeleteCommentMutation } from "../generated/graphql";

const Comment = ({ comment, refetchPost }) => {
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClick = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteComment({ variables: { id } });
      await refetchPost();
    }
  };

  const indent = `ml-${comment.level}`;
  const bgClass =
    comment.level % 2 === 0
      ? "bg-gray-50 dark:bg-gray-900"
      : "bg-white dark:bg-black";
  return (
    <div
      className={`${indent} ${bgClass} p-2 border dark:border-gray-600`}
      key={comment.id}
    >
      <div className="flex gap-4">
        <button onClick={() => setMinimized(!minimized)}>
          {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
        </button>
        <Link
          className={`text-xs ${!comment.author && "pointer-events-none"}`}
          to={`/users/${comment?.author?.id}`}
        >
          {comment?.author?.username || "[Deleted]"}
        </Link>
        <TimeAgo
          title={new Date(comment.createdAt)}
          className="text-xs"
          datetime={comment.createdAt}
          opts={{ minInterval: 60 }}
        />
      </div>
      {!minimized && (
        <>
          <div>
            <span>{comment.content}</span>
          </div>
          {!comment.deleted && (
            <div className="flex pt-1 gap-4">
              <Button
                className="text-xs"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Reply
              </Button>
              <Button
                className="text-xs"
                onClick={() => handleClick(comment.id)}
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
  );
};

export default Comment;
