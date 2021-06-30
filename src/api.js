import _ from "lodash";

const buildCommentTree = (comments) => {
  const commentsById = _.keyBy(comments, "id");

  comments
    .filter((c) => c.parentCommentId)
    .forEach((c) => {
      const parent = commentsById[c.parentCommentId];
      parent.comments = [...(parent.comments || []), c];
    });

  // console.log(JSON.stringify(commentsById, null, 2));

  return Object.values(commentsById).filter((c) => !c.parentCommentId);
};

const getPosts = async () => {
  const response = await fetch("/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const posts = await response.json();

  posts.forEach((post) => {
    post.comments = buildCommentTree(post.comments);
  });

  return posts;
};

const addComment = async (data) => {
  await fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const deleteComment = async (commentId) => {
  await fetch(`/comments/${commentId}`, {
    method: "DELETE",
  });
};

export { getPosts, addComment, deleteComment };
