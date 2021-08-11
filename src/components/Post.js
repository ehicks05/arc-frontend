import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Auth } from "@supabase/ui";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";

import {
  useDeletePostMutation,
  useGetPostByIdQuery,
} from "../generated/graphql";
import { CommentForm, Comments, PostStub, Button } from "./";
import { toForest } from "./utils";
import PostEditForm from "./PostEditForm";

const Post = () => {
  const { user } = Auth.useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);

  const [deletePost] = useDeletePostMutation();

  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deletePost({ variables: { id } });
      await refetchPost();
    }
  };

  const {
    data,
    loading,
    error,
    refetch: refetchPost,
  } = useGetPostByIdQuery({
    variables: { id },
  });
  const post = data?.getPostById;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader type="Rings" color="#15eda1" height={256} width={256} />
      </div>
    );
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!post) return <div>something went wrong...</div>;

  const isAuthor = user?.id === post.author.id;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <PostStub post={post} />
        <div className="p-2 border dark:border-gray-600">
          {!editMode && (
            <div className="whitespace-pre-line">{post.content}</div>
          )}
          {editMode && <PostEditForm post={post} setEditMode={setEditMode} />}
        </div>

        {!post.deleted && !editMode && (
          <div className="flex text-xs pt-1 gap-4">
            <Button
              disabled={!isAuthor}
              onClick={user ? () => setEditMode(!editMode) : showAuthModal}
            >
              Edit
            </Button>
            <Button
              disabled={!isAuthor}
              onClick={user ? () => handleClickDelete(post.id) : showAuthModal}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <div>Comments:</div>
      <CommentForm
        postId={post.id}
        parentCommentId={0}
        refetchPost={refetchPost}
      />
      <Comments comments={toForest(post.comments)} refetchPost={refetchPost} />
    </div>
  );
};

export default Post;
