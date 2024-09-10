"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChartComponent from "../components/PrepBot/reusableChart";
import Navbar from "../components/PrepBot/navbar";
import CustomAlert from "../components/CustomAlert";
import JobRoleModal from "./modal.js";
import Footer from "../components/landingPage/footer"
import 'dotenv/config';

export default function InterviewDashboard() {
  const port = process.env.NEXT_PUBLIC_SERVER;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scores, setScores] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  useEffect(() => {
    const fetchScores = async () => {
      const user_id = localStorage.getItem('userId');
      try {
        const response = await fetch(`${port}/api/scores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id }),
        });

        if (!response.ok) {
          showAlert("Failed to fetch scores");
          return;
        }

        const data = await response.json();
        if (Array.isArray(data.scores)) {
          setScores(data.scores);
        } else {
          showAlert("No scores available.");
        }
      } catch (error) {
        showAlert("Error fetching scores.");
      }
    };

    fetchScores();
  }, [port]);

  const checkCredits = () => {
    const credits = localStorage.getItem('credits');
    const creditsNumber = Number(credits);
    if (credits === 'Unlimited' || creditsNumber >= 20) {
      return true;
    }
    return false;
  };

  const startNewInterview = () => {
    if (checkCredits()) {
      setIsModalOpen(true);
    } else {
      showAlert("Insufficient credits. Please purchase more credits to start a new interview.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewSpecificInterviews = (id) => {
    const queryString = new URLSearchParams({
      id: id,
    }).toString();
    router.push(`/interview-info?${queryString}`);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <Navbar />
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={closeAlert}
      />
      <div className="min-h-screen p-6 bg-slate-950">
        {scores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scores.map((score, index) => (
              <div
                key={index}
                onClick={() => viewSpecificInterviews(score.id)}
                className="bg-[#06121c] h-auto px-4 rounded-lg shadow-lg shadow-emerald-800 cursor-pointer hover:bg-[#1b2b38] transition duration-300"
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
                      score.scores.communication_skills,
                      score.scores.engagement_and_interaction,
                      score.scores.overall_evaluation,
                      score.scores.problem_solving_ability,
                      score.scores.technical_knowledge,
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
            <h3 className="text-white text-center mb-6">
              All your interview results will be displayed here after you take an interview.
            </h3>

            <ol className="text-white text-left list-decimal pl-6 space-y-2">
              <p>As a new registered user, we are giving you 60 credits for free!</p>
              <p>Each interview consumes 20 credits, you can buy our plans according to your needs!</p>
              <br/>
              <li>To start the interview, click on the &quot;New Interview&quot; button.</li>
              <li>Enter your job role and the years of experience you have relevant to your job role.</li>
              <li>
                You will be redirected to the interview dashboard where it is requested to turn on the mic and camera before proceeding to the interview.
              </li>
              <li>
                After you feel you are done or want to end the interview, just click &quot;Exit Interview&quot; and your results and detailed analysis will be given to you.
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
      <Footer />

      {isModalOpen && <JobRoleModal />}
    </>
  );
}
