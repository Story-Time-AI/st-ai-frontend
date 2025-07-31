import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Free Account",
      description:
        "Join our friendly community! Setting up your account is super easy and takes just a few minutes. No scary stuff, just fun ahead!",
      bgColor: "bg-gradient-to-br from-yellow-200 to-orange-200",
      iconColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
      hoverColor: "hover:bg-gradient-to-br hover:from-yellow-300 hover:to-orange-300"
    },
    {
      id: 2,
      title: "Build Amazing Stories",
      description:
        "Use our magical storytelling tools to create wonderful adventures. Mix and match characters, places, and exciting plot twists!",
      bgColor: "bg-gradient-to-br from-green-200 to-teal-200", 
      iconColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
      hoverColor: "hover:bg-gradient-to-br hover:from-green-300 hover:to-teal-300"
    },
    {
      id: 3,
      title: "Share Your Creations",
      description:
        "Show your fantastic stories to family and friends! Download, print, or share digitally - your imagination deserves to be celebrated!",
      bgColor: "bg-gradient-to-br from-pink-200 to-rose-200",
      iconColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500", 
      hoverColor: "hover:bg-gradient-to-br hover:from-pink-300 hover:to-rose-300"
    },
  ];

  return (
    <section id="HowItWorks" className="py-16 bg-base-100 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
          
          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Creating amazing stories has never been easier! Follow these simple steps 
            and watch your imagination come to life in just minutes.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative mt-16 lg:mt-24">
          {/* Connecting Path for Desktop */}
          <div className="absolute inset-x-0 top-12 hidden lg:block">
            <div className="flex items-center justify-center px-8">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`group relative ${step.bgColor} ${step.hoverColor} p-8 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-white`}
              >
                {/* Step Number Circle */}
                <div className={`flex items-center justify-center w-20 h-20 mx-auto ${step.iconColor} rounded-full shadow-lg mb-6 group-hover:animate-bounce`}>
                  {/* Custom Icon Shapes instead of emojis */}
                  {step.id === 1 && (
                    <div className="relative">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                      <div className="absolute top-2 left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    </div>
                  )}
                  {step.id === 2 && (
                    <div className="relative">
                      <div className="w-10 h-6 bg-white rounded-lg"></div>
                      <div className="absolute top-1 left-1 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
                      <div className="absolute top-3 left-1 w-6 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
                    </div>
                  )}
                  {step.id === 3 && (
                    <div className="relative">
                      <div className="w-3 h-8 bg-white rounded-full transform rotate-45"></div>
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-white rounded-full"></div>
                      <div className="absolute top-1 left-1 w-2 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform rotate-45"></div>
                    </div>
                  )}
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Ready to start your storytelling adventure?
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
              Get Started for Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;