"use client";
import * as React from "react";
import Navbar from "../components/PrepBot/navbar";
import ChartComponent from "../components/PrepBot/reusableChart";
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; 
import { useState, useEffect } from 'react';

export default function Interview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interview_id = searchParams.get('id');
  
  const [data, setData] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (interview_id) {
        try {
          const response = await fetch("https://ai-interview-sage.vercel.app/api/results", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ interview_id: interview_id }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch interview data");
          }

          const result = await response.json();
          
          setHtmlContent(result.result);
          setData(result.scores);
        } catch (error) {
          console.error("Error fetching interview data:", error);
        }
      } else {
        console.warn("No interview_id found in URL params.");
      }
    };

    fetchInterviewData();
  }, [interview_id]);

  return (
    <main className="min-h-screen bg-slate-800 flex flex-col relative">
      <Navbar />
      <button
        onClick={() => router.push('/PrepBot')}
        className="absolute top-20 left-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
      >
        <FaArrowLeft className="text-white" />
        <span>Back to Dashboard</span>
      </button>
      <div className="grid-cols-1 m-5 mt-20">
        <div className="bg-[#06121c] p-5 rounded-xl w-full h-auto mb-6">
          {data ? (
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
                  data.communication_skills,
                  data.engagement_and_interaction,
                  data.overall_evaluation,
                  data.problem_solving_ability,
                  data.technical_knowledge,
                ],
              }}
            />
          ) : (
            <p className="text-white">Loading chart data...</p>
          )}
        </div>
        <div className="bg-[#06121c] p-5 rounded-xl w-full h-auto mb-8">
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
          />
        </div>
      </div>
    </main>
  );
}
