import React from "react";
import { useGetPostsQuery } from "../generated/graphql";

const Test = () => {
  const { loading, error, data } = useGetPostsQuery();

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const posts = data?.getPosts || [];

  return (
    <div>
      {data &&
        posts.map((post) => (
          <div>
            {post?.title} - {post?.createdAt}
          </div>
        ))}
    </div>
  );
};

export default Test;
