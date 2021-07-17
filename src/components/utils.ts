import _ from "lodash";
import { Comment } from '../generated/graphql'

interface CommentWithForest extends Comment {
  commentForest: CommentWithForest[];
}

const toForest = (comments: Comment[]) => {
  const commentsById = _.keyBy(comments as CommentWithForest[], "id");

  (comments as CommentWithForest[])
    .forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentsById[comment.parentComment.id];
        commentsById[comment.parentComment.id] =
          { ...parent, commentForest: [...(parent.commentForest || []), comment] };
      }
    });

  // children should be recursively nested, so only return 'root' comments
  return Object.values(commentsById).filter((c) => !c.parentComment?.id);
};

export { toForest };
