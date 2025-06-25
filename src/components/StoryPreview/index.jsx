import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaCrown, FaDownload, FaLock } from "react-icons/fa";
import Header from "../Header";
import convertComicToPDF from "../../utils/convertComicToPDF";

/**
 * StoryPreview Component - Displays a story with its panels and content
 * @param {Object} props.story - Story data object from the API
 * @param {boolean} props.isLoading - Indicates if data is loading
 * @param {boolean} props.downloadPermitted - Whether user can download the story
 * @param {boolean} props.isCheckingEligibility - Whether eligibility check is in progress
 * @param {string} props.eligibilityError - Error from eligibility check
 * @param {Function} props.purchaseStory - Function to initiate checkout
 * @param {boolean} props.checkoutInProgress - Whether checkout is in progress
 * @param {string} props.purchaseError - Error from checkout process
 * @param {boolean} props.purchaseSuccess - Whether purchase was successful
 * @param {boolean} props.canDownloadStory - Whether story can be downloaded after purchase
 * @param {Function} props.resetCheckoutState - Function to reset checkout state
 * @param {Function} props.checkDownloadEligibility - Function to recheck eligibility
 */
const StoryPreview = ({ 
  story = null, 
  isLoading,
  downloadPermitted = false,
  isCheckingEligibility = false,
  eligibilityError = null,
  purchaseStory,
  checkoutInProgress = false,
  purchaseError = null,
  purchaseSuccess = false,
  canDownloadStory = false,
  resetCheckoutState,
  checkDownloadEligibility
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  // Process story data into pages
  useEffect(() => {
    if (!story) return;

    const pagesArr = [];

    // Handle the new API structure with pages array
    if (story.pages && Array.isArray(story.pages)) {
      story.pages.forEach((page, index) => {
        pagesArr.push({
          image: page.image_url,
          text: page.text || `Page ${index + 1}`,
          isFullComic: false,
        });
      });
    }
    // Legacy format handling (keep for backward compatibility)
    else if (story.comicUrl) {
      pagesArr.push({
        image: story.comicUrl,
        text: `${story.storyTitle || "Story"} - Full Comic`,
        isFullComic: true,
      });
    }
    // Handle panelUrls format
    else if (story.panelUrls && Array.isArray(story.panelUrls)) {
      const scenes = story.generatedContent?.scenes || [];

      story.panelUrls.forEach((url, index) => {
        pagesArr.push({
          image: url,
          text: scenes[index] || `Panel ${index + 1}`,
          isFullComic: false,
        });
      });
    }
    // Handle legacy data array format
    else if (story.data && Array.isArray(story.data) && story.data.length > 0) {
      story.data.forEach((panel, index) => {
        pagesArr.push({
          image: panel.image_url,
          text: panel.text || `Panel ${index + 1}`,
          isFullComic: false,
        });
      });
    }

    setPages(pagesArr);
  }, [story]);

  // Handle successful purchase - recheck eligibility
  useEffect(() => {
    if (purchaseSuccess || canDownloadStory) {
      checkDownloadEligibility?.();
    }
  }, [purchaseSuccess, canDownloadStory, checkDownloadEligibility]);

  // Navigate to the next page
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // If no story data is available yet, render loading or empty state
  if (!story && !isLoading) {
    return null;
  }

  /**
   * Handles the download/purchase flow
   */
  const handleDownloadOrPurchase = async () => {
    // Reset any previous PDF errors
    setPdfError(null);
    
    // If user is eligible to download, generate PDF
    if (downloadPermitted || canDownloadStory) {
      await handleDownloadStory();
    } else {
      // User needs to purchase the story first
      await handlePurchaseStory();
    }
  };

  /**
   * Handles purchasing the story via checkout
   */
  const handlePurchaseStory = async () => {
    if (!purchaseStory || !story) return;

    try {
      resetCheckoutState?.();
      
      const checkoutResponse = await purchaseStory(
        story._id || story.storyId,
        story.storyTitle || story.title,
        story.numberOfPages || story.pages?.length || pages.length
      );

      // If purchase is successful and we get a checkout URL, redirect to Stripe
      if (checkoutResponse && checkoutResponse.url) {
        window.location.href = checkoutResponse.url;
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  /**
   * Handles downloading the story as a PDF
   * Properly shows loading state and error handling
   */
  const handleDownloadStory = async () => {
    try {
      setIsGeneratingPDF(true);
      setPdfError(null);

      // The story data is already in the correct format for the new PDF converter
      // Just pass it directly since it matches the expected structure
      const pdfData = {
        ...story,
        // Ensure all required fields are present for backward compatibility
        comicUrl: story.comicUrl || (pages[0] && pages[0].image),
        panelUrls: story.panelUrls || pages.map((p) => p.image),
        avatarDetails: {
          name: story.avatarId?.avatarName || story.storyTitle || "Character",
          prompt: story.avatarId?.prompt || "",
        },
        generatedContent: {
          scenes: pages.map((p) => p.text),
        },
        storyId: story._id || "story-" + Date.now(),
      };

      // Generate and download the PDF
      const doc = await convertComicToPDF(pdfData);

      if (doc) {
        // Generate a suitable filename
        let filename = "story.pdf";
        if (story.storyTitle) {
          // Clean the title for filename
          const cleanTitle = story.storyTitle
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .substring(0, 50); // Limit length
          filename = `${cleanTitle}.pdf`;
        } else if (story.avatarId?.avatarName) {
          filename = `${story.avatarId.avatarName.toLowerCase()}-adventure.pdf`;
        }

        doc.save(filename);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfError("Could not generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Determine button state and content
  const getDownloadButtonContent = () => {
    if (isCheckingEligibility) {
      return {
        text: "CHECKING ACCESS",
        icon: <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>,
        disabled: true,
        showCrown: false
      };
    }

    if (checkoutInProgress) {
      return {
        text: "PROCESSING PURCHASE",
        icon: <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>,
        disabled: true,
        showCrown: false
      };
    }

    if (isGeneratingPDF) {
      return {
        text: "GENERATING PDF",
        icon: <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>,
        disabled: true,
        showCrown: false
      };
    }

    if (downloadPermitted || canDownloadStory) {
      return {
        text: "GET THE PDF COPY",
        icon: <FaCrown />,
        disabled: false,
        showCrown: true
      };
    }

    return {
      text: "PURCHASE TO DOWNLOAD",
      icon: <FaLock />,
      disabled: false,
      showCrown: false
    };
  };

  const buttonContent = getDownloadButtonContent();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col p-6">
      <Header title={story?.storyTitle || "Story Preview"} />

      {/* Loading state indicator */}
      {isLoading && (
        <div className="my-4 text-center">
          <p className="text-lg font-medium">Loading story...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deepPurple"></div>
          </div>
        </div>
      )}

      {/* Render story carousel only if not loading and we have pages */}
      {!isLoading && pages.length > 0 && (
        <>
          {/* Character info */}
          {story.avatarId && (
            <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center">
                <div className="avatar mr-4">
                  <div className="w-16 rounded-full">
                    <img
                      src={pages[0]?.image || "https://via.placeholder.com/100?text=Character"}
                      alt={story.avatarId.avatarName || "Character"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/100?text=Character";
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {story.avatarId.avatarName || "Character"}
                  </h3>
                  {story.avatarId.prompt && (
                    <p className="text-sm text-gray-600">
                      {story.avatarId.prompt}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs mr-2">
                      {story.animationStyle}
                    </span>
                    <span className="text-sm text-gray-500">
                      {story.numberOfPages} Pages
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Content with Navigation */}
          <div
            className="max-w-5xl w-full bg-white rounded-lg
                       shadow-lg p-6 flex items-center
                       justify-between mt-5 relative"
          >
            {/* Left Arrow */}
            <button
              onClick={prevPage}
              className={`btn btn-sm btn-circle btn-outline text-deepPurple border-deepPurple hover:bg-deepPurple hover:text-white ${
                currentPage === 0 ? "invisible" : ""
              }`}
            >
              <FaArrowLeft />
            </button>

            {/* Story Content */}
            <div className="flex-1 grid grid-cols-1 p-2 md:grid-cols-2 gap-6 items-center">
              {/* Image Section */}
              <div className="flex justify-center">
                <img
                  src={pages[currentPage]?.image}
                  alt={`Story Illustration Page ${currentPage + 1}`}
                  className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                  style={{
                    maxHeight: "400px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Available";
                  }}
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col justify-center">
                <p className="text-lg text-primaryDarkBlue font-medium">
                  {pages[currentPage]?.text}
                </p>

                <p className="text-gray-500 text-sm mt-4">
                  Page {currentPage + 1} of {pages.length}
                </p>

                {/* Story metadata */}
                {story.createdAt && (
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(story.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextPage}
              className={`btn btn-sm btn-circle btn-outline text-deepPurple border-deepPurple hover:bg-deepPurple hover:text-white ${
                currentPage === pages.length - 1 ? "invisible" : ""
              }`}
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Bottom navigation and page indicators */}
          <div className="max-w-5xl w-full mt-4 flex justify-center">
            <div className="flex space-x-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === index ? "bg-deepPurple" : "bg-gray-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Download/Purchase Button */}
          <div className="max-w-5xl flex justify-end items-end w-full">
            <button
              onClick={handleDownloadOrPurchase}
              disabled={buttonContent.disabled}
              className={`mt-6 btn btn-primary gap-2 relative overflow-hidden ${
                downloadPermitted || canDownloadStory 
                  ? 'bg-deepPurple text-white hover:bg-deepPurple/90' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              <span className="inline-block mr-2">{buttonContent.text}</span>
              {buttonContent.icon}
            </button>
          </div>

          {/* Error messages */}
          {(pdfError || purchaseError || eligibilityError) && (
            <div className="max-w-5xl w-full mt-3">
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{pdfError || purchaseError || eligibilityError}</span>
                </div>
              </div>
            </div>
          )}
 
        </>
      )}
    </div>
  );
};

export default StoryPreview;