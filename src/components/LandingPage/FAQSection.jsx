import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "How does the AI create personalized stories?",
      answer:
        "Our AI generates unique stories based on the details you provide, such as the child's name, age, interests, and favorite themes. Each story is completely customized to make your child the hero of their own adventure!",
    },
    {
      question: "How does dynamic pricing work?",
      answer:
        "Our pricing is based on the final length and complexity of your story. Starting from just $3, you'll see the exact cost before payment based on the number of pages and illustrations generated. No hidden fees or surprises!",
    },
    {
      question: "Can I download and print the stories?",
      answer:
        "Absolutely! Once your story is complete, you'll receive a high-quality PDF that's perfect for reading on screen, printing at home, or even taking to a professional printer for a beautiful bound book.",
    },
    {
      question: "How long does it take to create a story?",
      answer:
        "Most stories are generated within 5-10 minutes! Our AI works quickly to create your personalized story and illustrations, so your child can start enjoying their adventure right away.",
    },
    {
      question: "Are the stories safe and appropriate for children?",
      answer:
        "Yes! All our stories are designed to be age-appropriate, educational, and promote positive values. Our AI is trained to create wholesome content that parents can feel confident sharing with their children.",
    },
    {
      question: "Can I create stories for different age groups?",
      answer:
        "Definitely! Our AI adapts the vocabulary, story complexity, and themes based on the child's age. Whether you're creating for a 3-year-old or a 10-year-old, the content will be perfectly tailored.",
    },
  ];

  return (
    <section id='FAQ' className="py-12 bg-base-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Got questions? We've got answers! Here's everything you need to know about creating magical stories for your little ones.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl' 
                    : 'bg-white border-2 border-gray-200 hover:border-purple-200 shadow-lg hover:shadow-xl'
                } rounded-2xl overflow-hidden`}
              >
                <h3>
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                    className="flex items-center justify-between w-full p-6 md:p-8 text-left transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-pink-50"
                  >
                    <span className="text-lg md:text-xl font-bold text-gray-800 pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white transform rotate-180' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-blue-500 group-hover:text-white'
                    }`}>
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                </h3>

                <div className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="w-full h-px bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-4"></div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              We're here to help you create the perfect story for your child!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;