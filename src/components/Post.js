import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { CommentForm, Comments, PostStub } from "./index";

const buildCommentTree = (comments) => {
  const commentsById = _.keyBy(
    comments.map((c) => ({ ...c, comments: [] })),
    "id"
  );

  comments
    .filter((c) => c.parentCommentId)
    .forEach((c) => {
      commentsById[c.parentCommentId].comments.push(c);
    });

  return Object.values(commentsById).filter((c) => !c.parentCommentId);
};

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  if (!post) return <div>Something went wrong...</div>;

  const commentTree = buildCommentTree(post.comments);

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
      <Comments comments={commentTree} />
    </div>
  );
};

export default Post;
