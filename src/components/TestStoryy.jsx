import React, { useState } from 'react';

const StoryForm = () => {
  const [title, setTitle] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [templateKey, setTemplateKey] = useState('template1');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');

  const handleGeneratePDF = async () => {
    if (!title || !characterName) {
      setError('Title and character name are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.app/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, characterName, templateKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Convert response to Blob
      const blob = await response.blob();

      // Validate the PDF MIME type
      if (blob.type !== 'application/pdf') {
        throw new Error('Invalid PDF file received');
      }

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl); // Save the URL for displaying/downloading
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Your Story</h1>

      <div className="bg-white shadow-md rounded p-6 w-full max-w-lg">
        {/* Story Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Story Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter story title"
          />
        </div>

        {/* Character Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Character Name
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter character name"
          />
        </div>

        {/* Template Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Choose a Template
          </label>
          <select
            value={templateKey}
            onChange={(e) => setTemplateKey(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="template1">Template 1: Top Text and Bottom Image</option>
            <option value="template2">Template 2: text-top-image-bottom</option>
          </select>
        </div>

        {/* Generate PDF Button */}
        <button
          onClick={handleGeneratePDF}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Story PDF
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* PDF Download/View Link */}
        {pdfUrl && (
          <div className="mt-4">
            <a
              href={pdfUrl}
              download="generated-story.pdf"
              className="text-blue-600 underline"
            >
              Download PDF
            </a>
            <iframe
              src={pdfUrl}
              className="w-full h-96 mt-4 border rounded"
              title="Generated Story"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryForm;
