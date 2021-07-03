import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

const PostStub = ({ post, i }) => {
  const bgClass =
    i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-black";
  return (
    <div className={`p-2 border dark:border-gray-600 ${bgClass}`}>
      <div className="flex gap-2">
        {i !== undefined && <div className="">{`${i + 1}.`}</div>}
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
