import React from 'react';
import { FaEye } from 'react-icons/fa';

const StoryCard = ({ title, characterName, storyType, imageSrc, buttonText }) => (
  <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto flex flex-col items-center space-y-4">
    {/* Story Image */}
    <div className="w-full h-48 rounded-md overflow-hidden">
      <img src={imageSrc} alt="Story" className="w-full h-full object-cover" />
    </div>

    {/* Story Details */}
    <div className="text-center w-full">
      <p className="text-lg font-semibold text-primaryDarkBlue">{title}</p>
      <p className="text-sm text-gray-500">{characterName}</p>
      <p className="text-sm text-gray-500">{storyType}</p>
    </div>

    {/* Button */}
    <button className="btn bg-deepPurple text-white w-full mt-4 flex items-center justify-center">
      <FaEye className="mr-2" /> {buttonText}
    </button>
  </div>
);

export default StoryCard;
