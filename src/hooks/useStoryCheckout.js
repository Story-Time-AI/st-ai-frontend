import { useState } from "react";
import axios from "axios";

/**
 * Custom hook for handling story checkout/purchase functionality with referral support.
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
      // Get referral code from Rewardful or localStorage
      let referralCode = null;
      
      // First try Rewardful
      if (typeof window !== "undefined" && window.Rewardful?.referral) {
        referralCode = window.Rewardful.referral;
        console.log("Using Rewardful referral code:", referralCode);
      }
      // Fallback to localStorage
      else if (typeof window !== "undefined") {
        referralCode = localStorage.getItem('referralCode') || localStorage.getItem('rewardfulReferral');
        console.log("Using stored referral code:", referralCode);
      }

      const checkoutPayload = {
        storyId: storyIdentifier,
        ...(storyTitle && { title: storyTitle }),
        ...(totalPages && { pages: totalPages }),
        ...(referralCode && { referralCode: referralCode }) // Add referral code if available
      };

      const response = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app/api/create-checkout",
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
        
        // Clear referral codes after successful checkout creation
        if (typeof window !== "undefined" && referralCode) {
          localStorage.removeItem('referralCode');
          localStorage.removeItem('rewardfulReferral');
          console.log("Cleared referral codes after checkout");
        }
        
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