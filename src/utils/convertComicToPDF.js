import { jsPDF } from "jspdf";

/**
 * Pre-loads an image to ensure it's fully loaded before adding to PDF
 * This helps improve image quality and prevents rendering issues
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>} - Promise resolving to loaded image
 */
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.crossOrigin = "Anonymous";
    img.src = url;
  });
};

/**
 * Enhanced PDF conversion with optimized image handling and perfect layout
 * Addresses all feedback requirements for minimal empty space and proper positioning
 * @param {Object} storyData - Story data from the new API format
 * @returns {jsPDF} - The generated PDF document
 */
async function convertComicToPDF(storyData) {
  // Create a new PDF document (portrait, mm units, A4 size)
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 8; // Minimal margin for maximum space utilization
  const contentWidth = pageWidth - margin * 2;

  // Extract data from the new format
  const storyTitle = storyData.storyTitle || "Untitled Story";
  const characterName = storyData.avatarId?.avatarName || storyData.avatarDetails?.name || "Character";
  const pages = storyData.pages || [];

  console.log("Generating PDF for:", storyTitle);
  console.log("Character:", characterName);
  console.log("Pages:", pages.length);

  // COVER PAGE - Ultra-compact design with maximum space utilization
  try {
    // Use first page image as cover if no specific cover exists
    const coverImageUrl = storyData.comicUrl || (pages[0]?.image_url);
    
    if (coverImageUrl) {
      const coverImg = await preloadImage(coverImageUrl);

      // Clean white background - no blue border
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // COMPACT TITLE SECTION - positioned at very top with minimal spacing
      const titleStartY = 12; // Minimal top margin
      
      // Main title - compact and prominent
      doc.setFontSize(24); // Slightly smaller for better fit
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      
      const titleLines = doc.splitTextToSize(storyTitle, contentWidth - 10);
      const titleHeight = titleLines.length * 8; // Line height for title
      doc.text(titleLines, pageWidth / 2, titleStartY, { align: "center" });

      // Character name immediately below title - no gap
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(`Featuring ${characterName}`, pageWidth / 2, titleStartY + titleHeight + 3, { align: "center" });

      // MAXIMUM IMAGE COVERAGE - starts right after title section
      const imageStartY = titleStartY + titleHeight + 8; // Minimal gap after title
      
      // Reserve minimal space for bottom credits (15mm total)
      const bottomReserved = 15;
      const availableImageHeight = pageHeight - imageStartY - bottomReserved;
      
      const imgRatio = coverImg.width / coverImg.height;
      
      // Force maximum image size to eliminate white space
      let imageHeight = availableImageHeight;
      let imageWidth = imageHeight * imgRatio;

      // If too wide, use full content width and adjust height accordingly
      if (imageWidth > contentWidth) {
        imageWidth = contentWidth;
        imageHeight = imageWidth / imgRatio;
      }
      
      // If there's still available space, stretch the image to fill it
      const maxPossibleHeight = availableImageHeight;
      if (imageHeight < maxPossibleHeight * 0.95) {
        imageHeight = maxPossibleHeight;
        imageWidth = imageHeight * imgRatio;
        // Final adjustment if width exceeds bounds
        if (imageWidth > contentWidth) {
          imageWidth = contentWidth;
          imageHeight = imageWidth / imgRatio;
        }
      }

      // Center the image horizontally
      const imageX = (pageWidth - imageWidth) / 2;

      // No shadow for cleaner look and more space
      doc.setGState(new doc.GState({ opacity: 1.0 }));
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.roundedRect(imageX, imageStartY, imageWidth, imageHeight, 4, 4, "S");
      
      // Add the image with high quality
      doc.addImage(
        coverImg,
        "JPEG",
        imageX,
        imageStartY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      // ULTRA-COMPACT BOTTOM SECTION - positioned at absolute bottom
      const bottomSectionY = pageHeight - 8;
      
      // Combine story info and credits in one line for space efficiency
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 120);
      doc.text(`${pages.length} Page Adventure Story • Created with StoryTymeAI`, pageWidth / 2, bottomSectionY, { align: "center" });
    }

    doc.addPage();
  } catch (error) {
    console.error("Error creating cover page:", error);
  }

  // CONTENT PAGES - Perfect layout with vertical images
  for (let i = 0; i < pages.length; i++) {
    try {
      const page = pages[i];
      const pageImg = await preloadImage(page.image_url);
      const pageText = page.text;

      // Clean white background - no headers or borders
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Calculate image dimensions for MAXIMUM coverage
      // Reserve adequate space for readable text at bottom (40mm for text area)
      const textAreaHeight = 40; // Slightly reduced for more image space
      const availableImageHeight = pageHeight - textAreaHeight - 5; // Minimal top margin
      
      const imgRatio = pageImg.width / pageImg.height;
      
      // Use FULL available height - fill the page completely
      let imageHeight = availableImageHeight;
      let imageWidth = imageHeight * imgRatio;

      // If image becomes too wide, use full width instead
      const maxImageWidth = contentWidth;
      if (imageWidth > maxImageWidth) {
        imageWidth = maxImageWidth;
        imageHeight = imageWidth / imgRatio;
        // If height becomes too small, prioritize height again
        if (imageHeight < availableImageHeight * 0.85) {
          imageHeight = availableImageHeight * 0.98;
          imageWidth = imageHeight * imgRatio;
        }
      }

      // Position image at absolute top with minimal margin
      const imageX = (pageWidth - imageWidth) / 2;
      const imageY = 3; // Almost no top margin

      // Minimal shadow for depth
      doc.setFillColor(0, 0, 0);
      doc.setGState(new doc.GState({ opacity: 0.06 }));
      doc.roundedRect(imageX + 1, imageY + 1, imageWidth, imageHeight, 5, 5, "F");

      // Clean image border
      doc.setGState(new doc.GState({ opacity: 1.0 }));
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.4);
      doc.roundedRect(imageX, imageY, imageWidth, imageHeight, 5, 5, "S");

      // Add the image with optimal quality
      doc.addImage(
        pageImg,
        "JPEG",
        imageX,
        imageY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      // ENHANCED TEXT AREA - positioned at bottom with improved design
      const textStartY = pageHeight - textAreaHeight + 2;
      const textContainerHeight = textAreaHeight - 6;

      // Modern text background with better visual hierarchy
      doc.setFillColor(251, 252, 254);
      doc.setDrawColor(210, 220, 235);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, textStartY, contentWidth, textContainerHeight, 8, 8, "FD");

      // Inner content area with optimal spacing
      const textPadding = 12;
      const textContentWidth = contentWidth - (textPadding * 2);

      // Improved text formatting for better readability
      doc.setFontSize(12); // Slightly smaller for better balance
      doc.setFont("helvetica", "normal");
      doc.setTextColor(45, 55, 65); // Refined dark color

      // Split text with improved word wrapping
      const textLines = doc.splitTextToSize(pageText, textContentWidth);
      const lineHeight = 4.8; // Tighter line spacing
      
      // Calculate text positioning for perfect centering
      const totalTextHeight = textLines.length * lineHeight;
      const textCenterY = textStartY + (textContainerHeight - totalTextHeight) / 2 + 3;

      // Render text with improved formatting
      textLines.forEach((line, index) => {
        const lineY = textCenterY + (index * lineHeight);
        doc.text(line, pageWidth / 2, lineY, { 
          align: "center",
          maxWidth: textContentWidth
        });
      });

      // Subtle page indicator integrated into text area
      const pageNum = i + 1;
      const totalPages = pages.length;
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(140, 140, 140);
      
      const pageIndicatorText = `${pageNum} of ${totalPages}`;
      doc.text(pageIndicatorText, pageWidth - margin - 5, textStartY + textContainerHeight - 3, { align: "right" });

      // Add new page if not the last
      if (i < pages.length - 1) {
        doc.addPage();
      }

    } catch (error) {
      console.error(`Error creating page ${i + 1}:`, error);
    }
  }

  // FINAL PAGE - "The End" with elegant design
  doc.addPage();

  // Clean gradient background
  doc.setFillColor(250, 252, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Subtle border frame with reduced margins
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.8);
  doc.rect(margin * 1.5, margin * 1.5, pageWidth - margin * 3, pageHeight - margin * 3, "S");

  // "The End" title - elegant and centered
  doc.setFontSize(38);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("The End", pageWidth / 2, pageHeight / 2 - 25, { align: "center" });

  // Story summary with proper formatting
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  
  const summaryText = `${characterName}'s amazing adventure comes to a close. ` +
                     `This ${pages.length}-page story brings imagination to life through ` +
                     `the power of storytelling.`;
  
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 40);
  let summaryY = pageHeight / 2 + 5;
  
  summaryLines.forEach((line, index) => {
    doc.text(line, pageWidth / 2, summaryY + (index * 5.5), { align: "center" });
  });

  // Credits at bottom with reduced spacing
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(130, 130, 130);
  doc.text("Created with StoryTymeAI", pageWidth / 2, pageHeight - margin - 15, { align: "center" });
  
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString(), pageWidth / 2, pageHeight - margin - 5, { align: "center" });

  // Set comprehensive PDF metadata
  doc.setProperties({
    title: storyTitle,
    author: "StoryTymeAI",
    subject: `${characterName}'s Adventure Story`,
    keywords: `children story, ${characterName}, adventure, imagination`,
    creator: "StoryTymeAI PDF Generator",
    producer: "jsPDF"
  });

  console.log("PDF generation completed successfully");
  return doc;
}

export default convertComicToPDF;