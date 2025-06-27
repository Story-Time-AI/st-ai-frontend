import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Custom hook for generating AI-written stories
 * @returns {Object} Functions and state variables for story generation
 */
const useGenerateStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyPages, setStoryPages] = useState([]);
  const [error, setError] = useState(null);
  
  // Prevent duplicate story generation requests
  const isGeneratingRef = useRef(false);

  /**
   * Generate an AI-written story
   * @param {Object} storyData - The story data to send to the API
   * @param {string} storyData.storyTitle - The title of the story
   * @param {string} storyData.animationStyle - The animation style to use
   * @param {number} storyData.numberOfPages - The number of pages
   * @param {string} storyData.avatarId - The ID of the selected avatar (required for main character)
   * @param {Object} storyData.characters - Optional additional character definitions (companion, antagonist)
   * @returns {Promise} A promise that resolves to the generated story
   */
  const generateStory = async (storyData) => {
    // Prevent duplicate generation requests
    if (isGeneratingRef.current) {
      toast.error('Story generation already in progress!', {
        id: 'generation-in-progress',
      });
      return;
    }

    isGeneratingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    const token = localStorage.getItem("token");

    // Show loading toast
    const loadingToast = toast.loading('Creating your magical story...', {
      id: 'generating-story',
      duration: Infinity, // Keep until dismissed
    });

    try {
      const response = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app/api/generate",
        {
          storyTitle: storyData.storyTitle,
          animationStyle: storyData.animationStyle,
          numberOfPages: storyData.numberOfPages,
          avatarId: storyData.avatarId, // Required - avatar will be the main character
          characters: storyData.characters || {} // Optional additional characters
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
        }
      );

      setStoryPages(response.data);
      
      // Dismiss loading toast and show success
      toast.dismiss('generating-story');
      toast.success(`🎉 "${storyData.storyTitle}" has been created successfully!`, {
        id: 'story-generated',
        duration: 4000,
        icon: '📚',
      });

      setIsLoading(false);
      isGeneratingRef.current = false;
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to generate story";
      setError(errorMessage);
      
      // Dismiss loading toast and show error
      toast.dismiss('generating-story');
      
      // Show specific error messages based on error type
      if (err.response?.status === 401) {
        toast.error('Please log in to generate stories', {
          id: 'auth-error',
          duration: 5000,
          icon: '🔒',
        });
      } else if (err.response?.status === 429) {
        toast.error('Too many requests. Please wait a moment and try again.', {
          id: 'rate-limit-error',
          duration: 6000,
          icon: '⏱️',
        });
      } else if (err.response?.status === 500) {
        toast.error('Server error. Our team has been notified.', {
          id: 'server-error',
          duration: 5000,
          icon: '🔧',
        });
      } else {
        toast.error(errorMessage, {
          id: 'generation-error',
          duration: 5000,
          icon: '❌',
        });
      }

      setIsLoading(false);
      isGeneratingRef.current = false;
      throw err;
    }
  };

  /**
   * Reset the story state
   */
  const resetStory = () => {
    setStoryPages([]);
    setError(null);
    
    // Show confirmation toast
    toast.success('Story cleared successfully', {
      id: 'story-reset',
      duration: 2000,
      icon: '🧹',
    });
  };

  /**
   * Cancel ongoing story generation
   */
  const cancelGeneration = () => {
    if (isGeneratingRef.current) {
      // Note: This doesn't actually cancel the HTTP request, 
      // but stops the loading state and shows cancellation message
      setIsLoading(false);
      isGeneratingRef.current = false;
      
      toast.dismiss('generating-story');
      toast('Story generation cancelled', {
        id: 'generation-cancelled',
        duration: 3000,
        icon: '⏹️',
      });
    }
  };

  return {
    generateStory,
    resetStory,
    cancelGeneration,
    isLoading,
    storyPages,
    error,
  };
};

export default useGenerateStory;