import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import { FaTrash, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';

function MyAvatars({ avatars, loading, onAvatarDeleted }) {
  // For the delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [avatarToDelete, setAvatarToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 2. Open the delete confirmation modal
  function handleOpenDeleteModal(e) {
    const avatarId = e.currentTarget.dataset.avatarid;
    const avatarName = e.currentTarget.dataset.avatarname;
    setAvatarToDelete({ id: avatarId, name: avatarName });
    setIsDeleteModalOpen(true);
  }

  // 3. Close the delete confirmation modal
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setAvatarToDelete(null);
    setIsDeleting(false);
  }

  // 4. Confirm the deletion
  async function handleConfirmDelete() {
    if (!avatarToDelete?.id) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };

      // Fixed API endpoint - adjust this to match your actual endpoint
      await axios.delete(`http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.app/api/avatars/${avatarToDelete.id}`, {
        headers,
      });

      // Call the parent's refresh function
      if (onAvatarDeleted) {
        await onAvatarDeleted();
      }

      toast.success(`Avatar "${avatarToDelete.name}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting avatar:", error);
      toast.error("Failed to delete the avatar. Please try again.");
    } finally {
      handleCloseDeleteModal();
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-deepPurple border-t-transparent"></div>
          <p className="text-gray-600">Loading your avatars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-start text-primaryDarkBlue">
          My Avatars
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Here are all the amazing avatars you've created so far.
        </p>
      </div>

      {avatars.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No avatars yet</h3>
            <p className="text-gray-600">Create your first avatar using the form above!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {avatars.map((avatar) => (
            <div key={avatar._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={avatar.avatarUrl}
                  alt={avatar.avatarName || "Avatar"}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Delete Button Overlay */}
                <button
                  data-avatarid={avatar._id}
                  data-avatarname={avatar.avatarName || "Unnamed Avatar"}
                  onClick={handleOpenDeleteModal}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:scale-110"
                  title="Delete Avatar"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
                  {avatar.avatarName || "Unnamed Avatar"}
                </h3>
                {avatar.prompt && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {avatar.prompt}
                  </p>
                )}
                {avatar.animeStyle && (
                  <span className="inline-block bg-deepPurple/10 text-deepPurple px-2 py-1 rounded-full text-xs font-medium mt-2">
                    {avatar.animeStyle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ReactModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        contentLabel="Confirm Delete"
        className="bg-white rounded-2xl shadow-2xl max-w-md mx-4 md:mx-auto p-0 relative overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Delete Avatar</h2>
            <button
              onClick={handleCloseDeleteModal}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isDeleting}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Are you sure?
            </h3>
            <p className="text-gray-600">
              You're about to delete <span className="font-semibold">"{avatarToDelete?.name}"</span>. 
              This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCloseDeleteModal}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default MyAvatars;