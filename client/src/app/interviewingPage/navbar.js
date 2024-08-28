"use client";
import * as React from "react";
import Image from "next/image";
import Modal from "../components/landingPage/modal";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const showDialog = () => {
    setShowModal(true);
  };

  const hideDialog = () => {
    setShowModal(false);
  };

  return (
    <nav className="bg-black bg-opacity-80 sticky top-0 z-50">
      <div className="max-md-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
                PREPPYY
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <Modal onClose={hideDialog} />
      )}

    </nav>
  );
}