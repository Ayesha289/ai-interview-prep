"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChartComponent from "../components/PrepBot/reusableChart";
import Navbar from "../components/PrepBot/navbar";
import JobRoleModal from "./modal.js"; 

export default function InterviewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [scores, setScores] = useState([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchScores = async () => {
      const user_id = localStorage.getItem('userId');
      try {
        const response = await fetch("https://ai-interview-sage.vercel.app/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id}), 
        });

        if (!response.ok) {
          throw new Error("Failed to fetch scores");
        }

        const data = await response.json();
        setScores(data.scores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  const startNewInterview = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const viewSpecificInterviews = () => {
    router.push("/interview-info");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-slate-950">
        {scores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scores.map((score, index) => (
              <div
                key={index}
                onClick={viewSpecificInterviews}
                className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800 cursor-pointer hover:bg-slate-700 transition duration-300"
              >
                <h2 className="text-xl text-white font-bold my-4">
                  Interview Performance Overview
                </h2>
                <ChartComponent
                  data={{
                    labels: [
                      "Communication Skills",
                      "Engagement and Interaction",
                      "Overall Evaluation",
                      "Problem Solving Ability",
                      "Technical Knowledge",
                    ],
                    values: [
                      score.communication_skills,
                      score.engagement_and_interaction,
                      score.overall_evaluation,
                      score.problem_solving_ability,
                      score.technical_knowledge,
                    ],
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-[#06121c] rounded-lg shadow-lg shadow-emerald-800">
            <h2 className="text-2xl text-white font-bold mb-4">
              Welcome to the Interview Dashboard!
            </h2>
            <p className="text-white text-center mb-6">
              All your interview results will be displayed here after you take an interview.
            </p>
            
            <ol className="text-white text-left list-decimal pl-6 space-y-2">
              <li>Click on the "New Interview" button.</li>
              <li>Enter your job role and the years of experience you have relevant to your job role.</li>
              <li>
                You will be redirected to the interview dashboard where it is requested to turn on the mic and camera before proceeding to the interview.
              </li>
              <li>
                After you feel you are done or want to end the interview, just click "Exit Interview" and your results and detailed analysis will be given to you.
              </li>
              <li>
                After that, you will be able to see your strong points in the dashboard based on the analysis.
              </li>
            </ol>
          </div>
        )}
        <button
          className="fixed bottom-6 right-6 bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={startNewInterview} 
        >
          New Interview
        </button>
      </div>

      {isModalOpen && <JobRoleModal />}
    </>
  );
}
