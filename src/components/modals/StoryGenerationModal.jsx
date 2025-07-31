import React from 'react';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const StoryGenerationModal = ({ 
  isOpen, 
  storyTitle, 
  animationStyle, 
  numberOfPages, 
  storyType,
  onRequestClose 
}) => {
  const getAnimationClass = () => {
    switch (animationStyle) {
      case 'Japanese Anime':
        return 'from-pink-400 to-purple-600';
      case 'Cinematic':
        return 'from-gray-600 to-black';
      case 'Disney Character':
        return 'from-blue-400 to-pink-500';
      case 'Photographic':
        return 'from-green-400 to-blue-500';
      case 'Comic book':
        return 'from-red-400 to-yellow-500';
      case 'Line art':
        return 'from-gray-400 to-gray-700';
      default:
        return 'from-purple-400 to-pink-600';
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: '0',
      outline: 'none',
      padding: '0',
      maxWidth: '28rem',
      width: '100%',
      margin: '1rem',
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Story Generation Progress"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${getAnimationClass()} p-6 text-white text-center`}>
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Creating Your Story</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">"{storyTitle}"</h3>
              <p className="text-gray-600">
                Our AI is crafting your {storyType?.toLowerCase()} with {numberOfPages} pages in {animationStyle} style...
              </p>
            </div>

            {/* Progress Animation */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">Generating story content...</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                <span className="text-sm text-gray-700">Creating beautiful illustrations...</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                <span className="text-sm text-gray-700">Applying {animationStyle} style...</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Feel free to navigate away!</strong> Your story will continue generating in the background. 
                    You'll find it in your library once it's ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={onRequestClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue in Background
              </button>
              <button
                onClick={() => window.location.href = 'https://merry-chaja-8d1e1b.netlify.app/library'}
                className="flex-1 px-4 py-3 bg-deepPurple text-sm text-white rounded-lg hover:bg-purple-900 transition-all font-medium"
              >
                Go to Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoryGenerationModal;