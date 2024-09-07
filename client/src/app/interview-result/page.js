'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './navbar'; 
import 'dotenv/config';

export default function AnalysisPage() {
  const port = process.env.NEXT_PUBLIC_SERVER;
  const [responseHtml, setResponseHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Get data from localStorage
      const interviewId = localStorage.getItem('interviewId');
      const conversationHistory = JSON.parse(localStorage.getItem('conversationHistory'));

      if (!interviewId || !conversationHistory) {
        console.error('No interview ID or conversation history found in localStorage.');
        setLoading(false);
        return;
      }

      const requestBody = {
        interview_id: interviewId,
        conversation: conversationHistory,
      };

      try {
        const response = await fetch(`${port}/api/analysis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponseHtml(data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 p-6">
        {/* Main Content Container */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full mb-4"></div>
            <p className="text-gray-400 text-lg font-medium">Fetching your results...</p>
          </div>
        ) : (
          // Content Container with Rounded Corners and Shadow
          <div className="bg-gray-800 rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            <div className="prose text-white max-w-full" dangerouslySetInnerHTML={{ __html: responseHtml }} />
          </div>
        )}
      </main>
    </div>
  );
}
