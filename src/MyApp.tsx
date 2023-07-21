import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './layout';
import { Post, Posts, User, PostForm } from '@/app';
import { BackgroundGradients } from './components';

function MyApp() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundGradients />
      <Header />
      <div className="flex-grow flex flex-col h-full sm:px-4">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/top" element={<Posts />} />
          <Route path="/new" element={<Posts />} />
          <Route path="/posts/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
