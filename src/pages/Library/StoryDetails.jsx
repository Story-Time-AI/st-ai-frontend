import React from "react";
import { useParams } from "react-router-dom";
import StoryPreview from "../../components/StoryPreview";
import useFetchStoryById from "../../hooks/useFetchStoryById";
import useDownloadEligibility from "../../hooks/useDownloadEligibility";
import useStoryCheckout from "../../hooks/useStoryCheckout";
import StoryBreadcrumb from "../../components/StoryPreview/StoryBreadcrumb";

const StoryDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { story, loading, error } = useFetchStoryById(id, token);
  
  // Check download eligibility for this story
  const {
    downloadPermitted,
    isCheckingEligibility,
    eligibilityError,
    checkDownloadEligibility
  } = useDownloadEligibility(id, token, true);

  // Checkout functionality
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
        libraryPath="/library" // Adjust this to your actual library route
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
    </div>
  );
};

export default StoryDetails;