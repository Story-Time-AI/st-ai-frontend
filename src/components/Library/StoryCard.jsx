import React, { useEffect, useCallback } from 'react';
import { FaEye } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';

  function StoryCard({ image, title, characterName, type }) {
    return (
      <div className="card w-full md:w-80 bg-white shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </div>
  
        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-primaryDarkBlue truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{characterName}</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
  
        {/* Button Section */}
        <div className="p-4 pt-0 flex justify-center">
          <button className="btn btn-primary w-full flex items-center justify-center gap-2">
            <FaEye />
            View Story
          </button>
        </div>
      </div>
    );
  }

  function StoryCarousel({ stories }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: false,
      align: "start", // Align slides properly for mobile
    });
  
    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
  
    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);
  
    useEffect(() => {
      if (emblaApi) {
        emblaApi.reInit();
      }
    }, [emblaApi]);
  
    return (
      <div className="w-[80vw] overflow-x-hidden">
        <div className=" " ref={emblaRef}>
          <div className="flex space-x-4 ">
            {stories.map((story) => (
              <div className=" flex-shrink-0 md:w-[20vw] w-[80vw]
              " key={story.id}>
                <StoryCard
                  image={story.image}
                  title={story.title}
                  characterName={story.characterName}
                  type={story.type}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex max-w-screen justify-between mt-4">
          <button
            onClick={scrollPrev}
            className="btn btn-circle btn-primary mx-2"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            className="btn btn-circle btn-primary mx-2"
            aria-label="Next Slide"
          >
            →
          </button>
        </div>
      </div>
    );
  }
  

  export default function Example() {
    const stories = [
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          title: "Max's Adventure Through the Seasons",
          characterName: 'Max',
          type: 'Adventure',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          title: 'The Magical Forest',
          characterName: 'Alice',
          type: 'Fantasy',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/150',
          title: 'Space Odyssey',
          characterName: 'Bob',
          type: 'Sci-Fi',
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/150',
          title: "Max's Adventure Through the Seasons",
          characterName: 'Max',
          type: 'Adventure',
        },
        {
          id: 5,
          image: 'https://via.placeholder.com/150',
          title: 'The Magical Forest',
          characterName: 'Alice',
          type: 'Fantasy',
        },
        {
          id: 6,
          image: 'https://via.placeholder.com/150',
          title: 'Space Odyssey',
          characterName: 'Bob',
          type: 'Sci-Fi',
        },
      ];
    
      return (
        <div className="p-8  bg-gray-50 max-w-screen min-h-screen">
          <h1 className="text-3xl font-bold text-primaryDarkBlue mb-6">My Stories</h1>
          <StoryCarousel stories={stories} />
        </div>
      );
    }