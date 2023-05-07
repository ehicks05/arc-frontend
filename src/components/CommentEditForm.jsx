import React, { useState } from "react";
import { CommentForm, Loading } from "./index";
import { useUpdateCommentMutation } from "../generated/graphql";

const CommentEditForm = ({ comment, setEditMode, refetchPost }) => {
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

  if (loading || error) return <Loading loading={loading} error={error} />;

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
