import _ from "lodash";

const toForest = (comments) => {
  const commentsById = _.keyBy(comments, "id");

  comments
    .filter((c) => c.parentComment?.id)
    .forEach((c) => {
      const parent = commentsById[c.parentComment.id];
      parent.comments = [...(parent.comments || []), c];
    });

  return Object.values(commentsById).filter((c) => !c.parentComment.id);
};

export { toForest };
