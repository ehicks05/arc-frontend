import React from 'react';
import { useLocation } from 'react-router-dom';

import { PostStub, Loading, Button, Card } from '@/components';
import { Sort, useGetPostsQuery } from '@/generated/graphql';

const pathToSort: Record<string, Sort> = {
  '/': Sort.Hot,
  '/top': Sort.Top,
  '/new': Sort.New,
};

const Posts = () => {
  const { pathname } = useLocation();
  const sort = pathToSort[pathname];

  const { data, loading, error, fetchMore } = useGetPostsQuery({
    variables: { sort },
    notifyOnNetworkStatusChange: true,
  });
  const posts = data?.getPosts;

  const handleFetchMore = () => {
    fetchMore({ variables: { sort, offset: posts?.length } });
  };

  if (posts) {
    return (
      <div className="w-full sm:max-w-screen-lg sm:w-5/6 mx-auto">
        {!posts?.length && <Card>nothing to see here...</Card>}
        {posts?.length !== 0 && (
          <>
            {posts.map((post, i) => (
              <PostStub key={post.id} post={post} i={i} />
            ))}
            <Button disabled={loading} onClick={handleFetchMore}>
              More...
            </Button>
          </>
        )}
      </div>
    );
  }
  if (loading || error) return <Loading error={error} />;
  return null;
};

export default Posts;
