import React, { useState } from "react";
import { Button, Loading } from "./index";
import { useUpdatePostMutation } from "../generated/graphql";

const PostEditForm = ({ post, setEditMode }) => {
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
    setEditMode(false);
  };

  if (loading || error) return <Loading loading={loading} error={error} />;

  return (
    <div>
      <textarea
        className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-neutral-600 dark:text-neutral-100"
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
