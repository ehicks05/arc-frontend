import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "@supabase/ui";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";

import {
  useDeletePostMutation,
  useGetPostByIdQuery,
} from "../generated/graphql";
import { CommentCreateForm, Comments, PostStub, Button, Loading } from "./";
import { toForest } from "./utils";
import PostEditForm from "./PostEditForm";

const Post = () => {
  const { user } = Auth.useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [showTopLevelReply, setShowTopLevelReply] = useState(false);
  const sorts = ["BEST", "TOP", "NEW"];
  const [commentSort, setCommentSort] = useState(sorts[0]);

  const [deletePost] = useDeletePostMutation();

  const {
    data,
    loading,
    error,
    refetch: refetchPost,
  } = useGetPostByIdQuery({
    variables: { id, commentSort },
  });
  const post = data?.getPostById;

  useEffect(() => {
    const effect = async () => await refetchPost({ commentSort });
    effect();
  }, [commentSort, refetchPost]);

  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deletePost({ variables: { id } });
      await refetchPost();
    }
  };

  if (loading || error) return <Loading loading={loading} error={error} />;
  if (!post) return <div>Post not found...</div>;

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
      <div>{post.comments.length} Comments:</div>
      <div className="flex space-x-4">
        {sorts.map((sort) => (
          <div
            key={sort}
            onClick={() => setCommentSort(sort)}
            className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer
                        ${
                          sort === commentSort
                            ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                            : "text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                        }
                        `}
          >
            {sort}
          </div>
        ))}
      </div>
      {!showTopLevelReply && (
        <div className="flex">
          <Button onClick={() => setShowTopLevelReply(true)}>
            Leave a comment
          </Button>
        </div>
      )}
      {showTopLevelReply && (
        <CommentCreateForm
          postId={post.id}
          parentCommentId={0}
          refetchPost={refetchPost}
          setEditMode={setShowTopLevelReply}
        />
      )}
      <Comments comments={toForest(post.comments)} refetchPost={refetchPost} />
    </div>
  );
};

export default Post;
