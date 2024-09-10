"use client";

import React, { useState } from 'react';
import Footer from './../components/landingPage/footer';
import { useRouter } from 'next/navigation';
import CustomAlert from '../components/CustomAlert';
import 'dotenv/config';

const Page = () => {
  const port = process.env.NEXT_PUBLIC_SERVER;
  const [email, setEmail] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${port}/auth/forget-password`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert(data.message);
        router.push('/');

      } else {
        showAlert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      showAlert('An error occurred while sending the password reset email.');
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
    <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={closeAlert}
    />
    <div className="min-h-screen flex flex-col bg-gray-900">
      <nav className="bg-black bg-opacity-80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
                  PREPPYY
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="flex flex-col items-center w-full max-w-md">
          <input
            type="email"
            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mb-4"
            placeholder="Enter your registered email"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Send Password Reset Link
          </button>
        </form>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Page;
