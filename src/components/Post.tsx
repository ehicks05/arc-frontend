import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";

import {
  CommentSort,
  useDeletePostMutation,
  useGetPostByIdQuery,
} from "../generated/graphql";
import { CommentCreateForm, Comments, PostStub, Button, Loading } from ".";
import { toForest } from "./utils";
import PostEditForm from "./PostEditForm";
import useUser from "../useUser";
import clsx from "clsx";
import { NetworkStatus } from "@apollo/client";

const Post = () => {
  const { username } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [showTopLevelReply, setShowTopLevelReply] = useState(false);

  type Sort = `${CommentSort}`;
  const sorts: Sort[] = ["BEST", "TOP", "NEW"];
  const [commentSort, setCommentSort] = useState<Sort>(sorts[0]);

  const [deletePost] = useDeletePostMutation();
  const {
    data,
    loading,networkStatus ,
    error,
    refetch: refetchPost,
  } = useGetPostByIdQuery({
    // @ts-ignore
    variables: { id, commentSort },notifyOnNetworkStatusChange: false
  });
  const post = data?.getPostById;
  const comments = post?.comments;

  useEffect(() => {
    // @ts-ignore
    const effect = async () => await refetchPost({ id, commentSort });
    effect();
  }, [commentSort, refetchPost]);

  const handleClickDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await deletePost({ variables: { id } });
      await refetchPost();
    }
  };
  console.log(NetworkStatus[networkStatus])
  if (loading || error) return <Loading loading={loading} error={error} />;
  if (!post) return <div>Post not found...</div>;

  const isAuthor = username === post.authorId;

  return (
    <div className="flex flex-col gap-4 w-full sm:max-w-screen-lg sm:w-5/6 mx-auto">
      <div>
        <PostStub post={post} />
        <div className="p-2 border-y dark:border-gray-800">
          <div className="flex flex-col gap-4 text-sm leading-tight">
            {!editMode && post.content.split('\n').map(p => 
              <p key={p} className="whitespace-pre-line">{p}</p>
            )}
          </div>
          
          {editMode && <PostEditForm post={post} setEditMode={setEditMode} />}
        </div>

        {!post.deleted && !editMode && (
          <div className="flex text-xs px-2 pt-1 gap-4">
            <Button
              disabled={!isAuthor}
              onClick={username ? () => setEditMode(!editMode) : showAuthModal}
            >
              Edit
            </Button>
            <Button
              disabled={!isAuthor}
              onClick={
                username ? () => handleClickDelete(post.id) : showAuthModal
              }
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="flex px-2">
        {sorts.map((sort) => (
          <div
            key={sort}
            onClick={() => setCommentSort(sort)}
            className={clsx('px-4 py-2 text-sm font-medium cursor-pointer first:rounded-l last:rounded-r', {
              'bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white': sort === commentSort,
              'text-neutral-600 bg-neutral-100 hover:bg-neutral-200 hover:text-black dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-white': sort !== commentSort,
            })}
          >
            {sort}
          </div>
        ))}
      </div>
      {!showTopLevelReply && (
        <div className="flex px-2">
          <Button onClick={() => setShowTopLevelReply(true)}>
            Leave a comment
          </Button>
        </div>
      )}
      {showTopLevelReply && (
        <CommentCreateForm
          postId={post.id}
          parentComment={0}
          refetchPost={refetchPost}
          setEditMode={setShowTopLevelReply}
        />
      )}
      {/* @ts-ignore */}
      {post.comments && <Comments comments={toForest(post.comments)} refetchPost={refetchPost} />}
    </div>
  );
};

export default Post;
