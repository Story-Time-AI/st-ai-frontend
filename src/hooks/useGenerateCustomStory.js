import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * Custom hook for generating personalized stories from user-provided scenes
 * @returns {Object} Functions and state variables for story generation
 */
const useGenerateCustomStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState(null);
  const [error, setError] = useState(null);
  
  // Prevent duplicate story generation requests
  const isGeneratingRef = useRef(false);

  /**
   * Generate a personalized story from user-provided scenes
   * @param {Object} data - The story data to send to the API
   * @param {string} data.storyTitle - The title of the story
   * @param {string} data.animationStyle - The animation style to use
   * @param {string} data.avatarId - The ID of the selected avatar (required for main character)
   * @param {Object} data.characters - Optional additional character definitions
   * @param {Array} data.pages - Array of page objects with title and text
   * @returns {Promise} A promise that resolves to the generated personalized story
   */
  const generateFromUserScenes = async (data) => {
    // Prevent duplicate generation requests
    if (isGeneratingRef.current) {
      toast.error('Custom story generation already in progress!', {
        id: 'custom-generation-in-progress',
      });
      return;
    }

    isGeneratingRef.current = true;
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    // Show loading toast with custom message for user scenes
    const loadingToast = toast.loading('Personalizing your story scenes...', {
      id: 'generating-custom-story',
      duration: Infinity, // Keep until dismissed
    });

    try {
      const response = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app/api/generate-custom",
        {
          storyTitle: data.storyTitle,
          animationStyle: data.animationStyle,
          avatarId: data.avatarId, // Required - avatar will be the personalized main character
          characters: data.characters || {}, // Optional additional characters
          pages: data.pages,
        },
        {
          headers: { 
            Authorization: token,
            "Content-Type": "application/json"
          },
        }
      );

      // Extract the story data from the response
      const storyResult = response.data;
      
      setStoryData(storyResult);
      
      // Dismiss loading toast and show success
      toast.dismiss('generating-custom-story');
      toast.success(`🎨 Your personalized story "${data.storyTitle}" is ready!`, {
        id: 'custom-story-generated',
        duration: 4000,
        icon: '✨',
      });

      setIsLoading(false);
      isGeneratingRef.current = false;
      return storyResult;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to generate personalized story";
      setError(errorMessage);
      
      // Dismiss loading toast and show error
      toast.dismiss('generating-custom-story');
      
      // Show specific error messages based on error type
      if (err.response?.status === 401) {
        toast.error('Please log in to create personalized stories', {
          id: 'custom-auth-error',
          duration: 5000,
          icon: '🔒',
        });
      } else if (err.response?.status === 429) {
        toast.error('Too many requests. Please wait before creating another story.', {
          id: 'custom-rate-limit-error',
          duration: 6000,
          icon: '⏱️',
        });
      } else if (err.response?.status === 400) {
        toast.error('Invalid story data. Please check your scenes and try again.', {
          id: 'custom-validation-error',
          duration: 5000,
          icon: '⚠️',
        });
      } else if (err.response?.status === 500) {
        toast.error('Server error while personalizing your story. Our team has been notified.', {
          id: 'custom-server-error',
          duration: 5000,
          icon: '🔧',
        });
      } else {
        toast.error(errorMessage, {
          id: 'custom-generation-error',
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
    setStoryData(null);
    setError(null);
    
    // Show confirmation toast
    toast.success('Custom story cleared successfully', {
      id: 'custom-story-reset',
      duration: 2000,
      icon: '🧹',
    });
  };

  /**
   * Cancel ongoing custom story generation
   */
  const cancelGeneration = () => {
    if (isGeneratingRef.current) {
      // Note: This doesn't actually cancel the HTTP request, 
      // but stops the loading state and shows cancellation message
      setIsLoading(false);
      isGeneratingRef.current = false;
      
      toast.dismiss('generating-custom-story');
      toast('Custom story generation cancelled', {
        id: 'custom-generation-cancelled',
        duration: 3000,
        icon: '⏹️',
      });
    }
  };

  /**
   * Validate user scenes before generation
   * @param {Array} pages - Array of page objects to validate
   * @returns {boolean} True if valid, false otherwise
   */
  const validateScenes = (pages) => {
    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      toast.error('Please add at least one scene to your story', {
        id: 'no-scenes-error',
        duration: 4000,
        icon: '📝',
      });
      return false;
    }

    const invalidPages = pages.filter(page => !page.title?.trim() || !page.text?.trim());
    if (invalidPages.length > 0) {
      toast.error('All scenes must have both a title and description', {
        id: 'incomplete-scenes-error',
        duration: 4000,
        icon: '✏️',
      });
      return false;
    }

    if (pages.length > 20) {
      toast.error('Maximum 20 scenes allowed per story', {
        id: 'too-many-scenes-error',
        duration: 4000,
        icon: '📚',
      });
      return false;
    }

    return true;
  };

  return {
    generateFromUserScenes,
    resetStory,
    cancelGeneration,
    validateScenes,
    isLoading,
    storyData,
    error,
  };
};

export default useGenerateCustomStory;