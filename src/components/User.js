import React from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Comment, PostStub } from "./index";
import { useGetUserQuery } from "../generated/graphql";

const User = () => {
  const { id } = useParams();

  const { data, loading, error } = useGetUserQuery({ variables: { id } });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader type="Rings" color="#15eda1" height={256} width={256} />
      </div>
    );
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const user = data.getUser;

  return (
    <div className="flex flex-col gap-4">
      <div>{user.username}</div>
      <div className="flex flex-col gap-4">
        {user.posts.map((post) => (
          <PostStub key={post.id} post={post} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {user.comments.map((comment) => (
          <div key={comment.id}>
            {comment.post.link && (
              <a href={comment.post.link}>{comment.post.title}</a>
            )}
            {!comment.post.link && (
              <Link to={`/posts/${comment.post.id}`}>{comment.post.title}</Link>
            )}{" "}
            by{" "}
            {comment.post.author && (
              <Link to={`/users/${comment.post.author?.id}`}>
                {comment.post.author?.id}
              </Link>
            )}
            {!comment.post.author && "[deleted]"}
            <Comment key={comment.id} comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
