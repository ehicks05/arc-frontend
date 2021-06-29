import React from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import CommentInput from "./CommentForm";
import Comments from "./Comments";
import PostStub from "./PostStub";

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
  const commentTree = buildCommentTree(post.comments);
  console.log(commentTree);
  if (!post) return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="box is-small">
        <PostStub post={post} />
        <span className="is-size-7">{post.content}</span>
      </div>
      <CommentInput postId={post.id} parentCommentId={0} />
      Comments:
      <Comments comments={commentTree} />
    </div>
  );
};

export default Post;
