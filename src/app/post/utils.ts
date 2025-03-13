import type { CommentFragment } from '@/generated/graphql';
import type { HydratedComment } from '@/types';
import _ from 'lodash';

export const toForest = (comments: CommentFragment[]): HydratedComment[] => {
  const copy: HydratedComment[] = comments.map(c => ({ ...c }));
  const commentsById = _.keyBy(copy, 'id');

  copy
    .filter(c => c.parentComment?.id)
    .forEach(comment => {
      const parentId = comment.parentComment?.id;
      const parent = parentId ? commentsById[parentId] : undefined;
      if (!parent) return;
      if (parent?.commentForest) parent.commentForest = [];
      parent.commentForest?.push(comment);
    });

  // children should be recursively nested, so only return 'root' comments
  return Object.values(commentsById).filter(c => !c.parentComment?.id);
};
