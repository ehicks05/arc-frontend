const getPosts = async () => {
  const response = await fetch("/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const addComment = async (data) => {
  fetch({
    url: "/api/comments",
    type: "POST",
    data: data,
    success: function (data) {
      // self.handlePostsChange();
    },
  });
};

export { getPosts, addComment };
