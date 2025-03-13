import { Button, Loading } from '@/components';
import { useCreatePostMutation } from '@/generated/graphql';
import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

const PostForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');

  const [createPost, { loading, error }] = useCreatePostMutation();
  const { resetStore } = useApolloClient();

  const handleClick = async () => {
    try {
      await resetStore();
      const result = await createPost({
        variables: {
          input: {
            title,
            link,
            content,
          },
        },
      });
      const newPostId = result?.data?.createPost?.id;
      navigate(`/posts/${newPostId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || error) return <Loading error={error} />;

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div>
        <label>Title</label>
        <div>
          <TextareaAutosize
            className="w-full p-1 border dark:border-gray-600 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="add a title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Link</label>
        <div>
          <TextareaAutosize
            className="w-full p-1 border dark:border-gray-600 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="add a link (optional)"
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Content</label>
        <div>
          <TextareaAutosize
            minRows={3}
            className="w-full p-1 border dark:border-gray-600 dark:bg-neutral-800 dark:text-neutral-100"
            placeholder="add content"
            value={content}
            onChange={e => setContent(e.target.value)}
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
