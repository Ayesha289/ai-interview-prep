"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import ChartComponent from "../components/PrepBot/reusableChart";
import Navbar from "../components/PrepBot/navbar";
import JobRoleModal from "./modal.js"; // Import the JobRoleModal component

export default function InterviewDashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State to manage modal visibility
  const router = useRouter();

  const startNewInterview = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const viewSpecificInterviews = () => {
    router.push("/interview-info");
  };

  const data = {
    labels: [
      "Technical Know-How",
      "Organization",
      "Conversational Manner",
      "Problem Solving",
      "Adaptability",
    ],
    values: [25, 20, 15, 20, 20], // Use a values array for the chart data
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-slate-950">
        <h1 className="text-3xl mt-4 text-center font-bold mb-6">
          Top Four Interviews
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={viewSpecificInterviews}
            className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800"
          >
            <h2 className="text-xl text-white font-bold my-4">
              Interview Performance Overview
            </h2>
            <ChartComponent data={data} />
          </div>

          {/* Duplicate elements as needed */}
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
          onClick={startNewInterview} // Set the button to open the modal
        >
          New Interview
        </button>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && <JobRoleModal />}
    </>
  );
}
