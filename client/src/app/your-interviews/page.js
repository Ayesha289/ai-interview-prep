'use client';
import * as React from "react";
import Navbar from "../components/landingPage/navbar";
import ChartComponent from "../components/PrepBot/reusableChart"; // Import the ChartComponent

export default function YourInterviews() {

    const startNewInterview = () => {
        // Logic to start a new interview
        router.push('/start-interview');
      };
    
      const viewSpecificInterviews = () => {
        // Logic to view specific interview
        router.push('/your-interviews');
      };

    const data = {
        labels: ['Technical Know-How', 'Organization', 'Conversational Manner', 'Problem Solving', 'Adaptability'],
        values: [25, 20, 15, 20, 20], // Use a values array for the chart data
      };
// ---IMPORTANT--- in this page you can view all your interviews or start a new interview or click on the specific interview you want to view
  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-3xl mt-4 text-center font-bold mb-6">
        All Interviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>

        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>

        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>

        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>

        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>

        <div className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800">
          <h2 className="text-xl text-white font-bold my-4">
            Interview Performance Overview
          </h2>
          <ChartComponent data={data} />
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={startNewInterview}
      >
        New Interview
      </button>
    </div>
  );
}
