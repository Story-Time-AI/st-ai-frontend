import React, { useState } from "react";
import convertComicToPDF from "../utils/convertComicToPDF";

const ComicPDFCreator = () => {
  const [inputData, setInputData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    setError(null);
    setPreviewUrl(null);

    try {
      // Parse the JSON input
      const comicData = JSON.parse(inputData);

      // Convert to PDF
      const doc = await convertComicToPDF(comicData);

      if (doc) {
        // Generate filename
        let filename = "comic-story";
        if (comicData.storyId) {
          filename = `comic-${comicData.storyId}`;
        } else if (comicData.avatarDetails && comicData.avatarDetails.name) {
          filename = `${comicData.avatarDetails.name.toLowerCase()}-adventure`;
        }

        // Create blob URL for preview
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPreviewUrl(pdfUrl);

        // Save the PDF
        doc.save(`${filename}.pdf`);
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Comic to PDF Converter</h1>
      <p className="mb-4">
        Paste your comic JSON data below to convert it into a high-quality,
        kid-friendly PDF storybook.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded mb-4 font-mono text-sm"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Paste your comic JSON data here..."
          />

          <button
            onClick={handleGeneratePDF}
            disabled={isLoading || !inputData.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {isLoading ? "Generating PDF..." : "Generate PDF"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          {previewUrl ? (
            <div className="border border-gray-300 rounded p-2 bg-gray-100 h-96">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="border border-gray-300 rounded flex items-center justify-center h-96 bg-gray-100 text-gray-500">
              Preview will appear here
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Example Format:</h2>
        <pre className="p-4 bg-gray-100 rounded overflow-x-auto text-sm">
          {`{
  "comicUrl": "https://example.com/cover.jpg",
  "panelUrls": [
    "https://example.com/panel1.jpg",
    "https://example.com/panel2.jpg",
    "https://example.com/panel3.jpg"
  ],
  "avatarDetails": {
    "name": "Character",
    "prompt": "Character description..."
  },
  "generatedContent": {
    "scenes": [
      "Scene 1 description",
      "Scene 2 description",
      "Scene 3 description"
    ]
  },
  "storyId": "unique-id"
}`}
        </pre>
      </div>
    </div>
  );
};

export default ComicPDFCreator;
