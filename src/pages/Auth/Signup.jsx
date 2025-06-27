import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios'; // <-- Import axios

import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // To check if the password and confirm password match
  const password = watch('password');

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // POST request to your backend endpoint
      const response = await axios.post('http://localhost:5002
https://storytymeai-e64xw.ondigitalocean.app/api/v1/auth/register', {
        username: data.fullName,
        email: data.email,
        password: data.password,
      });

      // If successful, you can handle the success scenario here
      // e.g., show a success message, redirect, etc.
      console.log('Server response:', response.data);
      alert('Registered successfully!');
      
    } catch (error) {
      // Handle and display errors in a user-friendly manner
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that is not in the range of 2xx
        console.error('Error response data:', error.response.data);
        // You might have something like `error.response.data.message` coming from your server
        alert(error.response.data.error || 'Something went wrong. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response from the server:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-theme="dark" className="flex items-center justify-center w-full overflow-y-scroll py-10">
      <div className="w-full max-w-xl p-8 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-3xl font-semibold text-start text-white mb-1">Create an Account</h2>
        <p className="text-start text-gray-400 mb-6">Enter your details to create a new account!</p>
        
        {/* Google Sign-up Button */}
        <button className="btn btn-outline w-full mb-4 flex items-center justify-center gap-2 text-gray-300 border-gray-600 hover:border-gray-500 hover:text-white">
          <FaGoogle /> Sign up with Google
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
            label="Full Name*"
            type="text"
            placeholder="John Doe"
            error={errors.fullName?.message}
            icon={<FaUser />}
            required
            fullWidth
            {...register('fullName', {
              required: 'Full Name is required',
              minLength: {
                value: 3,
                message: 'Full Name must be at least 3 characters',
              },
            })}
          />

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
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />

          <Input
            label="Confirm Password*"
            type="password"
            placeholder="Re-enter password"
            error={errors.confirmPassword?.message}
            icon={<AiOutlineEyeInvisible />}
            required
            fullWidth
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />

          <Button
            type="submit"
            label="Sign Up"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            variant="primary"
            customClass="mt-6 bg-blue-600 text-white hover:bg-blue-700"
          />
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <a href="/signin" className="text-blue-400 font-semibold hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
