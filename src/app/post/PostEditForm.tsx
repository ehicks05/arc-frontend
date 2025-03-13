import { Button, Loading } from '@/components/index';
import {
  type PostDetailFragment,
  useUpdatePostMutation,
} from '@/generated/graphql';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  post: PostDetailFragment;
  setEditMode: (isEditMode: boolean) => void;
}

const PostEditForm = ({ post, setEditMode }: Props) => {
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

  if (loading || error) return <Loading error={error} />;

  return (
    <div>
      <TextareaAutosize
        minRows={3}
        className="w-full text-sm dark:bg-neutral-800 dark:text-neutral-100"
        placeholder="add some content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="flex text-xs gap-4">
        <Button className="text-xs" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
        <Button
          className="text-xs"
          disabled={!content}
          onClick={() => handleClick()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PostEditForm;
