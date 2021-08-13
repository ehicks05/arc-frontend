import React from "react";
import { useParams, Link } from "react-router-dom";
import { Comment, PostStub, Loading } from "./index";
import { useGetUserQuery } from "../generated/graphql";

const User = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetUserQuery({ variables: { id } });

  if (loading || error) {
    return <Loading loading={loading} error={error} />;
  }

  const user = data.getUser;
  const userItems = [...user.posts, ...user.comments].sort(
    (o1, o2) => o2.createdAt - o1.createdAt
  );

  return (
    <div className="flex flex-col gap-4">
      <div>{user.username}</div>
      <div className="flex flex-col gap-4">
        {userItems.map((item) => {
          if (item.__typename === "Post") {
            const post = item;
            return <PostStub key={post.id} post={post} />;
          }
          if (item.__typename === "Comment") {
            const comment = item;
            return (
              <div key={comment.id}>
                {comment.post.link && (
                  <a href={comment.post.link}>{comment.post.title}</a>
                )}
                {!comment.post.link && (
                  <Link to={`/posts/${comment.post.id}`}>
                    {comment.post.title}
                  </Link>
                )}{" "}
                by{" "}
                {comment.post.author && (
                  <Link to={`/users/${comment.post.author?.id}`}>
                    {comment.post.author?.username}
                  </Link>
                )}
                {!comment.post.author && "[deleted]"}
                <Comment key={comment.id} comment={comment} notInTree />
              </div>
            );
          }
          return <div>unknown item type</div>;
        })}
      </div>
    </div>
  );
};

export default User;
