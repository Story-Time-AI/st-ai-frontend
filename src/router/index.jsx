import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home";
import ImageCartoonifier from "../pages/ImageCartoonifier";
import Profile from "../pages/Profile";
import Library from "../pages/Library";
import ManageUsers from "../pages/Admin/ManageUsers/Index";
import ManageStories from "../pages/Admin/ManageStories/Index";
import StoryPreview from "../components/StoryPreview";
import UserDetails from "../components/Admin/ManageUsers/UserDetails";
import StoryDetails from "../pages/Library/StoryDetails";
import GenerateStory from "../pages/GenerateStory/Index";

const AppRouter = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="/story-generator" element={<GenerateStory />} />
          <Route path="/character-creator" element={<ImageCartoonifier />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-stories" element={<ManageStories />} />
          <Route path="/library/:id" element={<StoryDetails />} />
          <Route path="/manage-users/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
