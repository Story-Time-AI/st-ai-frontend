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
        "Our AI generates unique stories based on the details you provide, such as the child’s name, preferences, and themes.",
    },
    {
      question: "Can I add custom illustrations to the stories?",
      answer:
        "Yes, you can choose from a variety of illustrations or let the AI generate artwork to match the story's theme.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "We offer a free trial that allows you to create a limited number of stories to explore the platform's features.",
    },
  ];
  

  return (
    <section id='FAQ' className="py-12 bg-base-100 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base font-medium text-gray-600">
            Get answers to the most common questions about our service.
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-12 sm:mt-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="px-4 py-5 border border-gray-300 rounded-lg shadow-md bg-white"
              >
                <h3>
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                    className="flex items-center justify-between w-full text-base font-bold text-left text-gray-800"
                  >
                    <span>{faq.question}</span>
                    <span>
                      {activeIndex === index ? (
                        <svg
                          className="w-5 h-5 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-600"
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
                      )}
                    </span>
                  </button>
                </h3>

                {activeIndex === index && (
                  <div className="pt-4 text-base font-medium text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
