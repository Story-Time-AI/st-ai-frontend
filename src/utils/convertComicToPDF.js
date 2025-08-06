import { jsPDF } from "jspdf";

/**
 * Pre-loads an image to ensure it's fully loaded before adding to PDF
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
 * Enhanced PDF conversion with LANDSCAPE orientation for better image display
 * Optimized for comic panels and story illustrations
 * @param {Object} storyData - Story data from the API
 * @returns {jsPDF} - The generated PDF document
 */
async function convertComicToPDF(storyData) {
  // Create a new PDF document in LANDSCAPE orientation
  const doc = new jsPDF("l", "mm", "a4"); // 'l' for landscape
  const pageWidth = 297; // A4 landscape width
  const pageHeight = 210; // A4 landscape height
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;

  // Extract data from the format
  const storyTitle = storyData.storyTitle || "Untitled Story";
  const characterName = storyData.avatarId?.avatarName || storyData.avatarDetails?.name || "Character";
  const pages = storyData.pages || [];

  console.log("Generating LANDSCAPE PDF for:", storyTitle);
  console.log("Character:", characterName);
  console.log("Pages:", pages.length);

  // COVER PAGE - Landscape optimized design
  try {
    const coverImageUrl = storyData.comicUrl || (pages[0]?.image_url);
    
    if (coverImageUrl) {
      const coverImg = await preloadImage(coverImageUrl);

      // Clean white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Title section - positioned at top left for landscape layout
      const titleStartX = margin;
      const titleStartY = 20;
      const titleWidth = contentWidth * 0.35; // Use left third for title
      
      // Main title
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      
      const titleLines = doc.splitTextToSize(storyTitle, titleWidth);
      doc.text(titleLines, titleStartX, titleStartY);

      // Character name
      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const characterY = titleStartY + (titleLines.length * 8) + 5;
      doc.text(`Featuring ${characterName}`, titleStartX, characterY);

      // Story info
      doc.setFontSize(12);
      doc.setTextColor(120, 120, 120);
      const infoY = characterY + 8;
      doc.text(`${pages.length} Page Adventure Story`, titleStartX, infoY);

      // MAXIMUM IMAGE COVERAGE - use right side of landscape page
      const imageStartX = titleWidth + margin * 2;
      const imageStartY = 15;
      const availableImageWidth = pageWidth - imageStartX - margin;
      const availableImageHeight = pageHeight - imageStartY - 20;
      
      const imgRatio = coverImg.width / coverImg.height;
      
      // Optimize for landscape - prioritize width usage
      let imageWidth = availableImageWidth;
      let imageHeight = imageWidth / imgRatio;

      // If too tall, adjust to fit height
      if (imageHeight > availableImageHeight) {
        imageHeight = availableImageHeight;
        imageWidth = imageHeight * imgRatio;
      }

      // Center image in available space
      const finalImageX = imageStartX + (availableImageWidth - imageWidth) / 2;
      const finalImageY = imageStartY + (availableImageHeight - imageHeight) / 2;

      // Add image with border
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.roundedRect(finalImageX, finalImageY, imageWidth, imageHeight, 4, 4, "S");
      
      doc.addImage(
        coverImg,
        "JPEG",
        finalImageX,
        finalImageY,
        imageWidth,
        imageHeight,
        undefined,
        "FAST"
      );

      // Bottom credits
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(120, 120, 120);
      doc.text("Created with StoryTymeAI", pageWidth / 2, pageHeight - 8, { align: "center" });
    }

    doc.addPage();
  } catch (error) {
    console.error("Error creating cover page:", error);
  }

  // CONTENT PAGES - Landscape layout with side-by-side or full-width images
  for (let i = 0; i < pages.length; i++) {
    try {
      const page = pages[i];
      const pageImg = await preloadImage(page.image_url);
      const pageText = page.text;

      // Clean background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      const imgRatio = pageImg.width / pageImg.height;
      
      // Decide layout based on image aspect ratio
      const isWideImage = imgRatio > 1.5;
      
      if (isWideImage) {
        // FULL-WIDTH LAYOUT for wide images (like comic panels)
        const imageWidth = contentWidth;
        const imageHeight = imageWidth / imgRatio;
        const maxImageHeight = pageHeight * 0.65; // Use 65% of page height
        
        const finalImageHeight = Math.min(imageHeight, maxImageHeight);
        const finalImageWidth = finalImageHeight * imgRatio;
        
        // Center image horizontally
        const imageX = (pageWidth - finalImageWidth) / 2;
        const imageY = 15;

        // Add image
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.4);
        doc.roundedRect(imageX, imageY, finalImageWidth, finalImageHeight, 5, 5, "S");
        
        doc.addImage(
          pageImg,
          "JPEG",
          imageX,
          imageY,
          finalImageWidth,
          finalImageHeight,
          undefined,
          "FAST"
        );

        // Text below image
        const textStartY = imageY + finalImageHeight + 10;
        const textHeight = pageHeight - textStartY - 15;
        
        // Text background
        doc.setFillColor(251, 252, 254);
        doc.setDrawColor(210, 220, 235);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, textStartY, contentWidth, textHeight, 8, 8, "FD");

        // Text content
        doc.setFontSize(13);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(45, 55, 65);
        
        const textLines = doc.splitTextToSize(pageText, contentWidth - 24);
        const lineHeight = 5.5;
        const textCenterY = textStartY + (textHeight - (textLines.length * lineHeight)) / 2 + 5;
        
        textLines.forEach((line, index) => {
          doc.text(line, pageWidth / 2, textCenterY + (index * lineHeight), { align: "center" });
        });

      } else {
        // SIDE-BY-SIDE LAYOUT for portrait/square images
        const imageAreaWidth = contentWidth * 0.6;
        const textAreaWidth = contentWidth * 0.35;
        
        // Image on left
        const availableImageHeight = pageHeight - 30;
        let imageWidth = imageAreaWidth;
        let imageHeight = imageWidth / imgRatio;
        
        if (imageHeight > availableImageHeight) {
          imageHeight = availableImageHeight;
          imageWidth = imageHeight * imgRatio;
        }
        
        const imageX = margin + (imageAreaWidth - imageWidth) / 2;
        const imageY = (pageHeight - imageHeight) / 2;

        // Add image
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.4);
        doc.roundedRect(imageX, imageY, imageWidth, imageHeight, 5, 5, "S");
        
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

        // Text on right
        const textStartX = margin + imageAreaWidth + 15;
        const textStartY = 25;
        const textHeight = pageHeight - 50;
        
        // Text background
        doc.setFillColor(251, 252, 254);
        doc.setDrawColor(210, 220, 235);
        doc.setLineWidth(0.5);
        doc.roundedRect(textStartX, textStartY, textAreaWidth, textHeight, 8, 8, "FD");

        // Text content
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(45, 55, 65);
        
        const textLines = doc.splitTextToSize(pageText, textAreaWidth - 20);
        const lineHeight = 5.2;
        const textCenterY = textStartY + (textHeight - (textLines.length * lineHeight)) / 2 + 5;
        
        textLines.forEach((line, index) => {
          const lineY = textCenterY + (index * lineHeight);
          doc.text(line, textStartX + 10, lineY);
        });
      }

      // Page number in corner
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(140, 140, 140);
      doc.text(`${i + 1} of ${pages.length}`, pageWidth - margin - 5, pageHeight - 5, { align: "right" });

      // Add new page if not the last
      if (i < pages.length - 1) {
        doc.addPage();
      }

    } catch (error) {
      console.error(`Error creating page ${i + 1}:`, error);
    }
  }

  // FINAL PAGE - "The End" optimized for landscape
  doc.addPage();

  doc.setFillColor(250, 252, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Border frame
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.8);
  doc.rect(margin * 2, margin * 2, pageWidth - margin * 4, pageHeight - margin * 4, "S");

  // "The End" title
  doc.setFontSize(42);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("The End", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });

  // Summary text
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  
  const summaryText = `${characterName}'s amazing adventure comes to a close. ` +
                     `This ${pages.length}-page story brings imagination to life!`;
  
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 60);
  let summaryY = pageHeight / 2 + 10;
  
  summaryLines.forEach((line, index) => {
    doc.text(line, pageWidth / 2, summaryY + (index * 6), { align: "center" });
  });

  // Credits
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(130, 130, 130);
  doc.text("Created with StoryTymeAI", pageWidth / 2, pageHeight - 20, { align: "center" });

  // Set PDF metadata
  doc.setProperties({
    title: storyTitle,
    author: "StoryTymeAI",
    subject: `${characterName}'s Adventure Story`,
    keywords: `children story, ${characterName}, adventure, landscape`,
    creator: "StoryTymeAI PDF Generator",
    producer: "jsPDF"
  });

  console.log("Landscape PDF generation completed successfully");
  return doc;
}

export default convertComicToPDF;