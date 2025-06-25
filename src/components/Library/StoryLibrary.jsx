import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StoryCard({ story, href, onDelete, refreshStories }) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Get the first page image or default
  const cardImage = 
    story.pages && story.pages.length > 0 
      ? story.pages[0].image_url || "https://via.placeholder.com/300x200?text=No+Image+Available"
      : "https://via.placeholder.com/300x200?text=No+Image+Available";

  // Format creation date
  const createdDate = new Date(story.createdAt).toLocaleDateString();

  const handleRedirect = () => {
    navigate(href);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem('token'); // Adjust based on your auth implementation
      
      const response = await axios.delete(`https://storytymeai-e64xw.ondigitalocean.app//api/stories/${story._id}`, {
        headers: {
          'Authorization': `${token}`
        }
      });

      if (response.data.status === 'success') {
        // Call the onDelete callback to update the parent component
        if (onDelete) {
          onDelete(story._id);
        }
        
        // Call refreshStories to refetch the data
        if (refreshStories) {
          await refreshStories();
        }
        
        // Show success message (you can use a toast library here)
        console.log('Story deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      // Handle error (show error message to user)
      alert(error.response?.data?.message || 'Failed to delete story');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className={`card w-full bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 ${
          isDeleting ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={cardImage}
            alt={story.storyTitle}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image+Available";
            }}
          />
          
          {/* Animation Style Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
              {story.animationStyle}
            </span>
          </div>

          {/* Delete Button */}
          <div className="absolute top-2 left-2">
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="btn btn-error btn-sm btn-circle text-white hover:bg-red-600"
              title="Delete Story"
            >
              {isDeleting ? (
                <div className="loading loading-spinner loading-xs"></div>
              ) : (
                <FaTrash className="text-xs" />
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-primaryDarkBlue truncate">
            {story.storyTitle}
          </h3>
          <p className="text-sm text-gray-600">
            Character: {story.avatarId?.avatarName || story.avatarName}
          </p>
          <p className="text-sm text-gray-500">
            {story.numberOfPages} Page{story.numberOfPages !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Created: {createdDate}
          </p>
        </div>

        {/* Button Section */}
        <div className="p-4 pt-0 flex justify-center">
          <button
            onClick={handleRedirect}
            disabled={isDeleting}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <FaEye />
            View Story
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Story</h3>
            <p className="py-4">
              Are you sure you want to delete "{story.storyTitle}"? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={handleCancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="loading loading-spinner loading-sm"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function StoryLibrary({ 
  apiData = null, 
  stories = [],
  isLoading = false,
  error = null,
  onPageChange = null,
  refreshStories,
  refetchStories // Add this prop
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [localStories, setLocalStories] = useState(stories);
  const itemsPerPage = 6;
  
  // Determine if we're using API data or local stories
  const isUsingApiData = apiData && apiData.data;
  const storiesData = isUsingApiData ? apiData.data.stories : localStories;
  const paginationData = isUsingApiData ? apiData.data.pagination : null;

  // Local pagination for when using stories prop
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = isUsingApiData 
    ? storiesData 
    : storiesData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination info - handle cases where pagination might not exist
  const totalPages = isUsingApiData 
    ? paginationData?.totalPages || Math.ceil((storiesData?.length || 0) / itemsPerPage)
    : Math.ceil(storiesData.length / itemsPerPage);
  
  const hasNextPage = isUsingApiData
    ? paginationData?.hasNextPage || false
    : currentPage < totalPages;
    
  const hasPrevPage = isUsingApiData
    ? paginationData?.hasPrevPage || false
    : currentPage > 1;

  const totalStories = isUsingApiData
    ? paginationData?.totalStories || storiesData?.length || 0
    : storiesData.length;

  const currentPageNumber = isUsingApiData
    ? paginationData?.currentPage || currentPage
    : currentPage;

  // Use refetchStories if available, otherwise fall back to refreshStories
  const refreshFunction = refetchStories || refreshStories;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // If using API data and refresh function is available, use it
    if (isUsingApiData && refreshFunction) {
      refreshFunction(page);
    } else if (isUsingApiData && onPageChange) {
      // Fallback to onPageChange if refresh function is not available
      onPageChange(page);
    }
  };

  // Handle story deletion
  const handleStoryDelete = async (deletedStoryId) => {
    if (isUsingApiData && refreshFunction) {
      // If using API data, trigger a refresh using refresh function
      await refreshFunction(currentPageNumber);
    } else if (isUsingApiData && onPageChange) {
      // Fallback to onPageChange
      onPageChange(currentPageNumber);
    } else {
      // If using local stories, remove from local state
      setLocalStories(prev => prev.filter(story => story._id !== deletedStoryId));
    }
  };

  // Get page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPageNumber - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-primaryDarkBlue">
          My Stories
        </h1>
        
        {/* Total stories count */}
        {totalStories > 0 && (
          <span className="text-sm text-gray-600">
            Total: {totalStories} stories
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="text-gray-500 mt-2">Loading your stories...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>Error loading stories: {error}</span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && (!storiesData || storiesData.length === 0) && (
        <div className="text-center py-8">
          <div className="text-6xl text-gray-300 mb-4">📚</div>
          <p className="text-gray-500 text-lg">You haven't created any stories yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Start creating your personalized stories today!
          </p>
        </div>
      )}

      {/* Stories Grid */}
      {!isLoading && !error && storiesData && storiesData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStories.map((story) => (
              <div key={story._id}>
                <StoryCard 
                  story={story} 
                  href={`/library/${story._id}`}
                  onDelete={handleStoryDelete}
                  refreshStories={refreshFunction}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                <span>
                  Page {currentPageNumber} of {totalPages}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  className={`btn btn-outline btn-sm ${
                    !hasPrevPage ? "btn-disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPageNumber - 1)}
                  disabled={!hasPrevPage}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`btn btn-sm ${
                        currentPageNumber === pageNum ? "btn-primary" : "btn-outline"
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  className={`btn btn-outline btn-sm ${
                    !hasNextPage ? "btn-disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPageNumber + 1)}
                  disabled={!hasNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}