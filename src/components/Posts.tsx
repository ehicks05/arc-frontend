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

  return <div className="w-full sm:max-w-screen-lg sm:w-5/6 mx-auto">
    {!posts?.length && <div>nothing to see here...</div>}
    {posts && posts.map((post, i) => <PostStub key={i} post={post} i={i} />)}
  </div>
};

export default Posts;
