"use client";
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Image from "next/image";
import CoFounders from "../components/landingPage/cofounders";
import Footer from "../components/landingPage/footer";

export default function HomePage() {
  const goBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Back Button */}
      <div className="self-start mt-4 ml-4">
        <button
          className="flex items-center space-x-2 bg-cyan-500 p-3 font-semibold rounded-lg text-black hover:bg-cyan-700 transition duration-300"
          onClick={goBack}
        >
          <div class="flex items-center -space-x-3 translate-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 stroke-black font-semibold -translate-x-2 transition duration-300 group-hover:translate-x-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 5l-7 7 7 7"
              />
            </svg>
          </div>
          <span>Back to Waitlist</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold">Explore our App</h1>
        <p className="text-lg mt-4">
          Welcome to{" "}
          <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
            Preppy
          </span>
          , your own interview app.
        </p>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Interview preparations just got easier! With our app you can get a
          mock interview based on the job title and experience level of your
          choice, getting you ready for the big day.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-5xl">
        <div className="bg-gradient-to-b from-gray-600 to-gray-800 p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold">Personalized Itineraries</h3>
          <p className="mt-4 text-sm">
            Preppy's AI-driven tool creates personalized mock interviews based
            of the information you feed it. From a Junior frontend developer
            role to a role that requires an experienced accountant preppy's got
            you covered
          </p>
        </div>
        <div className="bg-gradient-to-b from-gray-600 to-gray-800 p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold">Real-Time Data Integration</h3>
          <p className="mt-4 text-sm">
            Preppy's AI continuously learns and updates its knowledge base with
            the latest interview trends, techniques, and questions. This ensures
            you get the most relevant and up-to-date information for your
            interview preparation. This real-time data integration keeps you
            informed about the latest industry practices and helps you prepare
            effectively for your interview.
          </p>
        </div>
        <div className="bg-gradient-to-b from-gray-600 to-gray-800 p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold">Optimized Chat Experience</h3>
          <p className="mt-4 text-sm">
            Preppy's AI-powered chat interface provides a seamless and engaging
            experience. It understands your answers and provides relevant
            insight to improve them, making your interview preparation interactive and
            effective.
          </p>
        </div>
        <div className="bg-gradient-to-b from-gray-600 to-gray-800 p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold">Progress Recommendations</h3>
          <p className="mt-4 text-sm">
            Preppy provides personalized feedback and recommendations based on your
            performance in mock interviews. It identifies areas for improvement
            and suggests resources to help you enhance your skills.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="mt-12">
        <CoFounders />
      </div>

      {/* footer section */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-3 px-2 fixed mt-auto bottom-0 w-full">
        <div className="container mx-auto max-w-md">
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
            © 2024 PREPPY
          </p>
        </div>
      </footer>
    </div>
  );
}
