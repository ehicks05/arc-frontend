import React, { useState } from "react";
import { Button } from "./index";
import { useUpdateCommentMutation } from "../generated/graphql";

const CommentEditForm = ({ comment, setEditMode, refetchPost }) => {
  const [content, setContent] = useState(comment.content);
  const [updateComment, { loading, error }] = useUpdateCommentMutation();

  const handleClick = async () => {
    await updateComment({
      variables: {
        input: {
          id: comment.id,
          content,
        },
      },
    });
    refetchPost();
    setEditMode(false);
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <textarea
        className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-4">
        <Button
          className="text-xs"
          disabled={!content}
          onClick={() => handleClick()}
        >
          Submit
        </Button>
        <Button className="text-xs" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CommentEditForm;
