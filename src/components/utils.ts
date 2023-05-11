import _ from 'lodash';
import { CommentFragment } from 'generated/graphql';

export interface HydratedComment extends CommentFragment {
  id: string;
  parentCommentId?: string | null;
  commentForest?: HydratedComment[];
}

const toForest = (comments: CommentFragment[]): HydratedComment[] => {
  const copy: HydratedComment[] = comments.map(c => ({ ...c }));
  const commentsById = _.keyBy(copy, 'id');

  copy
    .filter(c => c.parentCommentId)
    .forEach(comment => {
      const parent = commentsById[comment.parentCommentId!];
      if (!parent.commentForest) parent.commentForest = [];
      parent.commentForest.push(comment);
    });

  // children should be recursively nested, so only return 'root' comments
  return Object.values(commentsById).filter(c => !c.parentCommentId);
};

const DIRECTION_TO_VALUE = { UP: 1, DOWN: -1 };

export { toForest, DIRECTION_TO_VALUE };
