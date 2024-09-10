/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import * as React from "react";
import Modal from "./modal";
import { useState } from 'react';
import '@/app/globals.css';

export default function body() {
  const explore = () => {
    window.location.href = "/explore";
  };

  const [showModal, setShowModal] = useState(false);

  const showDialog = () => {
    setShowModal(true);
  };

  const hideDialog = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#0a1f2b] to-black text-white p-4 sm:p-8 md:p-16">
      
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl">
        
        {/* Left side - Text content */}
        <div className="text-left md:w-1/2 py-8 animate-fadeIn"> {/* Reduced top and bottom padding */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 transition-transform transform hover:scale-105">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
              Meet Preppyy
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
            Your AI-Powered Interview Coach
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
            Elevate your interview game with our advanced AI-driven platform.
            Get real-time feedback and tailored questions for any role,
            anywhere.
          </p>
          
          <div className="flex space-x-4 mt-8">
            <button
              onClick={showDialog}
              className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <span className="text-lg text-black font-semibold">
                Start Prepping Now
              </span>
            </button>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center animate-fadeIn mt-0 md:mt-0"> {/* Adjusted top margin */}
          <img 
            src="assets/homeMascot.png" 
            alt="AI Interview Coach" 
            className="max-w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

      </div>
      
      {showModal && <Modal onClose={hideDialog} />}
    </div>
  );
}
