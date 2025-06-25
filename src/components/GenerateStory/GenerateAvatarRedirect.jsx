import React from 'react';

const GenerateAvatarRedirect = () => {
  const handleRedirect = () => {
    window.location.href = 'http://localhost:5173/character-creator';
  };

  return (
    <div 
      onClick={handleRedirect} 
      className="cursor-pointer text-blue-500 hover:underline"
    >
      Please generate an avatar to use it in your story.
    </div>
  );
};

export default GenerateAvatarRedirect;
