import React, { useState } from "react";

const PricingSection = () => {
  const [estimatedPages, setEstimatedPages] = useState(5);
  
  // Pricing calculation: $3 base + $0.25 per extra page beyond 3
  const calculatePrice = (pages) => {
    return pages <= 3 ? 3.00 : 3.00 + ((pages - 3) * 0.25);
  };

  const features = [
    {
      id: 1,
      title: "Personalized Stories",
      description: "Create unique and magical tales starring your child.",
      icon: "👦",
    },
    {
      id: 2,
      title: "AI-Generated Illustrations",
      description: "Beautiful custom artwork brings every story to life.",
      icon: "🎨",
    },
    {
      id: 3,
      title: "Instant Download",
      description: "Get your completed storybook in minutes, ready to enjoy.",
      icon: "⚡",
    },
  ];

  const getStoryLength = (pages) => {
    if (pages <= 3) return "Quick Bedtime Story";
    if (pages <= 6) return "Adventure Tale";
    if (pages <= 10) return "Epic Journey";
    return "Legendary Chronicle";
  };

  const getPriceBreakdown = (pages) => {
    const baseCost = 3.00;
    const extraPages = Math.max(0, pages - 3);
    const extraCost = extraPages * 0.25;
    return { baseCost, extraPages, extraCost, total: baseCost + extraCost };
  };

  const breakdown = getPriceBreakdown(estimatedPages);

  return (
    <section id="pricing" className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full text-white shadow-lg">
              <span className="text-2xl">💫</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Try Our Dynamic Pricing
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Move the slider below to see how our fair pricing works. 
            <span className="font-semibold text-purple-600"> You only pay for what you create!</span>
          </p>
        </div>

        {/* Interactive Price Calculator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-gradient-to-r from-purple-200 to-pink-200">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-6 py-3 rounded-full text-lg font-bold shadow-lg">
              🎯 Interactive Pricing Tool
            </div>
            
            {/* Story Length Indicator */}
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full border-2 border-purple-200">
                <span className="text-2xl mr-2">📖</span>
                <span className="text-xl font-bold text-purple-700">
                  {getStoryLength(estimatedPages)}
                </span>
              </div>
            </div>

            {/* Slider Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold text-gray-700">
                  Number of Pages
                </label>
                <div className="bg-purple-100 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold text-purple-700">{estimatedPages}</span>
                  <span className="text-purple-600 ml-1">pages</span>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={estimatedPages}
                  onChange={(e) => setEstimatedPages(parseInt(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8B5CF6 0%, #EC4899 ${((estimatedPages - 3) / 17) * 100}%, #E5E7EB ${((estimatedPages - 3) / 17) * 100}%, #E5E7EB 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span className="font-medium">3 pages</span>
                  <span className="font-medium">20 pages</span>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1 rounded-2xl inline-block shadow-2xl">
                <div className="bg-white rounded-2xl px-8 py-6">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    ${breakdown.total.toFixed(2)}
                  </div>
                  <div className="text-gray-600 font-medium">
                    for your {estimatedPages}-page story
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                💡 Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-purple-200">
                  <span className="text-gray-700 font-medium">Base story (3 pages)</span>
                  <span className="text-lg font-bold text-purple-600">${breakdown.baseCost.toFixed(2)}</span>
                </div>
                {breakdown.extraPages > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-purple-200">
                    <span className="text-gray-700 font-medium">
                      Extra pages ({breakdown.extraPages} × $0.25)
                    </span>
                    <span className="text-lg font-bold text-pink-600">+${breakdown.extraCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 bg-white rounded-lg px-4 border-2 border-purple-200">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${breakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button className="inline-flex items-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1">
                <span className="mr-2">🚀</span>
                Create My ${breakdown.total.toFixed(2)} Story
              </button>
              <p className="text-sm text-gray-500 mt-3">
                No surprises • Pay exactly what you see • Instant download
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            What You Get With Every Story
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Examples */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Popular Story Lengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { pages: 3, popular: false },
              { pages: 5, popular: true },
              { pages: 8, popular: false },
              { pages: 12, popular: false }
            ].map((example, index) => {
              const price = calculatePrice(example.pages);
              return (
                <div 
                  key={index} 
                  className={`relative bg-white rounded-xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    example.popular ? 'border-purple-300 bg-purple-50' : 'border-gray-200'
                  } ${estimatedPages === example.pages ? 'ring-4 ring-purple-300' : ''}`}
                  onClick={() => setEstimatedPages(example.pages)}
                >
                  {example.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      ${price.toFixed(2)}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {example.pages} pages
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {getStoryLength(example.pages)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <span className="text-green-500 text-lg">✅</span>
              <span className="font-medium">Instant Download</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <span className="text-blue-500 text-lg">🔒</span>
              <span className="font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <span className="text-purple-500 text-lg">💝</span>
              <span className="font-medium">Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;