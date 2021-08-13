import React, { useState } from "react";
import { CommentForm } from "./index";
import { useCreateCommentMutation } from "../generated/graphql";

const CommentCreateForm = ({
  postId,
  parentComment,
  setEditMode,
  refetchPost,
}) => {
  const [content, setContent] = useState("");
  const [createComment, { loading, error }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    await createComment({
      variables: {
        input: {
          postId,
          parentCommentId: parentComment?.id,
          level:
            parentComment?.level === undefined ? 0 : parentComment.level + 1,
          content,
        },
      },
    });
    refetchPost();
    setEditMode(false);
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

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
