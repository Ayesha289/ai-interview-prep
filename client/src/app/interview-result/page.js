'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysisPage() {
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
        const response = await fetch('http://127.0.0.1:5000/api/analysis', {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* Top Container for Preppy Text and Button */}
      <div className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        {/* "Preppy" Text in the Top Left Corner */}
        <div className="text-xl font-bold text-gray-700">
          Preppy
        </div>

        {/* Button for Navigation */}
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={() => router.push('/PrepBot')}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Main Content Container */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Fetching your results...</p>
        </div>
      ) : (
        // Content Container with Rounded Corners and Shadow
        <div className="bg-white rounded-xl shadow-md p-8 m-6 max-w-4xl w-full">
          <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: responseHtml }} />
        </div>
      )}
    </div>
  );
}
