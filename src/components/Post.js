import React from "react";
import { useParams } from "react-router-dom";
import { CommentForm, Comments, PostStub } from "./index";

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  if (!post) return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="">
        <PostStub post={post} />
        <div className="border">{post.content}</div>
      </div>
      <div className="mt-2">
        <CommentForm postId={post.id} parentCommentId={0} />
      </div>
      Comments:
      <Comments comments={post.comments} />
    </div>
  );
};

export default Post;
