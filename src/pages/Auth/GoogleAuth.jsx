import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import toast from "react-hot-toast";

const clientId = "721935226432-mvc2pdvfpeap5n7mgcn6feapu7cj64ge.apps.googleusercontent.com";

export default function GoogleAuth({ 
  title = "Sign in with Google", 
  mode = "login" 
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use local endpoint for development
  const API_BASE_URL = "https://storytymeai-e64xw.ondigitalocean.app";

  const handleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      // The new Google Identity Services returns the ID token as `credential`
      const credential = credentialResponse?.credential;
      if (!credential) {
        throw new Error("No credential returned from Google.");
      }

      // Send the credential to your backend for verification
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/auth/google/signup`, // Use signup endpoint for both
        {
          credential,
        }
      );

      // Get the token from response
      const { token } = data;
      if (token) {
        localStorage.setItem("token", token);
      }

      // Show success message based on whether it was signup or login
      const message = data.message.includes('signup') 
        ? 'Account created successfully!' 
        : 'Login successful!';

      toast.success(message, {
        duration: 2000,
        position: "top-right",
      });

      // Redirect to library (fallback URL)
      setTimeout(() => {
        navigate("/library");
      }, 1000);

    } catch (error) {
      console.error("Google auth error:", error);
      
      let errorMessage = "Something went wrong with Google authentication";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400 && mode === 'login') {
        errorMessage = "No account found. Please sign up first.";
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
    toast.error("Google authentication failed. Please try again.", {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div style={{ position: "relative" }} className="w-full">
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <GridLoader color="#3B82F6" size={8} />
        </div>
      )}
      
      <div className="flex items-center justify-center w-full">
        <GoogleOAuthProvider clientId={clientId}>
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              auto_select={false}
              prompt="select_account"
              size="large"
              width="100%"
              text={mode === 'signup' ? 'signup_with' : 'continue_with'}
              theme="outline"
              shape="rectangular"
              disabled={loading}
              locale="en"
            />
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}