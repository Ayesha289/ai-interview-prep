"use client";
import * as React from "react";
import Navbar from "../components/PrepBot/navbar";
import ChartComponent from "../components/PrepBot/reusableChart";
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon

export default function Interview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  const parsedData = data ? JSON.parse(data) : null;

  return (
    <main className="min-h-screen bg-slate-800 relative">
      <Navbar />
      <button
        onClick={() => router.push('/PrepBot')}
        className="absolute top-20 left-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
      >
        <FaArrowLeft className="text-white" /> {/* Arrow icon */}
        <span>Back to Dashboard</span>
      </button>
      <div className="grid-cols-1 m-5 mt-20">
        <div className="bg-[#06121c] p-5 rounded-xl w-full h-auto mb-6">
          {parsedData && <ChartComponent data={parsedData} />}
        </div>
      </div>
    </main>
  );
}
