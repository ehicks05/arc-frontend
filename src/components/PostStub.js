import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

const PostStub = ({ post, i }) => {
    const bgClass =
    i % 2 === 0
      ? "bg-gray-50 dark:bg-gray-900"
      : "bg-white dark:bg-black";
  return (
    <div className={`p-2 border dark:border-gray-600 ${bgClass}`}>
      <Link to={`/posts/${post.id}`}>
        <div className="flex gap-2">
          {i !== undefined && <div className="">{`${i + 1}.`}</div>}
          <div className="">
            <div className="text-lg">{post.title}</div>
            <div className="flex gap-4">
              <span className="text-xs">{post.author.username}</span>
              <TimeAgo
                title={post.createdAt}
                className="text-xs"
                datetime={post.createdAt}
              />
            </div>
            <div className="text-sm">{`${post.commentCount} comments`}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostStub;
