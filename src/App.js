import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useQuery } from "react-query";

import { getPosts } from "./api";

import { Header, Footer, Post, PostStub } from "./components";

function App() {
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery("todos", getPosts);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader type="Rings" color="#00BFFF" height={256} width={256} />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header title={"ARC"} titleClass={null} />
        <div className="p-4 flex-grow flex flex-col h-full">
          <Switch>
            <Route exact path="/" render={() => <Posts posts={posts} />} />
            <Route
              exact
              path="/posts/:id"
              render={(props) => <Post {...props} posts={posts} />}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post, i) => (
        <PostStub key={i} post={post} i={i} />
      ))}
    </>
  );
};

export default App;
