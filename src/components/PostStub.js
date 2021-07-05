import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

import { VoteInput } from "./index";

const userVote = {};
const user = {};
const upvote = () => {};
const downvote = () => {};

const PostStub = ({ post, i }) => {
  const bgClass =
    i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-black";
  return (
    <div className={`p-2 border dark:border-gray-600 ${bgClass}`}>
      <div className="flex items-center gap-2">
        {i !== undefined && (
          <div className="text-xl opacity-50">{`${i + 1}`}</div>
        )}
        <VoteInput
          upvoted={userVote.upvoted}
          downvoted={userVote.downvoted}
          handleUpvote={() => upvote(user.id, post.id)}
          handleDownvote={() => downvote(user.id, post.id)}
        />
        <div className="">
          <div className="text-lg">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </div>
          <div className="flex gap-4">
            <Link className="text-xs" to={`/users/${post.author.id}`}>
              {post.author.username}
            </Link>
            <TimeAgo
              title={post.createdAt}
              className="text-xs"
              datetime={post.createdAt}
              opts={{ minInterval: 60 }}
            />
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className="text-sm">{`${post.commentCount} comments`}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostStub;
