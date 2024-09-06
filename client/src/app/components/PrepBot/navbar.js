import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiMagicPalm } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("interviewId");
    localStorage.removeItem("conversationHistory");
    router.push("/");
  };

  const home = () => {
    router.push("/");
  };

  const getCredits = () => {
    const storedCredits = localStorage.getItem("credits");
    if (storedCredits) {
      setCredits(parseInt(storedCredits));
    }
  };

  useEffect(() => {
    getCredits();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <>
      <nav className="bg-[#010305] bg-opacity-90 sticky top-0 z-50">
        <div className="max-md-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span
                  onClick={home}
                  className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 hover:cursor-pointer"
                >
                  PREPPYY
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <h3 className="text-xl text-yellow-100 flex items-center gap-2">
                  <GiMagicPalm className="text-4xl text-yellow-300" />
                  Welcome!
                </h3>
                <h4 className="text-xl text-white">Credits: {credits}</h4>
                <button
                  onClick={openModal}
                  className="text-white font-medium p-3 rounded-md capitalize hover:bg-cyan-500 hover:text-black transition duration-300 ease-in-out cursor-pointer"
                >
                  Get More Credits
                </button>
                <a
                  onClick={handleLogout}
                  className="text-white font-medium p-3 rounded-md capitalize hover:bg-cyan-500 hover:text-black transition duration-300 ease-in-out cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Choose a Plan
            </h2>
            <div className="space-y-4">
              {/* Basic Plan */}
              <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">
                  Get 25 Credits for $8
                </h3>
                <p className="text-gray-600 mb-4">(Basic Plan)</p>
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full">
                  Select Basic Plan
                </button>
              </div>

              {/* Unlimited Plan */}
              <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">
                  $20 for Unlimited Credits
                </h3>
                <p className="text-gray-600 mb-4">for one month</p>
                <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out w-full">
                  Select Unlimited Plan
                </button>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out mt-6 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
