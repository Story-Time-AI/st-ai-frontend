import { useState } from "react";
import axios from "axios";

/**
 * Custom hook for handling story checkout/purchase functionality.
 *
 * @param {string} authToken JWT or similar authentication token
 * @returns {Object} { 
 *   purchaseStory, 
 *   checkoutInProgress, 
 *   purchaseError, 
 *   purchaseSuccess, 
 *   canDownloadStory,
 *   resetCheckoutState 
 * }
 */
export default function useStoryCheckout(authToken) {
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [canDownloadStory, setCanDownloadStory] = useState(false);

  /**
   * Initiates the story purchase/checkout process
   * @param {string} storyIdentifier - The story ID to purchase
   * @param {string} storyTitle - The title of the story (optional, for better UX)
   * @param {number} totalPages - Number of pages in the story (optional)
   * @returns {Promise<Object|null>} Returns checkout response with URL or null if error
   */
  const purchaseStory = async (storyIdentifier, storyTitle = "", totalPages = 0) => {
    // Reset previous states
    setPurchaseError(null);
    setPurchaseSuccess(false);
    setCanDownloadStory(false);
    setCheckoutInProgress(true);

    try {
      const checkoutPayload = {
        storyId: storyIdentifier,
        ...(storyTitle && { title: storyTitle }),
        ...(totalPages && { pages: totalPages })
      };

      const response = await axios.post(
        "http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.appapi/create-checkout",
        checkoutPayload,
        {
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful checkout creation
      if (response.data && response.status === 200) {
        setPurchaseSuccess(true);
        setCanDownloadStory(response.data.canDownload || false);
        
        // Return the response data so the component can access the URL
        return response.data;
      } else {
        setPurchaseError("Unexpected response from checkout service.");
        return null;
      }

    } catch (checkoutErr) {
      // Handle different error scenarios
      if (checkoutErr.response?.status === 409) {
        // Story already purchased - this might actually be a success case
        setPurchaseError("Story already purchased");
        setCanDownloadStory(checkoutErr.response.data?.canDownload || true);
      } else if (checkoutErr.response?.status === 401) {
        setPurchaseError("Authentication failed. Please log in again.");
      } else if (checkoutErr.response?.status === 404) {
        setPurchaseError("Story not found or no longer available.");
      } else if (checkoutErr.response?.status === 400) {
        setPurchaseError(
          checkoutErr.response.data?.error || 
          "Invalid purchase request. Please check your input."
        );
      } else {
        setPurchaseError(
          checkoutErr.response?.data?.error || 
          checkoutErr.message || 
          "Failed to complete story purchase. Please try again."
        );
      }
      return null;
    } finally {
      setCheckoutInProgress(false);
    }
  };

  /**
   * Resets all checkout-related state variables
   */
  const resetCheckoutState = () => {
    setCheckoutInProgress(false);
    setPurchaseError(null);
    setPurchaseSuccess(false);
    setCanDownloadStory(false);
  };

  return {
    purchaseStory,
    checkoutInProgress,
    purchaseError,
    purchaseSuccess,
    canDownloadStory,
    resetCheckoutState
  };
}