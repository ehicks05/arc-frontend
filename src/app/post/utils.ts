import _ from 'lodash';
import { CommentFragment } from '@/generated/graphql';
import { HydratedComment } from '@/types';

export const toForest = (comments: CommentFragment[]): HydratedComment[] => {
  const copy: HydratedComment[] = comments.map(c => ({ ...c }));
  const commentsById = _.keyBy(copy, 'id');

  copy
    .filter(c => c.parentComment?.id)
    .forEach(comment => {
      const parent = commentsById[comment.parentComment!.id!];
      if (!parent.commentForest) parent.commentForest = [];
      parent.commentForest.push(comment);
    });

  // children should be recursively nested, so only return 'root' comments
  return Object.values(commentsById).filter(c => !c.parentComment?.id);
};
