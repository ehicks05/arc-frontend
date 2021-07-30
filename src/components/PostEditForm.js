import React, { useState } from "react";
import { Button } from "./index";
import { useUpdatePostMutation } from "../generated/graphql";

const PostEditForm = ({ post, setEditMode, refetchPost }) => {
  const [content, setContent] = useState(post.content);
  const [updatePost, { loading, error }] = useUpdatePostMutation();

  const handleClick = async () => {
    await updatePost({
      variables: {
        input: {
          id: post.id,
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
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add some content"}
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

export default PostEditForm;
