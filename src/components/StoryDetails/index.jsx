import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCrown } from "react-icons/fa";
import Header from '../Header'

const storyPages = [
    {
      text: "Once upon a time, in a magical forest, animals gathered around a tree that glowed with a warm, golden light. Everyone was curious about the tree’s gentle glow.",
      image: "https://via.placeholder.com/300",
    },
    {
      text: "The animals noticed that the tree only glowed when someone shared a kind act. It became a symbol of kindness and brought joy to the forest.",
      image: "https://via.placeholder.com/300",
    },
    {
      text: "One day, a little boy visited the forest and planted a seed. The animals celebrated as the seed grew into another glowing tree.",
      image: "https://via.placeholder.com/300",
    },
  ];
const StoryPreview = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Navigate to the next page
  const nextPage = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col  p-6">
    <Header title='Story Details' />
      {/* Story Container */}
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 flex items-center justify-between mt-5 relative">
        {/* Left Arrow */}
        <button
          onClick={prevPage}
          className={`btn btn-sm btn-circle btn-outline text-deepPurple border-deepPurple hover:bg-deepPurple hover:text-white ${
            currentPage === 0 ? "invisible" : ""
          }`}
        >
          <FaArrowLeft />
        </button>

        {/* Story Content */}
        <div className="flex-1 grid grid-cols-1  p-2 md:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={storyPages[currentPage].image}
              alt={`Story Illustration Page ${currentPage + 1}`}
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div> 
          
          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <p className="text-lg text-primaryDarkBlue font-medium">
              {storyPages[currentPage]?.text}
            </p>
            <p className="text-gray-500 text-sm mt-4">Page {currentPage + 1}</p>
          </div>

         
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextPage}
          className={`btn btn-sm btn-circle btn-outline text-deepPurple border-deepPurple hover:bg-deepPurple hover:text-white ${
            currentPage === storyPages.length - 1 ? "invisible" : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* PDF Button */}
     <div className='max-w-5xl flex justify-end items-end  w-full '>
        <button className="mt-6 btn  btn-primary
       bg-deepPurple text-white  gap-2">
        GET THE PDF COPY <FaCrown />
      </button>
        </div> 
    </div>
  );
};

export default StoryPreview;
