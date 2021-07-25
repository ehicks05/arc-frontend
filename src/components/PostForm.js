import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./index";
import { useCreatePostMutation } from "../generated/graphql";

const PostForm = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");

  const [createPost, { loading, error }] = useCreatePostMutation();

  const handleClick = async () => {
    const input = {
      title,
      link,
      content,
    };

    try {
      const result = await createPost({ variables: { input } });
      const newPostId = result?.data.createPost.id;

      history.push(`/posts/${newPostId}`);
    } catch (err) {}
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="">
      <div>
        <label>Title</label>
        <div>
          <input
            type="text"
            className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
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
            className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
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
            className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
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
