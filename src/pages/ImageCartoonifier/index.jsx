import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { FaCloudUploadAlt, FaSyncAlt, FaTimes, FaSave, FaCheck } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Header from "../../components/Header";
import MyAvatars from "../../components/Avatars/MyAvatars";

// Required for accessibility in ReactModal
ReactModal.setAppElement("#root");

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // State for preview + actual file
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // State for server response & modal
  const [serverResponse, setServerResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // For saving the avatar
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [avatarName, setAvatarName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Convert File -> base64 string
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Dropzone handler
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setUploadedImage(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      toast.error("Please upload a JPEG or PNG image.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetchAvatars();
  }, []);

  // 1. Fetch the user's avatars
  async function fetchAvatars() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      // Adjust if you need a "Bearer" prefix:
      // const headers = { Authorization: `Bearer ${token}` };
      const headers = { Authorization: token };

      const { data } = await axios.get("https://storytymeai-e64xw.ondigitalocean.app/api/avatars", {
        headers,
      });

      setAvatars(data.avatars || []);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      // toast.error("Failed to fetch avatars");
    } finally {
      setLoading(false);
    }
  }

  // Form submit to generate avatar
  const onSubmit = async (data) => {
    try {
      if (!imageFile) {
        toast.error("Please select an image file");
        return;
      }

      // Convert the file to base64
      const base64 = await convertBase64(imageFile);

      // Build JSON payload
      const payload = {
        image: base64,
        prompt: data.prompt,
        animeStyle: data.animeStyle,
      };

      const token = localStorage.getItem("token");
      const headers = { Authorization: token };

      // Send to server => generate avatar
      const { data: resData } = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app/api/generate-avatar",
        payload,
        { headers }
      );

      setServerResponse(resData);
      setAvatarUrl(resData.avatarUrl[0]);
      setShowModal(true); // open the modal to show results
      toast.success("Avatar generated successfully!");
    } catch (error) {
      console.error("Error generating avatar:", error);
      toast.error("Failed to generate avatar. Please try again.");
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setShowSaveForm(false);
    setAvatarName("");
    setIsSaving(false);
  };

  // Handle "Save Avatar" button => show name field
  const handleShowSaveForm = () => {
    setShowSaveForm(true);
  };

  // Confirm saving the avatar
  const handleSaveAvatar = async () => {
    try {
      if (!avatarName.trim()) {
        toast.error("Please enter a name for your avatar");
        return;
      }

      setIsSaving(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };

      const payload = {
        name: avatarName,
        avatarUrl: avatarUrl,
        prompt: serverResponse.prompt || "", // Reuse the prompt from generation
        animeStyle: serverResponse.animeStyle || "", // or if you have it available
      };

      // POST /api/avatar/save-avatar
      const { data } = await axios.post(
        "https://storytymeai-e64xw.ondigitalocean.app/api/save-avatar",
        payload,
        { headers }
      );

      // Fetch avatars to update the list
      await fetchAvatars();
      
      // Reset states
      closeModal();
      setAvatarUrl(null);
      setImageFile(null);
      setServerResponse(null);
      setUploadedImage(null);

      // Show success message
      toast.success(`Avatar "${data.avatar.avatarName}" saved successfully!`);
    } catch (error) {
      console.error("Error saving avatar:", error);
      toast.error("Failed to save avatar. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Header title="Character Creator" />

      <div
        data-theme="light"
        className="flex flex-col items-center justify-center md:mt-4 mt-5 p-8 bg-white rounded-lg max-w-xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-primaryDarkBlue mb-6">
          Create something amazing
        </h1>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${
            isDragActive ? "border-deepPurple" : "border-gray-300"
          } bg-white cursor-pointer mb-6 relative`}
        >
          <input {...getInputProps()} />
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded preview"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <>
              <FaCloudUploadAlt className="text-5xl text-deepPurple mb-3" />
              <p className="text-gray-500">
                Drag & drop files or{" "}
                <span className="text-deepPurple underline cursor-pointer">
                  Browse
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                Supported formats: JPEG, PNG
              </p>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label className="w-full text-gray-500 my-2">Prompt</label>
          <input
            type="text"
            placeholder="Enter your scene text here"
            {...register("prompt", { required: "Scene text is required" })}
            className="input input-bordered w-full mb-4"
          />
          {errors.prompt && (
            <p className="text-red-500 text-sm">{errors.prompt.message}</p>
          )}

          <label className="w-full text-gray-500 my-2">Anime Style</label>
          <select
            {...register("animeStyle", { required: "Anime style is required" })}
            className="input input-bordered w-full mb-4"
          >
            <option value="">Select a style</option>
            <option value="Kodomo">Japanese Anime </option>
            <option value="Josei">Cinematic </option>
            <option value="Seinen">Disney Character </option>
            <option value="Shōjo">Photographic </option>
            <option value="Shōnen">Comic Book </option>
              <option value="Shōnen">Line Art </option>
          </select>
          {errors.animeStyle && (
            <p className="text-red-500 text-sm">{errors.animeStyle.message}</p>
          )}

          <div className="flex w-10/12 items-center space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-deepPurple text-white w-full hover:bg-deepPurple/90"
            >
              {isSubmitting ? "Generating..." : "Generate Character"}
            </button>
            <button
              type="button"
              onClick={() => {
                setUploadedImage(null);
                setImageFile(null);
                setServerResponse(null);
                toast.success("Form reset successfully");
              }}
              className="btn btn-circle btn-outline text-deepPurple border-deepPurple hover:bg-deepPurple hover:text-white"
            >
              <FaSyncAlt />
            </button>
          </div>
        </form>
      </div>

      <MyAvatars avatars={avatars} loading={loading} onAvatarDeleted={fetchAvatars} />

      {/* React Modal to show the result */}
      <ReactModal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Avatar Generation Result"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 md:mx-auto my-4 md:my-8 p-0 relative overflow-hidden max-h-[95vh] flex flex-col"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      >
        {/* Header - Fixed */}
        <div className="bg-deepPurple p-6 md:p-8 text-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">Your Generated Avatar</h2>
              <p className="text-purple-100 text-sm md:text-base opacity-90">Ready to save your creation?</p>
            </div>
            <button
              onClick={closeModal}
              className="p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable if needed */}
        <div className="flex-1 overflow-y-auto">
          {serverResponse && (
            <div className="p-6 md:p-8">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Avatar Image */}
                <div className="flex flex-col items-center space-y-4">
                  {Array.isArray(serverResponse.avatarUrl) &&
                    serverResponse.avatarUrl.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute inset-0 bg-deepPurple rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <img
                          src={url}
                          alt="Generated Avatar"
                          className="relative w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    ))}

                  {/* Prompt Display */}
                  {serverResponse.prompt && (
                    <div className="w-full max-w-sm bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-deepPurple rounded-full"></div>
                        <p className="text-deepPurple text-sm font-semibold">Generated From:</p>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{serverResponse.prompt}</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Save Section */}
                <div className="flex flex-col justify-center">
                  {!showSaveForm ? (
                    <div className="text-center space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-gray-800">Love your avatar?</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Save it to your collection and use it whenever you want. Give it a memorable name!
                        </p>
                      </div>
                      
                      <button
                        onClick={handleShowSaveForm}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                      >
                        <FaSave className="text-xl" />
                        Save to Collection
                      </button>
                      
                      <p className="text-xs text-gray-500">
                        You can always generate a new one later
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-white to-purple-50 p-6 md:p-8 rounded-2xl border-2 border-purple-100 shadow-lg">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-deepPurple to-purple-600
                         rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaSave className="text-white text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          Save Your Avatar
                        </h3>
                        <p className="text-gray-600">
                          Choose a name that you'll remember
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Avatar Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., My Awesome Character, Cool Warrior..."
                            value={avatarName}
                            onChange={(e) => setAvatarName(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-deepPurple/20 focus:border-deepPurple outline-none transition-all text-lg bg-white/80"
                            disabled={isSaving}
                            maxLength={50}
                          />
                          <div className="flex justify-between mt-2">
                            <p className="text-xs text-gray-500">
                              {avatarName.length}/50 characters
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={handleSaveAvatar}
                            disabled={isSaving || !avatarName.trim()}
                            className="flex-1 flex items-center justify-center gap-3 
                            bg-gradient-to-r from-deepPurple to-purple-600 hover:from-purple-600
                             hover:to-deepPurple text-white px-3 py-3 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                          >
                            {isSaving ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <FaCheck className="text-lg" />
                                Save Avatar
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={() => setShowSaveForm(false)}
                            disabled={isSaving}
                            className="px-3 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-lg transition-colors disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
}