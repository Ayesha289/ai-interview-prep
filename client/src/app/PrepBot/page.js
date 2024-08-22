'use client';
import * as React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useRouter } from 'next/navigation';


export default function InterviewDashboard() {
  const router = useRouter();

  const startNewInterview = () => {
    // Logic to start a new interview
    router.push('/start-interview');
  };

  const data = {
    labels: ['Technical Know-How', 'Organization', 'Conversational Manner', 'Problem Solving', 'Adaptability'],
    datasets: [
      {
        data: [25, 20, 15, 20, 20], // Replace these values with actual data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Interviews Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-transparent p-4 rounded-lg shadow-md">
          <h2 className="text-xl text-white font-bold mb-4">Interview Performance Overview</h2>
          <Pie data={data} />
        </div>
        {/* Add more charts or stats here */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Another Chart</h2>
          {/* Another chart or content */}
        </div>
      </div>
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={() => alert('Starting a new interview...')}>
          New Interview
      </button>
    </div>
  );
}
