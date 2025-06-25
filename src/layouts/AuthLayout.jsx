import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const AuthLayout = ({ children }) => {
  return (
    <div
      data-theme="dark"
      className="flex items-center justify-center min-h-screen bg-gray-900"
    >
      <div className="absolute top-4 left-4">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-auto" />{" "}
          {/* Adjust logo path and size */}
        </Link>
      </div>

      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
