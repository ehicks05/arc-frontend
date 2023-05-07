import React from "react";
import { useLocation } from "react-router-dom";

import { PostStub, Loading } from "./index";
import { Sort, useGetPostsQuery } from "../generated/graphql";

const pathToSort: Record<string, Sort> = {
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

  if (loading || error) return <Loading loading={loading} error={error} />;

  if (!posts?.length) return <div>nothing to see here...</div>;
  return <div>
    {posts.map((post, i) => <PostStub key={i} post={post} i={i} />)}</div>
};

export default Posts;
