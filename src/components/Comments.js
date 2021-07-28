import React from "react";
import { Comment } from "./index";

const Comments = ({ comments, refetchPost }) => {
  return (
    <div className="flex flex-col gap-2">
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            refetchPost={refetchPost}
          />
        ))}
    </div>
  );
};

export default Comments;
