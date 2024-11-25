import React from "react";

const HowItWorks = () => {

  const steps = [
    {
      id: 1,
      title: "Create a free account",
      description:
        "Sign up easily and start your journey with our platform to create something magical.",
    },
    {
      id: 2,
      title: "Build your website",
      description:
        "Use our tools to bring your ideas to life with simplicity and speed.",
    },
    {
      id: 3,
      title: "Release & Launch",
      description:
        "Finalize your creation and share it with the world in just a few clicks.",
    },
  ];

  return (
    <section id="HowItWorks" className="py-12 bg-base-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            How does it work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-lg text-gray-600">
            Learn how our platform makes it easy for you to bring your ideas to
            life.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          {/* Decorative Dotted Line (Optional) */}
          <div className="absolute inset-x-0 hidden top-2 md:block xl:px-44 md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="Decorative dotted line"
            />
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {steps.map((step) => (
              <div key={step.id}>
                {/* Step Number */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary text-white rounded-full shadow-lg">
                  <span className="text-xl font-semibold">{step.id}</span>
                </div>
                {/* Step Title */}
                <h3 className="mt-6 text-xl md:mt-10 font-bold text-gray-800">
                  {step.title}
                </h3>
                {/* Step Description */}
                <p className="mt-4 text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
