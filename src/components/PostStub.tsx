import React from "react";
import { Link } from "react-router-dom";
import {
  Direction,
  PostFragmentFragment,
  useCreateUserPostVoteMutation,
  useDeleteUserPostVoteMutation,
} from "../generated/graphql";

import { VoteInput } from "./index";
import { DIRECTION_TO_VALUE } from "./utils";
import { formatDistance} from "date-fns";

interface Props {
  post: PostFragmentFragment
  i: number;
}

const PostStub = ({ post, i }: Props) => {
  const [createUserPostVote] = useCreateUserPostVoteMutation();
  const [deleteUserPostVote] = useDeleteUserPostVoteMutation();

  const handleVote = async (direction: Direction) => {
    post.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === post.userVote.direction
      ? await deleteUserPostVote({
          variables: { postId: post.id },
        })
      : await createUserPostVote({
          variables: { input: { postId: post.id, direction } },
        });
  };

  const bgClass =
    i % 2 === 0
      ? "bg-neutral-50 dark:bg-neutral-800"
      : "bg-neutral-100 dark:bg-neutral-800 brightness-105";
  return (
    <div className={`px-2 py-0.5 dark:border-gray-600 ${bgClass}`}>
      <div className="flex items-center gap-2">
        {i !== undefined && (
          <div className="text-xl opacity-50">{`${i + 1}`}</div>
        )}
        <VoteInput
          netVotes={post.netVotes}
          direction={post.userVote?.direction}
          handleUpvote={() => handleVote(Direction.Up)}
          handleDownvote={() => handleVote(Direction.Down)}
        />
        <div className="flex flex-col">
          <div className="text-sm sm:text-base">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </div>
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs opacity-50">
              {post.netVotes} pts | 
            </span>
            <span className="text-xs opacity-50">
              <span className="text-xs" title={new Date(post.createdAt).toLocaleString()}>
                {formatDistance(new Date(post.createdAt), new Date(), {addSuffix: true}).replace('over ', '')}
              </span>
              <span> by </span>
            </span>
            <Link
              className={`text-xs opacity-50 ${
                !post.authorId && "pointer-events-none"
              }`}
              to={`/users/${post?.authorId}`}
            >
              {post?.authorId || "[Deleted]"}
            </Link>
            <Link to={`/posts/${post.id}`}>
              <div className="text-xs opacity-50">{`| ${post.commentCount} comments`}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostStub;