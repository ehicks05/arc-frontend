import React, { useState } from "react";
import { addComment } from "../api";

const CommentForm = ({ postId, parentCommentId, toggleReplyBox }) => {
  const [text, setText] = useState("");

  const submitComment = async () => {
    const data = JSON.stringify({
      postId: postId,
      parentCommentId: parentCommentId,
      text: text,
    });

    await addComment(data);
    setText("");

    // the top level 'make a comment' input shouldn't be hidden
    if (toggleReplyBox) toggleReplyBox();
  };

  return (
    <div className="">
      <textarea
        className="dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="" disabled={!text} onClick={() => submitComment()}>
        Submit
      </button>
    </div>
  );
};

export default CommentForm;
