import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

import { VoteInput } from "./index";

const PostStub = ({ post, i }) => {
  const { user } = useAuth0();
  const [userVote, setUserVote] = useState({});

  const upvote = (userId, postId) => {
    console.log(user);
    console.log(`${userId}, ${postId}`);
    setUserVote({ upvoted: !userVote.upvoted });
  };
  const downvote = (userId, postId) => {
    console.log(`${userId}, ${postId}`);
    setUserVote({ downvoted: !userVote.downvoted });
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
          upvoted={userVote.upvoted}
          downvoted={userVote.downvoted}
          handleUpvote={() => upvote(user.sub, post.id)}
          handleDownvote={() => downvote(user.sub, post.id)}
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
                title={post.createdAt}
                className="text-xs"
                datetime={post.createdAt}
                opts={{ minInterval: 60 }}
              />
              <span> by </span>
            </span>
            <Link className="text-xs ml-2" to={`/users/${post.author.id}`}>
              {post.author.username}
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
