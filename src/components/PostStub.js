import React from "react";
import { Link } from "react-router-dom";

const PostStub = ({ post, i }) => {
  return (
    <div className="p-2 border">
      <Link to={`/posts/${post.id}`}>
        <div className="flex gap-2">
          {i !== undefined && <div className="">{`${i + 1}.`}</div>}
          <div className="">
            <div className="text-lg">title: {post.title}</div>
            <div className="text-sm">{post.author.username}</div>
            <div className="text-sm">{post.createdAt}</div>
            <div className="text-sm">{`${post.comments.length} comments`}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostStub;
