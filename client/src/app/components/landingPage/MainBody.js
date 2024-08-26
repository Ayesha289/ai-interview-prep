/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import * as React from "react";
import Image from "next/image";
import Modal from "./modal";
import { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-black to-cyan-600 text-white">
      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
            An Interview PrepBot.
          </span>
        </h1>
        <h2 className="text-4xl font-bold mt-4">Scalable AI.</h2>
        <p className="text-lg mt-6 max-w-2xl mx-auto">
          Our technology integrates AI into preparations for any job Interview
          in any industry. within the coming weeks the product will be live and
          the first 200 users will be getting full access to the bot.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        <button onClick={showDialog} className="py-4 px-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg">
          {/* <!-- Button Body --> */}
          <span className="py-3 px-9 bg-black text-xl rounded-lg">Start Prepping Now</span>
        </button>
      </div>

      {/* Image Section
      <div className="mt-12">
        <Image
          src="/assets/logo.png"
          alt="Blockchain AI Illustration"
          width={700}
          height={300}
          className="w-full h-auto"
        />
      </div> */}

      {/* Modal */}
      {showModal && (
        <Modal onClose={hideDialog} />
      )}

    </div>
  );
}
