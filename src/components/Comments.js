import React, { useState } from "react";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";

import { deleteComment } from "../api";
import CommentForm from "./CommentForm";

const Comments = ({ comments }) => {
  return (
    <div className="p-2">
      {comments &&
        comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
    </div>
  );
};

const Comment = ({ comment }) => {
  const [minimized, setMinimized] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const indent = `ml-${comment.level}`;
  return (
    <div className={`${indent} m-2 p-2 border`} key={comment.id}>
      <div className="flex gap-4">
        <button onClick={() => setMinimized(!minimized)}>
          {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
        </button>
        <span className="text-xs">{comment.author.username}</span>
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
          <CommentActions
            comment={comment}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
          />

          {showReplyForm && (
            <CommentForm
              postId={comment.postId}
              parentCommentId={comment.id}
              toggleReplyBox={setShowReplyForm}
            />
          )}

          {comment.comments?.length > 0 && (
            <Comments comments={comment.comments} />
          )}
        </>
      )}
    </div>
  );
};

const CommentActions = ({ comment, showReplyForm, setShowReplyForm }) => {
  return (
    <div className="flex pt-1 gap-4">
      <button
        className="p-0.5 border"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        Reply
      </button>
      <button
        className="p-0.5 border "
        onClick={() => deleteComment(comment.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Comments;
