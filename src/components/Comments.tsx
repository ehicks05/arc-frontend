import React from "react";
import { Comment } from "./index";
import { CommentFragment } from "generated/graphql";

interface Props {
  comments: CommentFragment[];
  refetchPost: () => void;
}

const Comments = ({ comments, refetchPost }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            refetchPost={refetchPost}
            notInTree={false}
          />
        ))}
    </div>
  );
};

export default Comments;
