import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "./index";
import { useCreatePostMutation } from "../generated/graphql";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const [createPost, { loading, error }] = useCreatePostMutation();

  const handleClick = async () => {
    const data = {
      title,
      link,
      content,
    };

    await createPost({ variables: data });
    queryClient.invalidateQueries("posts");

    // navigate somewhere?
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <input
        type="text"
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a link (optional)"}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <textarea
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        className="block"
        disabled={!title || !content}
        onClick={() => handleClick()}
      >
        Submit
      </Button>
    </div>
  );
};

export default PostForm;
