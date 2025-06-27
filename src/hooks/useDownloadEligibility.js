import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook for checking if a user can download a specific story.
 *
 * @param {string} storyIdentifier The ID of the story to check download eligibility for
 * @param {string} authToken JWT or similar authentication token
 * @param {boolean} autoCheck Whether to automatically check eligibility on mount (default: true)
 * @returns {Object} { 
 *   eligibilityData, 
 *   isCheckingEligibility, 
 *   eligibilityError, 
 *   downloadPermitted,
 *   storyMetadata,
 *   checkDownloadEligibility,
 *   resetEligibilityState 
 * }
 */
export default function useDownloadEligibility(storyIdentifier, authToken, autoCheck = true) {
  const [eligibilityData, setEligibilityData] = useState(null);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [eligibilityError, setEligibilityError] = useState(null);
  const [downloadPermitted, setDownloadPermitted] = useState(false);
  const [storyMetadata, setStoryMetadata] = useState(null);

  /**
   * Checks download eligibility for the specified story
   */
  const checkDownloadEligibility = async () => {
    if (!storyIdentifier) {
      setEligibilityError("No story ID provided for eligibility check");
      return;
    }

    if (!authToken) {
      setEligibilityError("Authentication token required for eligibility check");
      return;
    }

    setIsCheckingEligibility(true);
    setEligibilityError(null);
    setDownloadPermitted(false);
    setStoryMetadata(null);

    try {
      const response = await axios.get(
        `http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.appapi/can-download/${storyIdentifier}`,
        {
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.status === 200) {
        setEligibilityData(response.data);
        setDownloadPermitted(response.data.canDownload || false);
        
        // Extract story metadata if available
        const metadata = {
          storyId: response.data.storyId,
          title: response.data.title,
          pages: response.data.pages,
        };
        setStoryMetadata(metadata);

      } else {
        setEligibilityError("Unable to verify download eligibility");
      }

    } catch (eligibilityErr) {
      // Handle different error scenarios
      if (eligibilityErr.response?.status === 401) {
        setEligibilityError("Authentication failed. Please log in again.");
      } else if (eligibilityErr.response?.status === 403) {
        setEligibilityError("You don't have permission to download this story.");
        setDownloadPermitted(false);
      } else if (eligibilityErr.response?.status === 404) {
        setEligibilityError("Story not found or no longer available.");
      } else if (eligibilityErr.response?.status === 429) {
        setEligibilityError("Too many requests. Please try again later.");
      } else {
        setEligibilityError(
          eligibilityErr.response?.data?.message || 
          eligibilityErr.message || 
          "Failed to check download eligibility. Please try again."
        );
      }
    } finally {
      setIsCheckingEligibility(false);
    }
  };

  /**
   * Resets all eligibility-related state variables
   */
  const resetEligibilityState = () => {
    setEligibilityData(null);
    setIsCheckingEligibility(false);
    setEligibilityError(null);
    setDownloadPermitted(false);
    setStoryMetadata(null);
  };

  // Auto-check eligibility on mount or when dependencies change
  useEffect(() => {
    if (autoCheck && storyIdentifier && authToken) {
      checkDownloadEligibility();
    }
  }, [storyIdentifier, authToken, autoCheck]);

  return {
    eligibilityData,
    isCheckingEligibility,
    eligibilityError,
    downloadPermitted,
    storyMetadata,
    checkDownloadEligibility,
    resetEligibilityState
  };
}