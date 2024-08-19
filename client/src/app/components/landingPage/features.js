"use client";
import * as React from "react";
import { useEffect, useRef } from "react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Personalized Itineraries",
      description: `Preppy's AI-driven tool creates personalized mock interviews based
                          on the information you feed it. From a Junior frontend developer
                          role to a role that requires an experienced accountant preppy's got
                          you covered.`,
      direction: "left",
    },
    {
      title: "Real-Time Data Integration",
      description: `Preppy's AI continuously learns and updates its knowledge base with
                the latest interview trends, techniques, and questions. This ensures
                you get the most relevant and up-to-date information for your
                interview preparation.`,
      direction: "right",
    },
    {
      title: "Optimized Chat Experience",
      description: `Preppy's AI-powered chat interface provides a seamless and engaging
                experience. It understands your answers and provides relevant
                insight to improve them, making your interview preparation interactive and
                effective.`,
      direction: "left",
    },
    {
      title: "Progress Recommendations",
      description: `Preppy provides personalized feedback and recommendations based on your
                performance in mock interviews. It identifies areas for improvement
                and suggests resources to help you enhance your skills.`,
      direction: "right",
    },
  ];

  const Circle = () => {
    return <div className="rounded-full w-4 h-4 mx-auto bg-blue-500"></div>;
  };

  const Pillar = () => {
    return (
      <div className="rounded-t-full rounded-b-full w-2 h-full mx-1 bg-blue-500"></div>
    );
  };

  const EventCard = ({ heading, subheading, direction }) => {
    const cardRef = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
          if (isVisible) {
            cardRef.current.classList.add(
              direction === "left" ? "animate-fadeInLeft" : "animate-fadeInRight"
            );
          }
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [direction]);

    return (
      <div
        ref={cardRef}
        className="opacity-0 transform transition duration-1000 hover:-translate-y-1 hover:shadow-2xl shadow-slate-400 flex flex-col gap-y-2 w-96 border shadow-md rounded-xl p-6"
      >
        <div className="text-blue-200 font-bold text-2xl">{heading}</div>
        <div className="text-gray-200 text-md">{subheading}</div>
      </div>
    );
  };

  return (
    <section id="features" className="bg-[#040D12] py-20">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Features
      </h2>
      <div className="flex flex-col gap-y-3 w-full my-4">
        <Circle />
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto">
              {feature.direction === "left" ? (
                <EventCard
                  heading={feature.title}
                  subheading={feature.description}
                  direction="left"
                />
              ) : (
                <div></div>
              )}
              <Pillar />
              {feature.direction === "right" ? (
                <EventCard
                  heading={feature.title}
                  subheading={feature.description}
                  direction="right"
                />
              ) : (
                <div></div>
              )}
            </div>
            {index < features.length - 1 && <Circle />}
          </React.Fragment>
        ))}
        <Circle />
      </div>
    </section>
  );
}
