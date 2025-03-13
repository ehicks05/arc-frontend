import {
  type CommentFragment,
  useUpdateCommentMutation,
} from '@/generated/graphql';
import React, { useState } from 'react';
import { CommentForm, Loading } from '.';

interface Props {
  comment: CommentFragment;
  setEditMode: (isEdit: boolean) => void;
  refetchPost: () => void;
}

const CommentEditForm = ({ comment, setEditMode, refetchPost }: Props) => {
  const [content, setContent] = useState(comment.content);
  const [updateComment, { loading, error }] = useUpdateCommentMutation();

  const handleSubmit = async () => {
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

export default CommentEditForm;
