import React, { useState } from "react";
import CommentForm from "./CommentForm.js";

const deleteComment = async (commentId) => {
  await fetch({
    method: "DELETE",
    url: "/api/comments/" + commentId,
    async: false,
    success: function (data) {
      console.log(data);
      //getPosts();
    },
  });
};

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
  const [showReplyForm, setShowReplyForm] = useState(false);
  const indent = `ml-${comment.level}`;
  return (
    <div className={`${indent} m-2 p-2 border`} key={comment.id}>
      <span>
        <span>{comment.author}</span>
        <span title={"id: " + comment.id}>{comment.content}</span>
      </span>
      <div className="flex pt-1 gap-4">
        <button
          className="p-0.5 border"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button>
        <button
          className="p-0.5 border"
          onClick={() => deleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {showReplyForm && (
        <CommentForm
          postId={comment.postId}
          parentCommentId={comment.id}
          toggleReplyBox={setShowReplyForm}
        />
      )}

      {comment.comments?.length > 0 && <Comments comments={comment.comments} />}
    </div>
  );
};

export default Comments;
