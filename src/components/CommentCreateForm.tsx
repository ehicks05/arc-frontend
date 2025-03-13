import {
  type CommentFragment,
  useCreateCommentMutation,
} from '@/generated/graphql';
import { useState } from 'react';
import { CommentForm, Loading } from '.';

interface Props {
  postId: string;
  parentComment?: CommentFragment;
  setEditMode: (isEdit: boolean) => void;
  refetchPost: () => void;
}

const CommentCreateForm = ({
  postId,
  parentComment,
  setEditMode,
  refetchPost,
}: Props) => {
  const [content, setContent] = useState('');
  const [createComment, { loading, error }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    setEditMode(false);
    await createComment({
      variables: {
        input: {
          postId,
          parentCommentId: parentComment?.id,
          level: (parentComment?.level || 0) + 1,
          content,
        },
      },
    });
    refetchPost();
  };

  if (loading || error) return <Loading error={error} />;

  return (
    <CommentForm
      content={content}
      setContent={setContent}
      handleSubmit={handleSubmit}
      setEditMode={setEditMode}
    />
  );
};

export default CommentCreateForm;
