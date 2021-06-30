import React, { useState } from "react";
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
  const [minimized, setMinimized] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const indent = `ml-${comment.level}`;
  return (
    <div className={`${indent} p-2 border`} key={comment.id}>
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

const CommentActions = ({ comment, showReplyForm, setShowReplyForm }) => {
  return (
    <div className="flex pt-1 gap-4">
      <Button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</Button>
      <Button onClick={() => deleteComment(comment.id)}>Delete</Button>
    </div>
  );
};

export default Comments;
