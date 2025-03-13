import { Card, Comment, Loading, PostStub } from '@/components';
import { useUserQuery } from '@/generated/graphql';
import { TbGhost } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

interface withCreatedAt {
  createdAt: string;
}
const byCreatedAt = (o1: withCreatedAt, o2: withCreatedAt) =>
  o2.createdAt.localeCompare(o1.createdAt);

const User = () => {
  const params = useParams();
  const id = params.id || '';
  const { data, loading, error, refetch } = useUserQuery({ variables: { id } });
  const user = data?.user;

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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="text-lg">Posts</div>
              {posts && (
                <div className="flex flex-col gap-4">
                  {posts.map(post => (
                    <PostStub key={post.id} post={post} />
                  ))}
                </div>
              )}
              {!posts && <Card>No posts found</Card>}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg">Comments</div>
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
              {!comments && <Card>No comments found</Card>}
            </div>
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
