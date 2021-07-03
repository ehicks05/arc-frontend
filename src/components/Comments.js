import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";

import { deleteComment } from "../api";
import { Button, CommentForm } from "./index";

const Comments = ({ comments }) => {
  return (
    <div className="flex flex-col gap-2">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

const Comment = ({ comment }) => {
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation((data) => deleteComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

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
          title={comment.createdAt}
          className="text-xs"
          datetime={comment.createdAt}
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
                onClick={() => deleteCommentMutation.mutate(comment.id)}
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
              <Comments comments={comment.comments} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
