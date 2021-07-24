import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";

import { Button, Comments, CommentForm } from "./index";
import { useDeleteCommentMutation } from "../generated/graphql";

const Comment = ({ comment }) => {
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const queryClient = useQueryClient();

  const [deleteComment, { data, loading, error }] = useDeleteCommentMutation();

  const handleClick = async (id) => {
    deleteComment({ variables: { id } });
    queryClient.invalidateQueries("posts");
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
          {comment?.author?.username || "[Removed]"}
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
              />
            </div>
          )}

          {comment.comments?.length > 0 && (
            <div className="mt-2">
              <Comments comments={comment.commentForest} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
