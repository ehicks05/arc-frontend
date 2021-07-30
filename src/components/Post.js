import React from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

import { useGetPostByIdQuery } from "../generated/graphql";
import { CommentForm, Comments, PostStub } from "./index";
import { toForest } from "./utils";

const Post = () => {
  const { id } = useParams();

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
        <div className="p-2 border dark:border-gray-600">{post.content}</div>
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
