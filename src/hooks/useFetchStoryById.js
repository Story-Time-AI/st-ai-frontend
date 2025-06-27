import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook that fetches a story by its ID from the server.
 *
 * @param {string} storyId The ID of the story to fetch
 * @param {string} token   JWT or similar auth token
 * @returns {Object} { story, loading, error }
 */
export default function useFetchStoryById(storyId, token) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no storyId is provided, skip fetching
    if (!storyId) {
      setError("No storyId provided");
      return;
    }

    const fetchStory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://storytymeai-e64xw.ondigitalocean.app/api/stories/${storyId}`,
          {
            headers: {
              Authorization: `${token}`, // Removed "Bearer " since you don't use it in other hooks
            },
          }
        );

        // Check the response structure
        if (response.data && response.data.status === "success") {
          setStory(response.data.data);
        } else {
          setError("Failed to load story. Invalid response structure.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong while fetching the story."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId, token]);

  return { story, loading, error };
}