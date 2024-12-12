import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Index = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [selectedStoryType, setSelectedStoryType] = useState('Premade Story Template');

  // Sample data for characters
  const characters = [
    { id: 1, name: 'Alice', avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Bob', avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Charlie', avatar: 'https://via.placeholder.com/150' },
  ];

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Story created successfully!');
  };

  const handleStoryTypeChange = (type) => {
    setSelectedStoryType(type);
    setValue('storyType', type); // Update the story type in the form
  };

  return (
    <div data-theme="light" className="p-8 bg-blue-50 min-h-screen">

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Character Selection */}
        <div>
  <h2 className="text-md text-gray-600 font-bold mb-2">Choose Your Main Character</h2>
  <select
    className="select select-bordered w-full"
    {...register('mainCharacter', { required: 'Please select a main character' })}
  >
    <option value="" disabled>Select a Character</option>
    {characters.map((character) => (
      <option
        key={character.id}
        value={character.id}
        className="flex justify-between items-center space-x-4"
      >
        <span>{character.name}</span>
      
      </option>
    ))}
  </select>
  {errors.mainCharacter && <p className="text-red-500 text-sm mt-1">{errors.mainCharacter.message}</p>}
</div>


        {/* Story Title */}
        <div>
          <label className="text-sm font-bold text-gray-600 mb-2">Enter Your Story Title</label>
          <input
            type="text"
            placeholder="My story name"
            className="input input-bordered w-full"
            {...register('storyTitle', { required: 'Story title is required' })}
          />
          {errors.storyTitle && <p className="text-red-500 text-sm mt-1">{errors.storyTitle.message}</p>}
        </div>

        {/* Character Name */}
        <div>
          <label className="text-sm font-bold text-gray-600 mb-2">Enter Your Character's Name</label>
          <input
            type="text"
            placeholder="Your character name"
            className="input input-bordered w-full"
            {...register('characterName', { required: 'Character name is required' })}
          />
          {errors.characterName && <p className="text-red-500 text-sm mt-1">{errors.characterName.message}</p>}
        </div>

        {/* Story Type Selection */}
        <div>
          <h2 className="text-lg font-bold mb-4">Choose Story Type</h2>
          <div className="space-y-2">
            {['Create Your Own Story', 'AI Written Story', 'Premade Story Template'].map((type) => (
              <label
                key={type}
                className={`flex items-center space-x-2 cursor-pointer ${
                  selectedStoryType === type ? 'text-deepPurple font-semibold' : 'text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="storyType"
                  className="radio radio-deepPurple"
                  value={type}
                  checked={selectedStoryType === type}
                  onChange={() => handleStoryTypeChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conditional Rendering Based on Story Type */}
        {selectedStoryType === 'Create Your Own Story' && (
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2">Enter Your Story Idea</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your story idea and scenario here"
              {...register('storyIdea', { required: 'Story idea is required' })}
            ></textarea>
            {errors.storyIdea && <p className="text-red-500 text-sm mt-1">{errors.storyIdea.message}</p>}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-bold text-gray-600">Enter Your Number of Pages</label>
                <input
                  type="number"
                  placeholder="Number of pages"
                  className="input input-bordered w-full"
                  {...register('numberOfPages', { required: 'Number of pages is required' })}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-600">Select Page Number to Edit</label>
                <select className="select select-bordered w-full" {...register('pageNumber')}>
                  <option value="1">Page 1</option>
                  <option value="2">Page 2</option>
                  <option value="3">Page 3</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedStoryType === 'AI Written Story' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-600">Enter your number of pages</label>
              <input
                type="number"
                placeholder="Number of pages"
                className="input input-bordered w-full"
                {...register('numberOfPages', { required: 'Number of pages is required' })}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Number of Sentences Per Page</label>
              <input
                type="number"
                placeholder="Number of sentences per page"
                className="input input-bordered w-full"
                {...register('sentencesPerPage', { required: 'Number of sentences per page is required' })}
              />
            </div>
          </div>
        )}

        {selectedStoryType === 'Premade Story Template' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Choose Story Template</h2>
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((template) => (
                <div
                  key={template}
                  className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-deepPurple"
                >
                  <p className="text-center text-sm font-bold">Story Template {template}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn bg-deepPurple text-white w-full">
            Generate Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
