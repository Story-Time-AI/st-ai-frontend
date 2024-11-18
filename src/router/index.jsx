import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

import MainLayout from '../layouts/MainLayout'
import Home from '../pages/home'
import ImageCartoonifier  from '../pages/ImageCartoonifier'
import GenerateStory  from '../pages/GenerateStory'
import Profile  from '../pages/Profile'
import Library  from '../pages/Library'
import ManageUsers from '../pages/Admin/ManageUsers'
import ManageStories from '../pages/Admin/ManageStories'

const AppRouter = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>

        {/* Authentication Routes */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/story-generator" element={<GenerateStory />} />
          <Route path="/image-cartoonifier" element={<ImageCartoonifier />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-stories" element={<ManageStories />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
