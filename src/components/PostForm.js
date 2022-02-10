import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Loading } from "./index";
import { useCreatePostMutation } from "../generated/graphql";

const PostForm = () => {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");

  const [createPost, { loading, error }] = useCreatePostMutation();

  const handleClick = async () => {
    try {
      const result = await createPost({
        variables: {
          input: {
            title,
            link,
            content,
          },
        },
      });
      const newPostId = result?.data.createPost.id;

      location.push(`/posts/${newPostId}`);
    } catch (err) {}
  };

  if (loading || error) return <Loading loading={loading} error={error} />;

  return (
    <div className="">
      <div>
        <label>Title</label>
        <div>
          <input
            type="text"
            className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
            placeholder={"add a title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Link</label>
        <div>
          <input
            type="text"
            className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
            placeholder={"add a link (optional)"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Content</label>
        <div>
          <textarea
            className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
            placeholder={"add content"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
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
