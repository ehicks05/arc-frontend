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
  const ml = `ml-${comment.level}`;
  return (
    <div className={`${ml} p-2 border`} key={comment.id}>
      <span>
        <span>{comment.author}</span>
        <span title={"id: " + comment.id}>{comment.content}</span>
      </span>
      <div className="flex gap-4">
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

      <Comments comments={comment.comments} />
    </div>
  );
};

export default Comments;
