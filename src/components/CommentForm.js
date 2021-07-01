import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addComment } from "../api";
import { Button } from "./index";

const CommentForm = ({ postId, parentComment, toggleReplyBox }) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation((data) => addComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleSubmit = async () => {
    const data = {
      post: { connect: { id: postId } },
      parentComment: parentComment?.id
        ? { connect: { id: parentComment?.id } }
        : undefined,
      level: parentComment?.level === undefined ? 0 : parentComment.level + 1,
      content: content,
    };

    createCommentMutation.mutate(data);
    setContent("");

    // the top level 'make a comment' input shouldn't be hidden
    if (toggleReplyBox) toggleReplyBox();
  };

  if (createCommentMutation.isLoading) return <div>loading...</div>;
  if (createCommentMutation.isError)
    return <div>{createCommentMutation.error}</div>;

  return (
    <div className="">
      <textarea
        className="border dark:border-gray-600 p-1 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        className="block"
        disabled={!content}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default CommentForm;
