import React from "react";
import { Link } from 'react-router-dom';

const AffiliatePage = () => {
  const handleJoinAffiliate = () => {
    window.open('https://storytyme-ai.getrewardful.com/signup', '_blank');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-md px-4 lg:px-20">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <span className="text-primary">📚 StoryTymeAI</span>
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-4">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><a href="/#HowItWorks" className="hover:text-primary">How It Works</a></li>
            <li><a href="/#pricing" className="hover:text-primary">Pricing</a></li>
            <li><a href="/#FAQ" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl md:mx-[10vw]">
        <div className="pt-12 md:pt-20 pb-16">
          
          {/* Main Hero */}
          <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left mb-20">
            
            {/* Text Section */}
            <div className="flex-1 relative">
              {/* Floating decorative elements */}
              <div className="absolute -top-8 -left-4 animate-bounce">
                <div className="bg-yellow-300 rounded-full p-2 shadow-lg rotate-12">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              
              <div className="absolute top-16 -right-8 animate-pulse">
                <div className="bg-green-300 rounded-full p-3 shadow-lg -rotate-12">
                  <span className="text-3xl">🤝</span>
                </div>
              </div>

              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse mb-6">
                  Earn Big with Our 
                  <span className="relative inline-block ml-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Affiliate Program
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                      <path d="M2 8C40 4 80 2 120 4C160 6 180 8 198 10" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                
                <p className="py-6 text-lg md:text-xl text-gray-700 md:max-w-lg leading-relaxed">
                  💸 Earn <span className="font-bold text-green-600">25% commission</span> on every sale! 
                  🎯 Help parents create magical stories for their children and get rewarded for it. ✨
                </p>

                {/* Commission Highlight */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-8 shadow-lg border border-green-200">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🎉</div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-800">25% Commission Rate</h3>
                      <p className="text-green-700">On every single purchase + 60-day cookie duration</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA button */}
                <div className="relative inline-block">
                  <button 
                    onClick={handleJoinAffiliate}
                    className="group relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="text-2xl">🚀</span>
                      Join Our Affiliate Program
                      <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">💰</span>
                    </span>
                    
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Floating arrow pointer */}
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 animate-bounce hidden md:block">
                    <div className="text-3xl rotate-12">👆</div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="text-green-500">💳</span>
                    <span className="font-medium">Monthly Payouts</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">📊</span>
                    <span>Real-time Tracking</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-500">🎯</span>
                    <span>60-day Cookies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Section - Earnings Illustration */}
            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                
                {/* Floating money elements */}
                <div className="absolute -top-4 -right-4 animate-bounce">
                  <div className="bg-yellow-400 rounded-full p-3 shadow-lg">
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 -left-2 animate-pulse">
                  <div className="bg-green-400 rounded-full p-2 shadow-lg">
                    <span className="text-2xl">💸</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">Your Earning Potential</h3>
                  
                  {/* Example calculations */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">10 sales/month</span>
                        <span className="text-2xl font-bold text-green-600">$125</span>
                      </div>
                      <div className="text-sm text-gray-500">at $50 average order</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">25 sales/month</span>
                        <span className="text-2xl font-bold text-green-600">$312</span>
                      </div>
                      <div className="text-sm text-gray-500">at $50 average order</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 shadow-md border-2 border-yellow-300">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">50+ sales/month</span>
                        <span className="text-3xl font-bold text-orange-600">$625+</span>
                      </div>
                      <div className="text-sm text-orange-600 font-medium">Top Affiliate Tier! 🏆</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Join Our Affiliate Program?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-4 -right-4 bg-purple-400 rounded-full p-3 group-hover:animate-spin">
                    <span className="text-3xl">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-4">High Conversion Rate</h3>
                  <p className="text-purple-700">Parents love creating personalized stories for their kids. Our product practically sells itself!</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-emerald-100 p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-4 -right-4 bg-green-400 rounded-full p-3 group-hover:animate-bounce">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-4">Marketing Materials</h3>
                  <p className="text-green-700">Get access to banners, email templates, social media content, and more to maximize your success.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8 transform group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-4 -right-4 bg-blue-400 rounded-full p-3 group-hover:animate-pulse">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Dedicated Support</h3>
                  <p className="text-blue-700">Our affiliate team is here to help you succeed with personalized tips and strategies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📝</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-orange-400 rounded-full px-2 py-1">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Sign Up</h3>
                <p className="text-gray-600">Join our affiliate program in just 2 minutes</p>
              </div>

              {/* Step 2 */}
              <div className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-full w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🔗</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-400 rounded-full px-2 py-1">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Get Your Link</h3>
                <p className="text-gray-600">Receive your unique affiliate tracking link</p>
              </div>

              {/* Step 3 */}
              <div className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📢</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-400 rounded-full px-2 py-1">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Promote</h3>
                <p className="text-gray-600">Share with your audience using our materials</p>
              </div>

              {/* Step 4 */}
              <div className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-full w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">💰</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-purple-400 rounded-full px-2 py-1">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Earn Money</h3>
                <p className="text-gray-600">Get 25% commission on every sale!</p>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute -top-6 -left-6 bg-yellow-300 rounded-full p-4 animate-bounce opacity-70">
              <span className="text-4xl">⭐</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-300 rounded-full p-4 animate-pulse opacity-70">
              <span className="text-4xl">💎</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful affiliates who are already earning with StoryTymeAI. 
              It's free to join and takes less than 2 minutes to get started!
            </p>
            
            <div className="relative inline-block">
              <button 
                onClick={handleJoinAffiliate}
                className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <span className="text-3xl">🎉</span>
                  Start Earning 25% Commissions Today!
                  <span className="text-2xl group-hover:animate-spin">✨</span>
                </span>
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2">
                <span className="text-green-500">✅</span>
                Free to join • No minimum sales required • Monthly payouts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatePage;