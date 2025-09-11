import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import StoryPreview from "../../components/StoryPreview";
import useFetchStoryById from "../../hooks/useFetchStoryById";
import useDownloadEligibility from "../../hooks/useDownloadEligibility";
import useStoryCheckout from "../../hooks/useStoryCheckout";
import StoryBreadcrumb from "../../components/StoryPreview/StoryBreadcrumb";
import Confetti from "react-confetti";

const StoryDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { story, loading, error } = useFetchStoryById(id, token);

  const [searchParams] = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // STEP 1: Capture referral code from URL on page load
  useEffect(() => {
    // Get referral code from URL parameter (?ref=ABC123)
    const referralCode = searchParams.get('ref');
    
    if (referralCode) {
      // Store in localStorage for later use during checkout
      localStorage.setItem('referralCode', referralCode.toUpperCase());
      console.log('Referral code captured:', referralCode);
      
      // Optional: Clean URL by removing the ref parameter
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('ref');
      window.history.replaceState({}, document.title, newUrl.pathname + newUrl.search);
    }

    // STEP 2: Initialize Rewardful tracking (same as upgrade page)
    if (typeof window !== "undefined" && window.rewardful) {
      window.rewardful("ready", () => {
        const rId = window.Rewardful?.referral;
        console.log("Rewardful referral ID:", rId);
        
        // Store Rewardful referral if available
        if (rId) {
          localStorage.setItem('rewardfulReferral', rId);
        }
      });
    } else {
      console.warn("Rewardful not detected yet.");
    }
  }, [searchParams]);

  // Check for success parameter and show confetti
  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setShowConfetti(true);
      // Clear referral codes after successful purchase
      localStorage.removeItem('referralCode');
      localStorage.removeItem('rewardfulReferral');
      
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Check download eligibility for this story
  const {
    downloadPermitted,
    isCheckingEligibility,
    eligibilityError,
    checkDownloadEligibility
  } = useDownloadEligibility(id, token, true);

  // Checkout functionality (now includes referral support)
  const {
    purchaseStory,
    checkoutInProgress,
    purchaseError,
    purchaseSuccess,
    canDownloadStory,
    resetCheckoutState
  } = useStoryCheckout(token);

  console.log("id", id);
  
  if (error) {
    return (
      <div className="p-6 bg-blue-50 min-h-screen">
       <StoryBreadcrumb
          storyTitle="Error Loading Story"
          storyId={id}
        />
        <div className="max-w-5xl mx-auto bg-red-100 text-red-700 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50">
      {/* Breadcrumb Navigation */}
      <StoryBreadcrumb 
        storyTitle={story?.storyTitle || story?.title || "Loading..."}
        storyId={id}
        showBackButton={true}
        libraryPath="/library"
      />
      
      <StoryPreview 
        story={story} 
        isLoading={loading}
        downloadPermitted={downloadPermitted}
        isCheckingEligibility={isCheckingEligibility}
        eligibilityError={eligibilityError}
        purchaseStory={purchaseStory}
        checkoutInProgress={checkoutInProgress}
        purchaseError={purchaseError}
        purchaseSuccess={purchaseSuccess}
        canDownloadStory={canDownloadStory}
        resetCheckoutState={resetCheckoutState}
        checkDownloadEligibility={checkDownloadEligibility}
      />

      {showConfetti && downloadPermitted && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
    </div>
  );
};

export default StoryDetails;