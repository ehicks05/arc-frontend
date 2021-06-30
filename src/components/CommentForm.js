import React, { useState } from "react";
import { addComment } from "../api";
import { Button } from "./index";

const CommentForm = ({ postId, parentCommentId, toggleReplyBox }) => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
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
        className="border p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="block" disabled={!text} onClick={() => handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};

export default CommentForm;
