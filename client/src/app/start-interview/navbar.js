"use client";
import * as React from "react";
import Modal from "../components/landingPage/modal";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleDialog = () => {
    setShowModal(!showModal);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
          <div className="flex items-center space-x-4">
            <IconButton onClick={toggleMenu} className="text-white md:hidden">
              <MenuIcon />
            </IconButton>
            <div className={`${showMenu ? 'block' : 'hidden'} md:flex ml-4 space-x-4`}>
              <div className="relative">
                <IconButton onClick={toggleMenu} className="text-white">
                  <MenuIcon />
                </IconButton>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      <li>
                        <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
                      </li>
                      <li>
                        <a href="/your-interviews" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Your Interviews</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={toggleDialog} />
      )}
    </nav>
  );
}
