import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser,FaUsers, FaBook, FaShoppingCart } from 'react-icons/fa';
import {MdAutoAwesome } from 'react-icons/md';
import {GiBookshelf  } from 'react-icons/gi';
import {HiOutlineDocumentText   } from 'react-icons/hi';


import { HiMenu } from 'react-icons/hi';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Mobile Menu Button (Positioned on the right) */}
      <button
        onClick={toggleSidebar}
        className="fixed z-20 p-2 text-white bg-deepPurple 
        rounded-full shadow-lg 
        lg:hidden top-3 right-3"
      >
        <HiMenu className="text-2xl" />
      </button>

      {/* Sidebar (Positioned on the left in mobile) */}
      <div
        className={`fixed top-0 lg:left-0 lg:transform-none 
          lg:w-64 h-full w-[60vw] bg-white shadow-lg transition-transform 
          transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } left-0 lg:right-auto z-30 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4 border-b">
          <img src={logo} alt="Logo" className="w-28" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4 space-y-2">
          <p className='text-md ml-3 font-medium text-primaryDarkBlue'>Creative Space</p>
          <Link
            to="/story-generator"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/story-generator'
                ? 'font-semibold text-deepPurple border-r-4 border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <MdAutoAwesome className="mr-3 text-xl" /> Generate Story
          </Link>
          <Link
            to="/image-cartoonifier"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/image-cartoonifier'
                ? 'font-semibold text-deepPurple border-r-4 border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <FaShoppingCart className="mr-3 text-xl" /> Image Cartoonifier
          </Link>
          <Link
            to="/library"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/library'
                ? 'font-semibold text-deepPurple border-r-4  border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <GiBookshelf  className="mr-3 text-xl" /> Library
          </Link>
          <Link
            to="/manage-stories"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/manage-stories'
                ? 'font-semibold text-deepPurple border-r-4  border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <HiOutlineDocumentText className="mr-3 text-xl" /> Manage Stories
          </Link>
<p className='text-md ml-3 font-medium text-primaryDarkBlue my-2' >Configuration</p>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/profile'
                ? 'font-semibold text-deepPurple border-r-4 border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <FaUser className="mr-3 text-xl" /> Profile
          </Link>
          <Link
            to="/manage-users"
            className={`flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 ${
              location.pathname === '/manage-users'
                ? 'font-semibold text-deepPurple border-r-4 border-deepPurple'
                : 'text-lightGrayBlue'
            }`}
            onClick={closeSidebar} // Close sidebar when clicking the link
          >
            <FaUsers className="mr-3 text-xl" /> Manage Users
          </Link>

          
        </nav>
      </div>

      {/* Content Overlay for Mobile */}
      <div
        className={`fixed inset-0 z-20 bg-black opacity-50 lg:hidden transition-opacity ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      >

      </div>


    </div>
  );
};

export default Sidebar;
