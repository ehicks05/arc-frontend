import React from "react";
import {Comment} from './index'

const Comments = ({ comments }) => {
  return (
    <div className="flex flex-col gap-2">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default Comments;
