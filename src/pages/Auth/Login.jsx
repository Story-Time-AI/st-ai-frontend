import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import GoogleAuth from './GoogleAuth';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  // Use local endpoint for development
  const API_BASE_URL = 'https://storytymeai-e64xw.ondigitalocean.app';

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Signing you in...', {
      position: 'top-right',
    });

    try {
      // Send login data to your backend
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
        email: data.email,
        password: data.password,
      });

      // If successful, handle the response
      console.log('Login success:', response.data);
      localStorage.setItem('token', response.data.token);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      toast.success('Login successful!', {
        duration: 2000,
        position: 'top-right',
      });

      // Navigate to library (fallback URL)
      setTimeout(() => {
        navigate('/library');
      }, 1000);

    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Handle error scenarios
      if (error.response) {
        // The server responded with a non-2xx status code
        console.error('Error response:', error.response.data);
        // Display the server's error message (if available)
        toast.error(error.response.data.error || error.response.data.message || 'Invalid credentials. Please try again.', {
          duration: 4000,
          position: 'top-right',
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from the server. Please try again later.', {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        // An error occurred in setting up the request
        console.error('Request error:', error.message);
        toast.error('An unexpected error occurred. Please try again.', {
          duration: 4000,
          position: 'top-right',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-theme="dark" className="flex items-center justify-center h-auto py-10 w-full">
      {/* React Hot Toast Container */}
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
              background: '#10B981',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
          loading: {
            style: {
              background: '#3B82F6',
              color: '#fff',
            },
          },
        }}
      />
      
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-3xl font-semibold text-start text-white mb-1">Sign In</h2>
        <p className="text-start text-gray-400 mb-6">
          Enter your email and password to sign in!
        </p>
        
        {/* Google Sign-in Component */}
        <div className="mb-4">
          <GoogleAuth mode="login" title="Sign in with Google" />
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2 text-sm text-gray-400">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Form with React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email*"
            type="email"
            placeholder="mail@simple.com"
            error={errors.email?.message}
            icon={<FaUser />}
            required
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Enter a valid email address',
              },
            })}
          />

          <Input
            label="Password*"
            type="password"
            placeholder="Min. 6 characters"
            error={errors.password?.message}
            icon={<AiOutlineEyeInvisible />}
            required
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center space-x-2 text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Keep me logged in</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forget password?
            </a>
          </div>

          <Button
            type="submit"
            label="Sign In"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            variant="primary"
            customClass="mt-6 bg-blue-600 text-white hover:bg-blue-700"
          />
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Not registered yet?{' '}
          <a href="/signup" className="text-blue-400 font-semibold hover:underline">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;