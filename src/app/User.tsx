import React from 'react';
import { useParams } from 'react-router-dom';
import { TbGhost } from 'react-icons/tb';
import { Comment, PostStub, Loading } from '@/components';
import { useGetUserQuery } from '@/generated/graphql';

interface withCreatedAt {
  createdAt: string;
}
const byCreatedAt = (o1: withCreatedAt, o2: withCreatedAt) =>
  o2.createdAt.localeCompare(o1.createdAt);

const User = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useGetUserQuery({ variables: { id } });
  const user = data?.getUser;

  if (user) {
    const { username } = user;
    console.log({ user });
    const posts = [...user.posts]?.sort(byCreatedAt) || [];
    const comments = [...user.comments]?.sort(byCreatedAt) || [];

    return (
      <div className="w-full sm:max-w-screen-lg sm:w-5/6 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="text-xl">
            Overview for{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              {username}
            </span>
          </div>
          <div className="flex flex-col">
            <div>Posts:</div>
            {posts && (
              <div className="flex flex-col gap-4">
                {posts.map(post => (
                  <PostStub key={post.id} post={post} />
                ))}
              </div>
            )}
            <div>Comments:</div>
            {comments && (
              <div className="flex flex-col gap-4">
                {comments.map(comment => (
                  <div key={comment.id}>
                    <PostStub key={comment.post.id} post={comment.post} />
                    <Comment
                      key={comment.id}
                      comment={comment}
                      notInTree
                      refetchPost={refetch}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading || error) return <Loading error={error} />;
  return (
    <div className="w-full sm:max-w-screen-lg sm:w-5/6 mx-auto">
      <div className="flex flex-col w-full h-full items-center justify-center align-middle">
        <h1 className="text-xl">User not found...</h1>
        <TbGhost size={128} />
      </div>
    </div>
  );
};

export default User;
