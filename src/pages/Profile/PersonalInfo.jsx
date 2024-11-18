import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaTrashAlt, FaArrowLeft, FaPen } from 'react-icons/fa';

const PersonalInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isVerified, setIsVerified] = useState(true); // Example state for email verification
  const [profilePicture, setProfilePicture] = useState(null); // Profile picture preview

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <div data-theme="light" className="md:p-8  pt-4 bg-gray-100 min-h-screen">
      {/* Header */}

      {/* Form Container */}
      <div className="bg-white rounded-lg p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="flex justify-center items-center relative">
            <div className="relative">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <FaPen className="text-gray-400 text-xl" />
                </div>
              )}
              <label className="absolute bottom-2 right-2 bg-deepPurple text-white p-2 rounded-full cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                <FaPen />
              </label>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="text-gray-500">Name</label>
            <input
              type="text"
              placeholder="John"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Surname Field */}
          <div>
            <label className="text-gray-500">Surname</label>
            <input
              type="text"
              placeholder="Rogers"
              className="input input-bordered w-full"
              {...register("surname", { required: "Surname is required" })}
            />
            {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
          </div>

          {/* Title Field */}
          <div>
            <label className="text-gray-500">Title</label>
            <input
              type="text"
              placeholder="Enter your title here"
              className="input input-bordered w-full"
              {...register("title")}
            />
          </div>

          {/* Registration Email */}
          <div>
            <label className="text-gray-500">Registration email</label>
            <div className="flex items-center input input-bordered w-full">
              <input
                type="email"
                placeholder="john@gmail.com"
                className="w-full outline-none bg-transparent"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {isVerified && <FaCheckCircle className="text-green-500 ml-2" />}
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-gray-500">Phone number</label>
            <input
              type="tel"
              placeholder="+420 732123456"
              className="input input-bordered w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-between items-center mt-6">
            <button type="submit" className="btn bg-deepPurple text-white">Save Changes</button>
            <button
              type="button"
              className="btn btn-outline btn-error flex items-center space-x-2"
            >
              <FaTrashAlt />
              <span>Delete account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
