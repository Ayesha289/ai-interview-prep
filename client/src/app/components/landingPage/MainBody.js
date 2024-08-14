'use client'
import * as React from "react";
import Image from "next/image";

export default function body() {
    const explore = () => {
    window.location.href = "/explore";
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
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
        <button class="py-3 px-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg">
          {/* <!-- Button Body --> */}
          <span class="py-3 px-8 bg-black rounded-lg">Join the Waitlist</span>
        </button>
        <button
          className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition duration-300"
          onClick={explore}
        >
          Explore
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-12">
        <Image
          src="/assets/logo.png"
          alt="Blockchain AI Illustration"
          width={700}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
