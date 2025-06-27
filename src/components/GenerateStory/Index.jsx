import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import AvatarPickerForm from "./MainCharacter";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import useGenerateStory from "../../hooks/useGenerateStory.js";
import useGenerateCustomStory from "../../hooks/useGenerateCustomStory.js";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      storyTitle: "",
      numberOfPages: 3,
      pageNumber: 1,
      pagesContent: [{ text: "" }],
      storyType: "AI Written Story",
      animationStyle: "Japanese Anime",
      selectedAvatar: null,
      // Optional additional character fields for AI stories
      companionName: "",
      companionDescription: "",
      antagonistName: "",
      antagonistDescription: "",
    },
  });

  // Use our custom hooks for story generation
  const {
    generateStory,
    isLoading: aiStoryLoading,
    error: aiStoryError,
    storyPages: aiStoryPages,
  } = useGenerateStory();
  
  const {
    generateFromUserScenes,
    isLoading: customStoryLoading,
    error: customStoryError,
    storyData: customStoryData,
  } = useGenerateCustomStory();

  // Manage dynamic pages content with useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pagesContent",
  });

  const [selectedStoryType, setSelectedStoryType] = useState("AI Written Story");
  const [selectedAnimationStyle, setSelectedAnimationStyle] = useState("Japanese Anime");
  const [avatars, setAvatars] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Watch fields for dynamic updates
  const numberOfPages = watch("numberOfPages", 3);
  const selectedPage = watch("pageNumber", 1);

  // Synchronize pagesContent array with numberOfPages
  useEffect(() => {
    if (numberOfPages) {
      const targetLength = parseInt(numberOfPages, 10);
      const currentLength = fields.length;
      if (targetLength > currentLength) {
        for (let i = currentLength; i < targetLength; i++) {
          append({ text: "" });
        }
      } else if (targetLength < currentLength) {
        for (let i = currentLength; i > targetLength; i--) {
          remove(i - 1);
        }
      }
    }
  }, [numberOfPages, fields.length, append, remove]);

  // Create page options for the dropdown based on numberOfPages
  const pageOptions = [];

  if (numberOfPages) {
    for (let i = 1; i <= numberOfPages; i++) {
      pageOptions.push(i);
    }
  }

  // Handle story type change
  const handleStoryTypeChange = (type) => {
    setSelectedStoryType(type);
    setValue("storyType", type);
  };

  // Handle animation style change
  const handleAnimationStyleChange = (style) => {
    setSelectedAnimationStyle(style);
    setValue("animationStyle", style);
  };

  // Fetch avatars from the API
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAvatars = async () => {
      try {
        const response = await axios.get("https://storytymeai-e64xw.ondigitalocean.app/api/avatars", {
          headers: { Authorization: token },
        });
        setAvatars(response.data.avatars);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setFetchError(err);
          console.error("Error fetching avatars:", err);
        }
      }
    };

    fetchAvatars();
  }, []);

  console.log("storyPages:", aiStoryPages);
 
  // Redirect to library when AI story generation is completed
  useEffect(() => {
    if (aiStoryPages) {
      // Redirect to library with the story ID
    const storyId = aiStoryPages?.data?._id;
      if (storyId) {
        window.location.href = `https://merry-chaja-8d1e1b.netlify.app/library/${storyId}`;
      }
    }
  }, [aiStoryPages]);

  // Redirect to library when custom story generation is completed
  useEffect(() => {
    if (customStoryData) {
      // Redirect to library with the story ID
   const storyId = customStoryData?.data?._id;
      if (storyId) {
        window.location.href = `https://merry-chaja-8d1e1b.netlify.app/library/${storyId}`;
      }
    }
  }, [customStoryData]);

  // Form submit handler
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Get the selected avatar ID from the form
    const selectedAvatar = data.selectedAvatar || (avatars.length > 0 ? avatars[0]._id : null);

    if (!selectedAvatar) {
      console.error("No avatar selected");
      setFetchError(new Error("Please select an avatar before generating a story"));
      return;
    }

    try {
      if (selectedStoryType === "AI Written Story") {
        // Prepare optional additional characters for AI story
        const additionalCharacters = {};
        
        if (data.companionName && data.companionDescription) {
          additionalCharacters.companion = {
            name: data.companionName,
            description: data.companionDescription
          };
        }
        
        if (data.antagonistName && data.antagonistDescription) {
          additionalCharacters.antagonist = {
            name: data.antagonistName,
            description: data.antagonistDescription
          };
        }

        // Call the AI story generation endpoint with avatar as main character
        await generateStory({
          storyTitle: data.storyTitle,
          animationStyle: data.animationStyle,
          numberOfPages: parseInt(data.numberOfPages),
          avatarId: selectedAvatar,
          characters: additionalCharacters,
        });

      } else if (selectedStoryType === "Create Your Own Story") {
        // Prepare pages array from the form data
        const pages = data.pagesContent
          .filter((page) => page.text.trim() !== "")
          .map((page, index) => ({
            title: `Page ${index + 1}`,
            text: page.text.trim()
          }));

        if (pages.length === 0) {
          setFetchError(new Error("Please add at least one page with content"));
          return;
        }

        // Call the custom story generation endpoint with avatar as main character
        await generateFromUserScenes({
          storyTitle: data.storyTitle,
          animationStyle: data.animationStyle,
          avatarId: selectedAvatar,
          characters: {}, // No additional characters for custom stories
          pages: pages,
        });
      }

      // Reset form after successful generation
      reset();

    } catch (err) {
      console.error("Error generating story:", err);
      setFetchError(err);
    }
  };

  // Combine loading states and errors from different sources
  const isLoading = aiStoryLoading || customStoryLoading;
  const error = aiStoryError || customStoryError || fetchError;

  return (
    <div data-theme="light" className="p-8 bg-blue-50 min-h-screen">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AvatarPickerForm
          avatars={avatars}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Story Title */}
        <div>
          <label className="text-sm font-bold text-gray-600 mb-2">
            Enter Your Story Title
          </label>
          <input
            type="text"
            placeholder="Enter a title for your story"
            className="input input-bordered w-full"
            {...register("storyTitle", { required: "Story title is required" })}
          />
          {errors.storyTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storyTitle.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Tip: Include character emotions here, happy, sad....
          </p>
        </div>

        {/* Animation Style Selection */}
        <div>
          <h2 className="text-lg font-bold mb-4">Choose Animation Style</h2>
          <select
            className="select select-bordered w-full"
            {...register("animationStyle", {
              required: "Animation style is required",
            })}
            onChange={(e) => handleAnimationStyleChange(e.target.value)}
            value={selectedAnimationStyle}
          >
            <option value="Japanese Anime">Japanese Anime</option>
            <option value="Cinematic">Cinematic</option>
            <option value="Disney Character">Disney Character</option>
            <option value="Photographic">Photographic</option>
            <option value="Comic book">Comic book</option>
            <option value="Line art">Line art</option>
          </select>
          {errors.animationStyle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.animationStyle.message}
            </p>
          )}
        </div>

        {/* Story Type Selection */}
        <div>
          <h2 className="text-lg font-bold mb-4">Choose Story Type</h2>
          <div className="space-y-2">
            {["Create Your Own Story", "AI Written Story"].map((type) => (
              <label
                key={type}
                className={`flex items-center space-x-2 cursor-pointer ${
                  selectedStoryType === type
                    ? "text-deepPurple font-semibold"
                    : "text-gray-700"
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
        {selectedStoryType === "Create Your Own Story" && (
          <div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Enter Your Number of Pages
                </label>
                <input
                  type="number"
                  placeholder="Number of pages"
                  className="input input-bordered w-full"
                  {...register("numberOfPages", {
                    required: "Number of pages is required",
                    min: { value: 1, message: "At least 1 page is required" },
                    max: { value: 10, message: "Maximum 10 pages allowed" },
                  })}
                />
                {errors.numberOfPages && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.numberOfPages.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Select Page Number to Edit
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("pageNumber")}
                >
                  {pageOptions.map((num) => (
                    <option key={num} value={num}>
                      Page {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <CiCirclePlus
                  className="w-8 h-8 text-deepPurple cursor-pointer"
                  onClick={() => {
                    append({ text: "" });
                    setValue("numberOfPages", Number(numberOfPages) + 1);
                  }}
                />
              </div>
            </div>
            {/* Dynamic Page Content Section */}
            <div className="mt-4">
              {fields[selectedPage - 1] && (
                <div key={selectedPage}>
                  <label className="text-sm font-bold text-gray-600 mb-2">
                    Page {selectedPage} Content
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder={`Enter a scene description for Page ${selectedPage}`}
                    {...register(`pagesContent.${selectedPage - 1}.text`, {
                      required: "Scene description is required",
                    })}
                  ></textarea>
                  {errors.pagesContent?.[selectedPage - 1]?.text && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pagesContent[selectedPage - 1].text.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Tip: Write a brief, vivid description of what happens in
                    this scene. Your selected avatar will be the main character.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedStoryType === "AI Written Story" && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-bold text-gray-600">
                  Enter your number of pages
                </label>
                <input
                  type="number"
                  placeholder="Number of pages"
                  className="input input-bordered w-full"
                  {...register("numberOfPages", {
                    required: "Number of pages is required",
                    min: { value: 1, message: "At least 1 page is required" },
                    max: { value: 8, message: "Maximum 8 pages allowed" },
                  })}
                />
                {errors.numberOfPages && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.numberOfPages.message}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Character Definition Section for AI Stories */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-700">Define Additional Characters (Optional)</h3>
              <p className="text-sm text-gray-500">Your selected avatar will be the main character. You can add companion and antagonist characters below.</p>
              
              {/* Companion */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Companion Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Kyo"
                    className="input input-bordered w-full"
                    {...register("companionName")}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Companion Description (Optional)
                  </label>
                  <textarea
                    placeholder="Describe the companion character"
                    className="textarea textarea-bordered w-full"
                    {...register("companionDescription")}
                  ></textarea>
                </div>
              </div>

              {/* Antagonist */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Antagonist Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Shadow King"
                    className="input input-bordered w-full"
                    {...register("antagonistName")}
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">
                    Antagonist Description (Optional)
                  </label>
                  <textarea
                    placeholder="Describe the antagonist character"
                    className="textarea textarea-bordered w-full"
                    {...register("antagonistDescription")}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

      

        {/* Submit Button */}
        <div>
          <button
            disabled={avatars.length === 0 || isLoading}
            type="submit"
            className="btn bg-deepPurple text-white w-full"
          >
            {isLoading ? "Generating Story..." : "Generate Story"}
          </button>
          {avatars.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Please wait for avatars to load before generating a story.
            </p>
            )}
        </div>
      </form>
        {/* Add Toaster component to display toasts */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;