import {
  type PostStubFragment,
  VoteDirection,
  useCreateUserPostVoteMutation,
  useDeleteUserPostVoteMutation,
} from '@/generated/graphql';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

import { DIRECTION_TO_VALUE } from '@/constants';
import { VoteInput } from '.';

interface Props {
  post: PostStubFragment;
  i?: number;
}

const PostStub = ({ post, i }: Props) => {
  const [createUserPostVote] = useCreateUserPostVoteMutation();
  const [deleteUserPostVote] = useDeleteUserPostVoteMutation();

  const handleVote = async (direction: VoteDirection) =>
    post.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === post.userVote.direction
      ? deleteUserPostVote({ variables: { input: { postId: post.id } } })
      : createUserPostVote({
          variables: { input: { postId: post.id, direction } },
        });

  return (
    <div className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800">
      <div className="flex items-center gap-2">
        {i !== undefined && (
          <div className="opacity-50">{`${i + 1 < 10 ? '0' : ''}${i + 1}`}</div>
        )}
        <VoteInput
          direction={post.userVote?.direction}
          handleUpvote={() => handleVote(VoteDirection.Up)}
          handleDownvote={() => handleVote(VoteDirection.Down)}
        />
        <div className="flex flex-col py-1">
          <div className="text-sm sm:text-base">
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            )}
            {!post.link && <Link to={`/posts/${post.id}`}>{post.title}</Link>}
          </div>
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs opacity-50">{post.netVotes} pts |</span>
            <span className="text-xs opacity-50">
              <span
                className="text-xs"
                title={new Date(post.createdAt).toLocaleString()}
              >
                {formatDistance(new Date(post.createdAt), new Date(), {
                  addSuffix: true,
                })
                  .replace('over ', '')
                  .replace(' ago', '')}
              </span>
              <span> | </span>
            </span>
            <Link
              className={`text-xs opacity-50 ${
                !post.author?.id && 'pointer-events-none'
              }`}
              to={`/users/${post?.author?.id}`}
            >
              {post?.author?.username || '[Deleted]'}
            </Link>
            <Link to={`/posts/${post.id}`}>
              <div className="text-xs opacity-50">{`| ${post.commentCount} comment${
                (post.commentCount || 0) !== 1 ? 's' : ''
              }`}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostStub;
