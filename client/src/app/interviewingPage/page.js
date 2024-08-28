"use client";

import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button, Box, Typography } from "@mui/material";
import Navbar from "./navbar";
import Footer from "../components/landingPage/footer";

export default function InterviewingPage() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const webcamRef = useRef(null);

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleMicToggle = () => {
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black bg-opacity-80">
      <Navbar />
      <div className="flex flex-grow p-8">
        <div className="flex-grow">
          <Box
            className="flex justify-center items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
            style={{ height: "400px" }}
          >
            <Typography variant="h6" className="text-gray-500 dark:text-gray-400">
              This is where your interview questions or prompts would go.
            </Typography>
          </Box>
        </div>
        <div className="ml-8 flex-shrink-0">
          <Box
            className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-lg"
            style={{ width: "320px", height: "240px" }}
          >
            {isCameraOn ? (
              <Webcam
                audio={!isMicMuted}
                ref={webcamRef}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <Typography variant="h6" className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                Camera is off
              </Typography>
            )}
          </Box>
          <div className="mt-4 flex space-x-2">
            <Button
              variant="contained"
              style={{ backgroundColor: isCameraOn ? 'red' : 'black', color: 'white' }}
              onClick={handleCameraToggle}
            >
              {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: isMicMuted ? 'red' : 'black', color: 'white' }}
              onClick={handleMicToggle}
            >
              {isMicMuted ? "Unmute Mic" : "Mute Mic"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
