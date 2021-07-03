import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "react-loader-spinner";
import { Comment, PostStub } from "./index";
import { getUser } from "../api";

const User = ({}) => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: user,
    error,
  } = useQuery(["users", id], () => getUser(id), {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader type="Rings" color="#00BFFF" height={256} width={256} />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
