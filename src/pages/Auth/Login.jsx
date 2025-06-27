import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'; // <--- Import axios
import { useNavigate } from "react-router-dom";

import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';

const Login = () => {
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Send login data to your backend
      const response = await axios.post('http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.app/api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });

      // If successful, handle the response
      // e.g., save token, navigate to a protected route, etc.
      console.log('Login success:', response.data);
      localStorage.setItem('token', response.data.token);
      // If your server returns a token, for example:
      // localStorage.setItem('token', response.data.token);

      // Navigate to library (or any other route)
      navigate('/library');
    } catch (error) {
      // Handle error scenarios
      if (error.response) {
        // The server responded with a non-2xx status code
        console.error('Error response:', error.response.data);
        // Display the server's error message (if available)
        alert(error.response.data.error || 'Something went wrong. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        // An error occurred in setting up the request
        console.error('Request error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-theme="dark" className="flex items-center justify-center h-auto py-10 w-full">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-3xl font-semibold text-start text-white mb-1">Sign In</h2>
        <p className="text-start text-gray-400 mb-6">
          Enter your email and password to sign in!
        </p>
        
        {/* Google Sign-in Button */}
        <button className="btn btn-outline w-full mb-4 flex items-center justify-center gap-2 text-gray-300 border-gray-600 hover:border-gray-500 hover:text-white">
          <FaGoogle /> Sign in with Google
        </button>

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
            placeholder="mail@simmple.com"
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
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            icon={<AiOutlineEyeInvisible />}
            required
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 8 characters',
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
