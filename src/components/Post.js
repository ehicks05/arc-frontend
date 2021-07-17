import React from "react";
import { useParams } from "react-router-dom";
import { CommentForm, Comments, PostStub } from "./index";
import { toForest } from "./utils";

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  if (!post) return <div>Something went wrong...</div>;

  console.log(toForest(post.comments));

  return (
    <div>
      <div className="">
        <PostStub post={post} />
        <div className="p-2 border dark:border-gray-600">{post.content}</div>
      </div>
      <div className="mt-2">
        <CommentForm postId={post.id} parentCommentId={0} />
      </div>
      Comments:
      <Comments comments={toForest(post.comments)} />
    </div>
  );
};

export default Post;
