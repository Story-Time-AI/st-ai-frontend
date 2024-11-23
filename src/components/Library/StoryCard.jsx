import React, { useEffect,useState, useCallback } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

  function StoryCard({ image, title, characterName, type, href }) {
   
    const navigate = useNavigate()
    const handleRedirect = () => {
      navigate(href); // Replace "/new-page" with your desired route
    };

    return (
      <div className="card w-full bg-white shadow-md
       rounded-lg hover:shadow-lg transition-transform transform
        hover:scale-105">
       
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
  
        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-primaryDarkBlue truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{characterName}</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
  
        {/* Button Section */}
     <div className="p-4 pt-0 flex justify-center">
          <button onClick={handleRedirect} className="btn btn-primary w-full flex items-center justify-center gap-2">
            <FaEye />
            View Story
          </button>
        </div>
 

      </div>
    );

  }

export default function Example() {

  const stories = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: "Max's Adventure Through the Seasons",
      characterName: 'Max',
      type: 'Adventure',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'The Magical Forest',
      characterName: 'Alice',
      type: 'Fantasy',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Space Odyssey',
      characterName: 'Bob',
      type: 'Sci-Fi',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      title: "Max's Adventure Through the Seasons",
      characterName: 'Max',
      type: 'Adventure',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      title: 'The Magical Forest',
      characterName: 'Alice',
      type: 'Fantasy',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150',
      title: 'Space Odyssey',
      characterName: 'Bob',
      type: 'Sci-Fi',
    },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate paginated stories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = stories.slice(indexOfFirstItem, indexOfLastItem);

  // Total number of pages
  const totalPages = Math.ceil(stories.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
     
      <h1 className="text-xl font-bold text-primaryDarkBlue mb-6">My Stories</h1>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentStories.map((story) => (
          <div key={story.id}>
            <StoryCard
              image={story.image}
              title={story.title}
              characterName={story.characterName}
              type={story.type}
              href='/story-details'
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          className={`btn btn-outline btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`btn btn-outline btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
}
