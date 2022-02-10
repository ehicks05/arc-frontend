import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header, Footer, Post, Posts, User, PostForm } from "./components";
import Test from "./components/Test";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={"ARC"} titleClass={null} />
      <div className="sm:p-4 flex-grow flex flex-col h-full">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/top" element={<Posts />} />
          <Route path="/new" element={<Posts />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
