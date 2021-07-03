import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useQuery } from "react-query";

import { getPosts } from "./api";

import { Header, Footer, Post, PostStub, User } from "./components";

function App() {
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery("posts", getPosts, { refetchOnWindowFocus: false });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader type="Rings" color="#00BFFF" height={256} width={256} />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header title={"ARC"} titleClass={null} />
        <div className="p-4 flex-grow flex flex-col h-full">
          <Switch>
            <Route
              exact
              path={["/", "/top", "/new"]}
              render={() => <Posts posts={posts} />}
            />
            <Route
              exact
              path="/posts/:id"
              render={(props) => <Post {...props} posts={posts} />}
            />
            <Route
              exact
              path="/users/:id"
              render={(props) => <User {...props} />}
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
      <div className="flex gap-2">
        <NavLink exact to={"/"} activeClassName="font-bold">
          Hot
        </NavLink>
        <NavLink exact to={"/top"} activeClassName="font-bold">
          Top
        </NavLink>
        <NavLink exact to={"/new"} activeClassName="font-bold">
          New
        </NavLink>
      </div>
      {posts.map((post, i) => (
        <PostStub key={i} post={post} i={i} />
      ))}
    </>
  );
};

export default App;
