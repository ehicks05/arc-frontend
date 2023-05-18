import React, { useState } from 'react';
import { CommentForm, Loading } from './index';
import { CommentFragment, useCreateCommentMutation } from '../generated/graphql';

interface Props {
  postId: string;
  parentComment: CommentFragment;
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
    await createComment({
      variables: {
        input: {
          postId,
          parentCommentId: parentComment?.id,
          level: parentComment?.level === undefined ? 0 : parentComment.level + 1,
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

export default CommentCreateForm;