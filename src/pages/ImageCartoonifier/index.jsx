import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { FaCloudUploadAlt, FaSyncAlt } from 'react-icons/fa';
import Header from '../../components/Header'


const Index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    console.log('Uploaded Image:', uploadedImage);
    // You can handle the form data and uploaded image here
  };

  return (
    <div>
      {/* <h1 className="text-3xl font-bold text-primaryDarkBlue mb-6">Image Cartoonifier</h1> */}
<Header title="Character Creator" />

      <div data-theme="light" className="flex flex-col items-center justify-center md:mt-4 mt-5 p-8 bg-white rounded-lg max-w-xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-primaryDarkBlue mb-6">Create something amazing</h1>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${
            isDragActive ? 'border-deepPurple' : 'border-gray-300'
          } bg-white cursor-pointer mb-6 relative`}
        >
          <input {...getInputProps()} />
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded preview" className="object-cover w-full h-full rounded-lg" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-5xl text-deepPurple mb-3" />
              <p className="text-gray-500">
                Drag & drop files or{' '}
                <span className="text-deepPurple underline cursor-pointer">Browse</span>
              </p>
              <p className="text-gray-400 text-sm">Supported formats: JPEG, PNG</p>
            </>
          )}
        </div>

        {/* Form using react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Prompt Input */}
          <label className="w-full text-gray-500 my-2">Your prompt</label>
          <input
            type="text"
            placeholder="Include X, Y in the image"
            {...register("prompt", { required: "Prompt is required" })}
            className="input input-bordered w-full mb-4"
          />
          {errors.prompt && <p className="text-red-500 text-sm">{errors.prompt.message}</p>}

          {/* Style Dropdown */}
          <div className="w-full mb-6">
            <label className="w-full text-gray-500 my-2">Anime Style</label>
            <select
              {...register("style", { required: "Style is required" })}
              className="select select-bordered w-full text-gray-700"
            >
              <option value="Anime Style">Anime Style</option>
              <option value="Cartoon Style">Cartoon Style</option>
              <option value="Realistic Style">Realistic Style</option>
              <option value="Comic Style">Comic Style</option>
            </select>
            {errors.style && <p className="text-red-500 text-sm">{errors.style.message}</p>}
          </div>

          {/* Generate Button and Reset Icon */}
          <div className="flex w-10/12 items-center space-x-4">
            <button type="submit" className="btn bg-deepPurple text-white w-full">Generate Character</button>
            <button type="button" onClick={() => setUploadedImage(null)} className="btn btn-circle btn-outline text-deepPurple border-deepPurple">
              <FaSyncAlt />
            </button>
          </div>
        </form>
      </div>  
    </div>
  );
};

export default Index;
