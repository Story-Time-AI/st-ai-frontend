import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  // Sample user data
  const usersData = [
    { id: 1, name: "Olivia Rhye", username: "@olivia", email: "olivia@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 2, name: "Natalie Craig", username: "@natali", email: "phoenix@untitledui.com", avatar: "https://via.placeholder.com/50" },
    // Add more users as needed
  ];

  const navigate = useNavigate();

  const handleViewDetails = (userId) => {
    navigate(`/users/${userId}`);
  };

  // Dashboard data
  const dashboardStats = {
    generatedStories: 32,
    balance: "$42.50",
  };

  return (
    <div data-theme='light' className="p-6 bg-blue-50 min-h-screen max-w-[98vw]">
      {/* Dashboard Section */}
      <div className="md:grid md:grid-cols-3 md:space-y-0 space-y-2 gap-4 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-700">Generated Stories</h3>
          <p className="text-2xl font-bold text-primaryDarkBlue">{dashboardStats.generatedStories}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-700">Balance</h3>
          <p className="text-2xl font-bold text-primaryDarkBlue">{dashboardStats.balance}</p>
        </div>
       
      </div>

      {/* Form Section */}
      <div className="md:max-w-7xl md:mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Form</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="col-span-1">
            <label className="text-sm font-bold text-gray-600 mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="text-sm font-bold text-gray-600 mb-1 block">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="text-sm font-bold text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
            />
          </div>

          <button
                  // onClick={() => handleViewDetails(user.id)}
                  className="btn btn-md mt-6 bg-blue-500 text-white"
                >
                 Update
                </button>
         
        </form>
      </div>

      
    </div>
  );
}
