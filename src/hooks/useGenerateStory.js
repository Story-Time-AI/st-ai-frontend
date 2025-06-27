import { useState } from "react";
import axios from "axios";

/**
 * Custom hook for generating AI-written stories
 * @returns {Object} Functions and state variables for story generation
 */
const useGenerateStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyPages, setStoryPages] = useState([]);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    setError(null);
    
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.app/api/generate",
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
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate story");
      setIsLoading(false);
      throw err;
    }
  };

  /**
   * Reset the story state
   */
  const resetStory = () => {
    setStoryPages([]);
    setError(null);
  };

  return {
    generateStory,
    resetStory,
    isLoading,
    storyPages,
    error,
  };
};

export default useGenerateStory;