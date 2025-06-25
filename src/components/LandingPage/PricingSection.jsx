import React from "react";

const PricingSection = () => {
  const features = [
    {
      id: 1,
      title: "Personalized Stories",
      description: "Create unique and magical tales for every child.",
      icon: (
        <svg
          className="w-5 h-5 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4a9 9 0 100 16 9 9 0 100-16zM12 8v4l2 2"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Instant Story Generation",
      description: "Generate a complete story in just minutes with AI.",
      icon: (
        <svg
          className="w-5 h-5 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M9 21h6"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Illustrated Storybooks",
      description: "Add custom illustrations to make stories magical.",
      icon: (
        <svg
          className="w-5 h-5 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12l5 5L20 7"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="pricing" className="py-12 bg-base-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center text-lg bg-primary rounded-full w-9 h-9 text-white">
              ✨
            </div>
            <h2 className="ml-3 text-4xl font-bold text-primary">
              AI-Powered Stories for Kids
            </h2>
          </div>
          <p className="mt-4 text-lg text-gray-600">
            No commitments. Start creating magical stories today.
          </p>
        </div>

        <div className="relative max-w-sm mx-auto mt-8 md:mt-12 md:max-w-3xl">
          <div className="relative overflow-hidden bg-white border border-gray-300 rounded-xl shadow-lg">
            <div className="p-6 md:px-10 md:py-9">
              <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-y-9 md:gap-y-0">
                {/* Features Section */}
                <div className="space-y-9">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-bold text-gray-800">
                          {feature.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Section */}
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-400">$</p>
                  <p className="text-6xl font-bold text-primary">99</p>
                  <p className="text-lg font-bold text-gray-400">/year</p>
                  <a
                    href="#"
                    className="inline-block mt-6 px-8 py-3 text-white bg-primary rounded-lg font-bold text-lg hover:bg-opacity-90"
                  >
                    Get started for $99
                  </a>
                  <p className="mt-4 text-sm text-gray-600">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            All features are available to all users
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
