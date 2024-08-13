import * as React from 'react';
import Image from 'next/image';

export default function body() {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-pink-400">A Fast Blockchain.</h1>
        <h2 className="text-4xl font-bold mt-4">Scalable AI.</h2>
        <p className="text-lg mt-6 max-w-2xl mx-auto">
          Our technology performs fast blockchain (120K TPS) and guarantees AI-based data security.
          Proof of Stake, its consensus algorithm enables unlimited speeds.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        <button className="bg-pink-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-pink-500 transition duration-300">
          Get started
        </button>
        <button className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-black transition duration-300">
          Ecosystems
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-12">
        <Image
          src={""}
          alt="Blockchain AI Illustration"
          width={700}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </div>
    )
}