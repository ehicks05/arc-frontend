import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import {
  Direction,
  useCreateUserPostVoteMutation,
  useDeleteUserPostVoteMutation,
} from "../generated/graphql";

import { VoteInput } from "./index";
import { DIRECTION_TO_VALUE } from "./utils";

const PostStub = ({ post, i }) => {
  const [createUserPostVote] = useCreateUserPostVoteMutation();
  const [deleteUserPostVote] = useDeleteUserPostVoteMutation();

  const handleVote = async (direction) => {
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
    i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-black";
  return (
    <div className={`p-2 border dark:border-gray-600 ${bgClass}`}>
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
        <div className="">
          <div className="text-lg">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </div>
          <div className="flex">
            <span className="text-xs opacity-50">
              <span>Posted </span>
              <TimeAgo
                title={new Date(post.createdAt)}
                className="text-xs"
                datetime={post.createdAt}
                opts={{ minInterval: 60 }}
              />
              <span> by </span>
            </span>
            <Link
              className={`text-xs ml-1 ${
                !post.author && "pointer-events-none"
              }`}
              to={`/users/${post?.author?.id}`}
            >
              {post?.author?.username || "[Deleted]"}
            </Link>
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className="text-xs font-bold opacity-50">{`${post.commentCount} comments`}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostStub;
