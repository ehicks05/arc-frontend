import React from 'react';
import { Comment } from '.';
import { HydratedComment } from '@/types';

interface Props {
  comments: HydratedComment[];
  refetchPost: () => void;
}

const Comments = ({ comments, refetchPost }: Props) => (
  <div className="flex flex-col">
    {comments &&
      comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          refetchPost={refetchPost}
          notInTree={false}
        />
      ))}
  </div>
);

export default Comments;
