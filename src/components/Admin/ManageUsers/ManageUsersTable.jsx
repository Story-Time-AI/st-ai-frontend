import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageUsersTable() {
  // Sample user data
  const usersData = [
    { id: 1, name: "Olivia Rhye", username: "@olivia", email: "olivia@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 2, name: "Natalie Craig", username: "@natali", email: "phoenix@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 3, name: "Drew Cano", username: "@drew", email: "lana@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 4, name: "Orlando Diggs", username: "@orlando", email: "demi@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 5, name: "Alice Moore", username: "@alice", email: "alice@untitledui.com", avatar: "https://via.placeholder.com/50" },
    { id: 6, name: "John Doe", username: "@john", email: "john@untitledui.com", avatar: "https://via.placeholder.com/50" },
    // Add more users as needed
  ];

  const navigate = useNavigate();

  const handleViewDetails = (userId) => {
    navigate(`/manage-users/${userId}`); // Redirect to UserDetails page
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen max-w-[98vw]">
      <div className="md:max-w-7xl md:mx-auto bg-white shadow-md rounded-lg">
        {/* Users Table */}
        <div className="overflow-x-scroll">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-100">
                  <td className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(user.id)}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </button>
                    <button className="btn btn-ghost text-red-500 hover:bg-red-100">
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            className="btn btn-outline btn-sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
