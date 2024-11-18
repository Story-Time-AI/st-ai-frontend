import React from 'react';
import StoryCard from './StoryCard';
import Header from '../../components/Header'

const Index = () => {
  const myStories = [
    {
      title: 'Max’s Adventure Through the Seasons',
      characterName: 'Max',
      storyType: 'Adventure',
      imageSrc: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
      buttonText: 'View Story',
    },
    {
      title: 'Max’s Journey in Autumn',
      characterName: 'Max',
      storyType: 'Fantasy',
      imageSrc: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
      buttonText: 'Start Reading',
    },
    {
      title: 'A Magical Day in the Woods',
      characterName: 'Lily',
      storyType: 'Fairy Tale',
      imageSrc: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
      buttonText: 'View Story',
    },
  ];

  return (
    <div >
      {/* Header */}
      <Header title="Stories Library" />
    
      
    </div>
  );
};

export default Index;
