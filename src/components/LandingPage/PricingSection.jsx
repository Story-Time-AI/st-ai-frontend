import React from "react";

const PricingSection = () => {
  const features = [
    {
      id: 1,
      title: "Personalized Stories",
      description: "Create unique and magical tales starring your child.",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "AI-Generated Illustrations",
      description: "Beautiful custom artwork brings every story to life.",
      icon: (
        <svg
          className="w-5 h-5 text-pink-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Instant Download",
      description: "Get your completed storybook in minutes, ready to enjoy.",
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  const pricingTiers = [
    {
      pages: "Short Story",
      priceRange: "Starting from $3",
      description: "Perfect for bedtime stories",
      popular: false,
      features: ["Personalized character", "AI illustrations", "PDF download"],
      pageCount: "Based on story length"
    },
    {
      pages: "Medium Story", 
      priceRange: "Dynamic pricing",
      description: "Great for adventure tales",
      popular: true,
      features: ["Personalized character", "AI illustrations", "PDF download", "Extra story depth"],
      pageCount: "Price calculated per page"
    },
    {
      pages: "Long Story",
      priceRange: "Custom pricing",
      description: "Epic stories with rich details", 
      popular: false,
      features: ["Personalized character", "AI illustrations", "PDF download", "Rich storyline", "Multiple characters"],
      pageCount: "Based on final page count"
    }
  ];

  return (
    <section id="pricing" className="py-12 bg-base-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full text-white shadow-lg">
              <span className="text-xl">💫</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Dynamic Pricing Per Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fair pricing based on your story's length and complexity. Starting from just $3, 
            you only pay for what you create!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative ${
                tier.popular 
                  ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1 rounded-2xl shadow-2xl transform scale-105' 
                  : 'bg-white rounded-2xl shadow-lg hover:shadow-xl'
              } transition-all duration-300 hover:scale-105 group`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                  🌟 Most Popular
                </div>
              )}
              
              <div className={`${tier.popular ? 'bg-white rounded-2xl p-8' : 'p-8'} text-center h-full flex flex-col`}>
                <div className="mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    📖
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {tier.pages}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6 flex-grow">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {tier.priceRange}
                    </span>
                    <span className="text-gray-500 text-sm mt-1">{tier.pageCount}</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-600">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-purple-300'
                } group-hover:transform group-hover:-translate-y-1`}>
                  Create {tier.pages}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="relative max-w-4xl mx-auto mt-8 md:mt-12">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl shadow-xl">
            <div className="p-8 md:px-12 md:py-10">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                How Our Dynamic Pricing Works
              </h3>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                We calculate your story price based on the final number of pages and illustrations generated. 
                You'll see the exact cost before payment - no surprises!
              </p>
              
              <div className="grid items-center grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {features.map((feature) => (
                  <div key={feature.id} className="flex flex-col items-center text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-purple-200 rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-2">
                        {feature.title}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pricing Info Box */}
              <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-lg">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-4">
                    <span className="text-white font-bold">💡</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Fair & Transparent Pricing</h4>
                  <p className="text-gray-600 text-sm">
                    Starting from $3 • Price calculated based on final story length • 
                    See exact cost before payment • No hidden fees
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-200 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Instant Download</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Safe & Secure Payment</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;