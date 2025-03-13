import type { HydratedComment } from '@/types';
import { Comment } from '.';

interface Props {
  comments: HydratedComment[];
  refetchPost: () => void;
}

const Comments = ({ comments, refetchPost }: Props) => (
  <div className="flex flex-col">
    {comments?.map(comment => (
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
