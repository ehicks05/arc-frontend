const getPosts = async () => {
  const response = await fetch("/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const addComment = async (data) => {
  fetch({
    method: "POST",
    url: "/api/comments",
    data: data,
  });
};

const deleteComment = async (commentId) => {
  await fetch({
    method: "DELETE",
    url: "/api/comments/" + commentId,
    async: false,
  });
};

export { getPosts, addComment, deleteComment };
