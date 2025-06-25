import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaChevronRight, FaBook, FaArrowLeft } from 'react-icons/fa';

/**
 * Breadcrumb Component for Story Details Page
 * @param {Object} props
 * @param {string} props.storyTitle - The title of the current story
 * @param {string} props.storyId - The ID of the story (optional)
 * @param {boolean} props.showBackButton - Whether to show a back button
 * @param {string} props.libraryPath - Custom path to library (default: '/library')
 */
const StoryBreadcrumb = ({ 
  storyTitle = "Loading...", 
  storyId = "",
  showBackButton = true,
  libraryPath = "/library"
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Truncate long story titles
  const truncatedTitle = storyTitle && storyTitle.length > 50 
    ? `${storyTitle.substring(0, 50)}...` 
    : storyTitle;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            {/* Home/Dashboard Link */}
            {/* <Link 
              to="/" 
              className="flex items-center text-gray-500 hover:text-deepPurple transition-colors duration-200"
            >
              <FaHome className="w-4 h-4" />
              <span className="ml-1 hidden sm:inline">Home</span>
            </Link> */}

            {/* Separator */}
            {/* <FaChevronRight className="w-3 h-3 text-gray-400" /> */}

            {/* Library Link */}
            <Link 
              to={libraryPath}
              className="flex items-center text-gray-500 hover:text-deepPurple transition-colors duration-200"
            >
              <FaBook className="w-4 h-4" />
              <span className="ml-1">Library</span>
            </Link>

            {/* Separator */}
            <FaChevronRight className="w-3 h-3 text-gray-400" />

            {/* Current Story */}
            <span className="flex items-center text-gray-900 font-medium">
              <span className="truncate max-w-xs sm:max-w-md lg:max-w-lg" title={storyTitle}>
                {truncatedTitle}
              </span>
            </span>
          </nav>

          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryBreadcrumb;