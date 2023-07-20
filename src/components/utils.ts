import _ from 'lodash';
import { CommentFragment } from 'generated/graphql';
import md5 from 'md5';

export interface HydratedComment extends CommentFragment {
  commentForest?: HydratedComment[];
}

export const toForest = (comments: CommentFragment[]): HydratedComment[] => {
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

export const toGravatarHash = (email?: string) =>
  email ? md5(email.trim().toLocaleLowerCase()) : '00000000000000000000000000000000';

export const toGravatarUrl = (email?: string) =>
  `https://gravatar.com/avatar/${toGravatarHash(email)}?s=256`;

export const DIRECTION_TO_VALUE = { UP: 1, DOWN: -1 };
