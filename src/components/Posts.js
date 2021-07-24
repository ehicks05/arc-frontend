import React from "react";
import { useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";

import { PostStub } from "./index";
import { Sort, useGetPostsQuery } from "../generated/graphql";

const pathToSort = {
  "/": Sort.Hot,
  "/top": Sort.Top,
  "/new": Sort.New,
};

const Posts = () => {
  const { pathname } = useLocation();
  const sort = pathToSort[pathname];

  const { data, loading, error } = useGetPostsQuery({
    variables: { sort },
  });
  const posts = data?.getPosts;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader type="Rings" color="#00BFFF" height={256} width={256} />
      </div>
    );
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!posts.length) return "nothing to see here...";
  return posts.map((post, i) => <PostStub key={i} post={post} i={i} />);
};

export default Posts;
