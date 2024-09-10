"use client";
import * as React from "react";
import Modal from "../components/landingPage/modal";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const toggleDialog = () => {
    setShowModal(!showModal);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigateToDashboard = () => {
    router.push('/PrepBot');
  };

  return (
    <nav className="bg-black bg-opacity-90 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
              PREPPYY
            </span>
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={navigateToDashboard} 
          >
            Back to Dashboard
          </button>
          </div>
        </div>
      {showModal && (
        <Modal onClose={toggleDialog} />
      )}
    </nav>
  );
}
