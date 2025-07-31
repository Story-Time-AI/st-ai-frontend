import React from "react";
import {Link, useNavigate} from 'react-router-dom'

import imageA from "../../assets/a.png"
import imageB from "../../assets/b.png"
import imageC from "../../assets/c.png"
import imageD from "../../assets/d.png"

const Hero = () => {

  const navigate = useNavigate();

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/story-generator");
    } else {
      navigate("/signin");
    }
  };

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
      <button onClick={handleRedirect} className="btn btn-primary ml-4">
          Create Your Story

        </button>
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
<div className="flex-1 relative">
  {/* Floating decorative elements */}
  <div className="absolute -top-8 -left-4 animate-bounce">
    <div className="bg-yellow-300 rounded-full p-2 shadow-lg rotate-12">
      <span className="text-2xl">✨</span>
    </div>
  </div>
  
  <div className="absolute top-16 -right-8 animate-pulse">
    <div className="bg-pink-300 rounded-full p-3 shadow-lg -rotate-12">
      <span className="text-3xl">🌟</span>
    </div>
  </div>



  {/* Main content with enhanced styling */}
  <div className="relative z-10">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
      Custom children's books in 
      <span className="relative inline-block ml-2">
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          five simple steps
        </span>
        <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
          <path d="M2 8C40 4 80 2 120 4C160 6 180 8 198 10" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </span>
    </h1>
    
    <div className="relative">
      <p className="py-6 text-lg md:text-xl text-gray-700 md:max-w-lg leading-relaxed">
        🏰 Make your child the 
        <span className="font-semibold text-purple-600 mx-1">main character</span> 
        in their own magical adventure! ✨ Enjoy custom-made stories and stunning illustrations with just a few clicks.
      </p>
      
      {/* Fun stats or highlights */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
          <span className="text-green-600 text-sm">⚡</span>
          <span className="text-sm font-medium text-green-700">5 Minutes</span>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
          <span className="text-blue-600 text-sm">🎨</span>
          <span className="text-sm font-medium text-blue-700">AI Illustrated</span>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
          <span className="text-pink-600 text-sm">📚</span>
          <span className="text-sm font-medium text-pink-700">Personalized</span>
        </div>
      </div>
    </div>

    {/* Enhanced CTA button */}
    <div className="relative inline-block">
      <button 
        onClick={handleRedirect} 
        className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg"
      >
        <span className="relative z-10 flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          Create Your Story Now!
          <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">✨</span>
        </span>
        
        {/* Button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </button>
      
      {/* Floating arrow pointer */}
      <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 animate-bounce hidden md:block">
        <div className="text-3xl rotate-12">👆</div>
      </div>
    </div>

    {/* Trust indicators */}
    <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
        <span className="font-medium">50+ Happy Kids</span>
      </div>
      <div className="h-4 w-px bg-gray-300"></div>
      <div className="flex items-center gap-1">
        <span className="text-green-500">✅</span>
        <span>Safe & Secure</span>
      </div>
    </div>
  </div>
</div>

            {/* Books Preview */}
           <div className="flex-1 relative">
  {/* Magical background elements */}

  
  {/* Custom masonry-style grid */}
  <div className="relative grid grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
    {/* Book 1 - Featured larger */}
    <div className="group">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-yellow-200 to-orange-200 p-2">
        <img
          src={imageA}
          alt="Book 1"
className="w-full h-40 md:h-48 object-cover rounded-lg transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-2"
        />
        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
          <span className="text-2xl">⭐</span>
        </div>
      </div>
    </div>

    {/* Book 2 - Floating effect */}
    <div className="col-span-1 group">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-green-200 to-teal-200 p-2 transform hover:-translate-y-4 transition-all duration-500">
        <img
          src={imageB}
          alt="Book 2"
          className="w-full h-40 md:h-48 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute -top-1 -left-1 bg-green-400 rounded-full p-1 animate-pulse">
          <span className="text-lg">🌟</span>
        </div>
      </div>
    </div>

    {/* Book 3 - Tilted effect */}
    <div className="col-span-1 group">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-pink-200 to-rose-200 p-2 transform hover:rotate-3 hover:-translate-y-2 transition-all duration-500">
        <img
          src={imageC}
          alt="Book 3"
          className="w-full h-40 md:h-48 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute -bottom-1 -right-1 bg-pink-400 rounded-full p-1 animate-spin">
          <span className="text-lg">✨</span>
        </div>
      </div>
    </div>

    {/* Book 4 - Bouncy effect */}
    <div className="group">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-blue-200 to-purple-200 p-2 transform hover:scale-105 hover:-translate-y-3 transition-all duration-500">
        <img
          src={imageD}
          alt="Book 4"
className="w-full h-40 md:h-48 object-cover rounded-lg transform group-hover:scale-110 transition-all duration-300 group-hover:-rotate-1"
        />
        <div className="absolute -top-2 -left-2 bg-blue-400 rounded-full p-2 animate-bounce">
          <span className="text-2xl">🎭</span>
        </div>
      </div>
    </div>
  </div>

  {/* Floating elements for extra magic */}
  <div className="absolute top-4 right-4 animate-float">
    <div className="bg-yellow-300 rounded-full p-3 shadow-lg">
      <span className="text-2xl">📚</span>
    </div>
  </div>
  
  <div className="absolute bottom-4 left-4 animate-pulse">
    <div className="bg-purple-300 rounded-full p-2 shadow-lg">
      <span className="text-xl">🪄</span>
    </div>
  </div>
</div>

<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>
            </div>
        </div>

    </div>

    </div>
  );
};

export default Hero;
