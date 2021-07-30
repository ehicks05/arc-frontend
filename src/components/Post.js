import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useAuth0 } from "@auth0/auth0-react";

import { useGetPostByIdQuery } from "../generated/graphql";
import { CommentForm, Comments, PostStub, Button } from "./";
import { toForest } from "./utils";
import PostEditForm from "./PostEditForm";

const Post = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);

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

  console.log(toForest(post.comments));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <PostStub post={post} refetchPost={refetchPost} />
        <div className="p-2 border dark:border-gray-600">
          {!editMode && (
            <pre className="whitespace-pre-line">{post.content}</pre>
          )}
          {editMode && (
            <PostEditForm
              post={post}
              setEditMode={setEditMode}
              refetchPost={refetchPost}
            />
          )}
        </div>

        {!editMode && (
          <div className="flex pt-1 gap-4">
            <Button
              disabled={user?.sub !== post.author.id}
              className="text-xs"
              onClick={
                isAuthenticated
                  ? () => setEditMode(!editMode)
                  : loginWithRedirect
              }
            >
              Edit
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
