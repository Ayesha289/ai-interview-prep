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
      <div className="text-center py-16 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 transition-transform transform hover:scale-105">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
            Meet Preppyy
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6">
          Your AI-Powered Interview Coach
        </h2>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Elevate your interview game with our advanced AI-driven platform.
          Get real-time feedback and tailored questions for any role,
          anywhere.
        </p>
      </div>
  
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
      {showModal && <Modal onClose={hideDialog} />}
    </div>
  );
  
}
