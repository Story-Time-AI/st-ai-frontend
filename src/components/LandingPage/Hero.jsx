import React from "react";
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className="bg-base-100">
      {/* Header */}
    
      <header className="navbar bg-base-100 shadow-md px-4 lg:px-20">
  {/* Logo */}
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">
      <span className="text-primary">📚 StoryTymeAI</span>
    </a>
  </div>

  {/* Hamburger Menu for Mobile */}
  <div className="flex-none lg:hidden">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {/* Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
      >
        <li>
          <a href="#HowItWorks" className="hover:text-primary">How It Works</a>
        </li>
       
        <li>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
        </li>
        <li>
          <a href="#FAQ" className="hover:text-primary">FAQ</a>
        </li>
      </ul>
    </div>
  </div>

  {/* Full Menu for Larger Screens */}
  <div className="hidden lg:flex">
    <ul className="menu menu-horizontal p-0 space-x-4">
      <li>
      <a href="#HowItWorks" className="hover:text-primary">How It Works</a>
      </li>
   
      <li>
        <a href="#pricing" className="hover:text-primary">Pricing</a>
      </li>
      <li>
        <a href="#FAQ" className="hover:text-primary">FAQ</a>
      </li>
    </ul>
  <Link to='/signin'>  <button  className="btn btn-primary ml-4">
      Create Your Story

    </button></Link>
  </div>
</header>



      {/* Hero Section */}
      <div className="max-w-7xl md:mx-[10vw]">

        <div className="pt-12 md:pt-28 pb-16 md:pb-24">
            {/* Hero content */}
            <div
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left"
            >
                
            {/* Text Section */}
            <div className="flex-1">

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Custom children’s books in five simple steps.
                </h1>
                <p className="py-6 text-lg md:text-xl text-gray-600 md:max-w-lg">
                Make your child the main character in their own adventure. Enjoy custom-made stories and stunning illustrations with the click of a few buttons. 
                </p>
                <button className="btn btn-primary mt-4">
                Create Your Story

                </button>
            </div>

            {/* Books Preview */}
            <div className="flex-1 grid grid-cols-2 gap-6 md:gap-8">
                <img
                src="https://via.placeholder.com/200"
                alt="Book 1"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <img
                src="https://via.placeholder.com/200"
                alt="Book 2"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <img
                src="https://via.placeholder.com/200"
                alt="Book 3"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <img
                src="https://via.placeholder.com/200"
                alt="Book 4"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
            </div>
            </div>
        </div>

    </div>

    </div>
  );
};

export default Hero;
