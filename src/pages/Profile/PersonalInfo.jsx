import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaTrashAlt, FaPen, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const PersonalInfo = () => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [isVerified, setIsVerified] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  
  // Use refs to prevent duplicate operations
  const hasLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const isUpdatingRef = useRef(false);
  const isUploadingRef = useRef(false);
  const isDeletingRef = useRef(false);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // API base URL - adjust according to your backend
  const API_BASE_URL = 'https://storytymeai-e64xw.ondigitalocean.app/api/v1/auth'

  // Fetch user data on component mount
  useEffect(() => {
    if (!hasLoadedRef.current && !isLoadingRef.current) {
      hasLoadedRef.current = true;
      fetchUserData();
    }
  }, []);

  /**
   * Convert file to base64
   */
  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }, []);

  /**
   * Fetch user profile data
   */
  const fetchUserData = useCallback(async () => {
    // Prevent duplicate calls
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    
    let loadingToast = null;
    
    try {
      setLoading(true);
      loadingToast = toast.loading('Loading profile...', { id: 'loading-profile' });

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data && response.data.user) {
        const user = response.data.user;
        setUserData(user);
        setProfilePicture(user.image_url);

        // Set form values
        setValue('firstName', user.username || '');
        setValue('lastName', user.lastName || '');
        setValue('email', user.email || '');
        setValue('phone', user.phone_number || '');

        // Dismiss loading toast and show success
        toast.dismiss('loading-profile');
        toast.success('Profile loaded successfully!', {
          id: 'profile-loaded',
          duration: 2000,
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      
      // Dismiss loading toast and show error
      toast.dismiss('loading-profile');
      toast.error(err.response?.data?.error || 'Failed to load user data', {
        id: 'profile-load-error',
        duration: 4000,
      });
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [token, setValue]);

  /**
   * Update user profile data
   */
  const onSubmit = useCallback(async (data) => {
    // Prevent duplicate submissions
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    let updateToast = null;
    
    try {
      setUpdating(true);
      updateToast = toast.loading('Updating profile...', { id: 'updating-profile' });

      const updateData = {
        username: data.firstName,
        phone_number: data.phone,
        lastName: data.lastName,
      };

      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.data && response.data.user) {
        setUserData(response.data.user);
        
        // Dismiss loading toast and show success
        toast.dismiss('updating-profile');
        toast.success('Profile updated successfully! 🎉', {
          id: 'profile-updated',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      
      // Dismiss loading toast and show error
      toast.dismiss('updating-profile');
      toast.error(err.response?.data?.error || 'Failed to update profile', {
        id: 'profile-update-error',
        duration: 4000,
      });
    } finally {
      setUpdating(false);
      isUpdatingRef.current = false;
    }
  }, [token]);

  /**
   * Handle image upload - Convert to base64 and send
   */
  const handleImageUpload = useCallback(async (e) => {
    // Prevent duplicate uploads
    if (isUploadingRef.current) return;
    
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file', {
        icon: '🖼️',
        id: 'invalid-file-type',
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB', {
        icon: '📏',
        id: 'file-too-large',
      });
      return;
    }

    isUploadingRef.current = true;
    let uploadToast = null;
    
    try {
      setUploadingImage(true);
      uploadToast = toast.loading('Uploading image...', { id: 'uploading-image' });

      // Convert file to base64
      const base64Image = await convertToBase64(file);

      // Send base64 image to backend
      const response = await axios.post(
        `${API_BASE_URL}/profile/upload-image`,
        {
          image_base64: base64Image,
          filename: file.name,
          mimetype: file.type
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.data && response.data.image_url) {
        setProfilePicture(response.data.image_url);
        setUserData(response.data.user);
        
        // Dismiss loading toast and show success
        toast.dismiss('uploading-image');
        toast.success('Profile image uploaded successfully! 📸', {
          id: 'image-uploaded',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      
      // Dismiss loading toast and show error
      toast.dismiss('uploading-image');
      toast.error(err.response?.data?.error || 'Failed to upload image', {
        id: 'image-upload-error',
        duration: 4000,
      });
    } finally {
      setUploadingImage(false);
      isUploadingRef.current = false;
      // Clear the input value to allow re-uploading the same file
      e.target.value = '';
    }
  }, [token, convertToBase64]);

  /**
   * Delete profile image
   */
  const handleDeleteImage = useCallback(async () => {
    if (!profilePicture) return;

    // Custom confirmation toast
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span className="font-medium">Delete profile image?</span>
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            onClick={async () => {
              toast.dismiss(t.id);
              await confirmDeleteImage();
            }}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      icon: '🗑️',
      id: 'delete-image-confirm',
    });
  }, [profilePicture]);

  const confirmDeleteImage = useCallback(async () => {
    // Prevent duplicate deletions
    if (isDeletingRef.current) return;
    isDeletingRef.current = true;
    
    let deleteToast = null;
    
    try {
      setDeletingImage(true);
      deleteToast = toast.loading('Deleting image...', { id: 'deleting-image' });

      const response = await axios.delete(
        `${API_BASE_URL}/profile/delete-image`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data) {
        setProfilePicture(null);
        setUserData(response.data.user);
        
        // Dismiss loading toast and show success
        toast.dismiss('deleting-image');
        toast.success('Profile image deleted successfully! 🗑️', {
          id: 'image-deleted',
          duration: 3000,
        });
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      
      // Dismiss loading toast and show error
      toast.dismiss('deleting-image');
      toast.error(err.response?.data?.error || 'Failed to delete image', {
        id: 'image-delete-error',
        duration: 4000,
      });
    } finally {
      setDeletingImage(false);
      isDeletingRef.current = false;
    }
  }, [token]);

  /**
   * Handle account deletion
   */
  const handleDeleteAccount = useCallback(() => {
    // Custom confirmation toast for account deletion
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <span className="font-medium text-red-600">⚠️ Delete Account</span>
        <span className="text-sm text-gray-600">This action cannot be undone!</span>
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            onClick={() => {
              toast.dismiss(t.id);
              toast.error('Account deletion feature is not implemented yet', {
                duration: 5000,
                icon: '🚧',
                id: 'account-delete-not-implemented',
              });
            }}
          >
            Delete Account
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      icon: '⚠️',
      id: 'delete-account-confirm',
    });
  }, []);

  if (loading) {
    return (
      <div className="md:p-8 pt-4 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg p-6 max-w-5xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-deepPurple" />
            <span className="ml-3 text-lg">Loading profile...</span>
          </div>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    );
  }

  return (
    <div data-theme="light" className="md:p-8 pt-4 bg-gray-100 min-h-screen">
      {/* Toaster component for displaying toasts */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '500px',
          },
          success: {
            style: {
              background: '#10b981',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: '#3b82f6',
            },
          },
        }}
      />

      {/* Form Container */}
      <div className="bg-white rounded-lg p-6 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <div className="flex justify-center items-center relative">
              <div className="relative">
                {profilePicture ? (
                  <div className="relative">
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-lg" 
                    />
                    {/* Delete Image Button */}
                    {!deletingImage && (
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        title="Delete Image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    {deletingImage && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full">
                        <FaSpinner className="animate-spin text-xs" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 shadow-inner">
                    <FaPen className="text-gray-400 text-xl" />
                  </div>
                )}
                
                {/* Upload Button */}
                <label className={`absolute bottom-2 right-2 bg-deepPurple text-white p-2.5 rounded-full cursor-pointer hover:bg-deepPurple/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleImageUpload}
                    accept="image/*"
                    disabled={uploadingImage}
                  />
                  {uploadingImage ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaPen />
                  )}
                </label>
              </div>
            </div>

            {/* First Column - Names */}
            <div className="flex-col md:space-y-4">
              {/* First Name Field */}
              <div>
                <label className="text-gray-500 text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Rogers"
                  className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-deepPurple focus:border-transparent transition-all duration-200"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              {/* Last Name Field */}
              <div>
                <label className="text-gray-500 text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your LastName here"
                  className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-deepPurple focus:border-transparent transition-all duration-200"
                  {...register("lastName")}
                />
              </div>
            </div>

            {/* Second Column - Contact Info */}
            <div className="flex-col md:space-y-4">
              {/* Registration Email */}
              <div>
                <label className="text-gray-500 text-sm font-medium">Registration email</label>
                <div className="flex items-center input input-bordered w-full bg-gray-100 mt-1">
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className="w-full outline-none bg-transparent cursor-not-allowed"
                    {...register("email")}
                    disabled={true} // Email should not be editable
                  />
                  {isVerified && <FaCheckCircle className="text-green-500 ml-2" />}
                </div>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-gray-500 text-sm font-medium">Phone number</label>
                <input
                  type="tel"
                  placeholder="+420 732123456"
                  className="input input-bordered w-full mt-1 focus:ring-2 focus:ring-deepPurple focus:border-transparent transition-all duration-200"
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="col-span-1 sm:col-span-2 w-full flex justify-end items-end mt-8 space-x-3">
            <button 
              type="submit" 
              className="btn bg-deepPurple text-white hover:bg-deepPurple/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={updating}
            >
              {updating ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            {/* <button
              type="button"
              className="btn btn-outline btn-error flex items-center space-x-2 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleDeleteAccount}
            >
              <FaTrashAlt />
              <span>Delete account</span>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;