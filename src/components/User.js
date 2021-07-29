import React from "react";
import { useParams } from "react-router-dom";
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
    <div>
      <div>{user.username}</div>
      <div>
        {user.posts.map((post) => (
          <PostStub key={post.id} post={post} />
        ))}
      </div>
      <div>
        {user.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default User;
