import _ from "lodash";

const buildCommentTree = (comments) => {
  const commentsById = _.keyBy(comments, "id");

  comments
    .filter((c) => c.parentCommentId)
    .forEach((c) => {
      const parent = commentsById[c.parentCommentId];
      parent.comments = [...(parent.comments || []), c];
    });

  return {
    commentCount: comments.length,
    comments: Object.values(commentsById).filter((c) => !c.parentCommentId),
  };
};

const hydratePost = (post) => {
  return {
    ...post,
    netVotes: Math.round(Math.random() * 1000),
    ...buildCommentTree(post.comments),
  };
};

const getPosts = async () => {
  const response = await fetch("/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return (await response.json()).map((post) => hydratePost(post));
};

const getUser = async (id) => {
  const response = await fetch(`/users/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const user = await response.json();

  return {
    ...user,
    posts: user.posts.map((post) => hydratePost(post)),
  };
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

export { getPosts, getUser, addComment, deleteComment };
