import { useState } from "react";
import axios from "axios";

/**
 * Custom hook for generating personalized stories from user-provided scenes
 * @returns {Object} Functions and state variables for story generation
 */
const useGenerateCustomStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState(null);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app//api/generate-custom",
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
      setIsLoading(false);
      return storyResult;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate personalized story");
      setIsLoading(false);
      throw err;
    }
  };

  /**
   * Reset the story state
   */
  const resetStory = () => {
    setStoryData(null);
    setError(null);
  };

  return {
    generateFromUserScenes,
    resetStory,
    isLoading,
    storyData,
    error,
  };
};

export default useGenerateCustomStory;