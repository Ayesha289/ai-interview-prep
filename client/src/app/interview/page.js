"use client";
import * as React from "react";
import Navbar from "../components/PrepBot/navbar";
import ChartComponent from "../components/PrepBot/reusableChart"; // Import the ChartComponent
import BoxContainer from "../components/PrepBot/boxContainer";


export default function Interview() {
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
      <div className="grid-cols-1 m-5">
        <div className="bg-[#06121c] p-5 rounded-xl w-full h-auto mb-6">
          <ChartComponent data={data} />
        </div>
        <BoxContainer />
      </div>
    </>
  );
}
