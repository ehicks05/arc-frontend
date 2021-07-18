import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Header, Footer, Post, Posts, User, Profile } from "./components";
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header title={"ARC"} titleClass={null} />
        <div className="p-4 flex-grow flex flex-col h-full">
          <Switch>
            <Route
              exact
              path={["/", "/top", "/new"]}
              render={() => <Posts />}
            />
            <Route
              exact
              path="/posts/:id"
              render={(props) => <Post {...props} />}
            />
            <Route
              exact
              path="/users/:id"
              render={(props) => <User {...props} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} />}
            />
            <Route exact path="/test" render={(props) => <Test {...props} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
