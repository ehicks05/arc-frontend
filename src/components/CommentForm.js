import React, { useState } from "react";
import { Button } from "./index";
import { useCreateCommentMutation } from "../generated/graphql";

const CommentForm = ({
  postId,
  parentComment,
  toggleReplyBox,
  refetchPost,
}) => {
  const [content, setContent] = useState("");
  const [createComment, { loading, error }] = useCreateCommentMutation();

  const handleClick = async () => {
    const data = {
      postId,
      parentCommentId: parentComment?.id,
      level: parentComment?.level === undefined ? 0 : parentComment.level + 1,
      content,
    };

    await createComment({ variables: { input: data } });
    refetchPost();
    setContent("");

    // the top level 'make a comment' input shouldn't be hidden
    if (toggleReplyBox) toggleReplyBox();
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <textarea
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        className="block"
        disabled={!content}
        onClick={() => handleClick()}
      >
        Submit
      </Button>
    </div>
  );
};

export default CommentForm;
