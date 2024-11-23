import React from "react";
import { useForm } from "react-hook-form";

const AddTemplateForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Template added successfully!");
    reset(); // Reset the form fields after submission
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Template</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
          {/* Template Name */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block">
              Template Name
            </label>
            <input
              type="text"
              placeholder="Enter template name"
              className="input input-bordered w-full"
              {...register("templateName", { required: "Template name is required" })}
            />
            {errors.templateName && (
              <p className="text-red-500 text-sm mt-1">{errors.templateName.message}</p>
            )}
          </div>

          {/* Story Type */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block">Story Type</label>
            <input
              type="text"
              placeholder="Enter story type"
              className="input input-bordered w-full"
              {...register("storyType", { required: "Story type is required" })}
            />
            {errors.storyType && (
              <p className="text-red-500 text-sm mt-1">{errors.storyType.message}</p>
            )}
          </div>

          {/* Story Idea */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block">Story Idea</label>
            <input
              type="text"
              placeholder="Enter story idea"
              className="input input-bordered w-full"
              {...register("storyIdea", { required: "Story idea is required" })}
            />
            {errors.storyIdea && (
              <p className="text-red-500 text-sm mt-1">{errors.storyIdea.message}</p>
            )}
          </div>

          {/* Character Name */}
          <div>
            <label className="text-sm font-bold text-gray-600 mb-2 block">
              Character Name
            </label>
            <input
              type="text"
              placeholder="Enter character name"
              className="input input-bordered w-full"
              {...register("characterName", { required: "Character name is required" })}
            />
            {errors.characterName && (
              <p className="text-red-500 text-sm mt-1">{errors.characterName.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button type="submit" className="btn bg-deepPurple text-white w-full">
              Add Template
            </button>
          </div>
        </form>

        {/* Saved Templates Section */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Saved Templates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((template) => (
              <div
                key={template}
                className="border rounded-lg p-4 shadow hover:shadow-md cursor-pointer"
              >
                <p className="text-center text-sm font-bold">Story Template {template}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplateForm;
