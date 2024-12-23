import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiMagicPalm } from "react-icons/gi";
import { useState, useEffect } from "react";
import 'dotenv/config';

export default function Navbar() {
  const port = process.env.NEXT_PUBLIC_SERVER;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("interviewId");
    localStorage.removeItem("conversationHistory");
    localStorage.removeItem("credits");
    router.push("/");
  };

  const home = () => {
    router.push("/");
  };

  const getCredits = () => {
    const storedCredits = localStorage.getItem("credits");
    if (storedCredits) {
      setCredits(storedCredits);
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
    setShowReferralInput(false);
    setPromoError(false);
    setPromoSuccess(false);
    setPromoCode("");
  };

  const applyPromoCode = async () => {
    try {
      const user_id = localStorage.getItem('userId');
      const response = await fetch(`${port}/api/apply_promo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promo_code: promoCode, user_id: user_id }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Promo applied successfully!") {
        localStorage.setItem("credits", "Unlimited");
        setPromoError(false);
        setPromoSuccess(true);
        window.location.reload();
      } else {
        setPromoError(true);
        setPromoSuccess(false);
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      setPromoError(true);
      setPromoSuccess(false);
    }
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-[#1e1e1e] p-6 rounded-lg z-10 max-w-md mx-auto shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Choose a Plan
            </h2>
            <div className="space-y-4">
              {/* Basic Plan */}
              <div className="p-4 border border-gray-600 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Get 20 Credits for $8</h3>
                <p className="text-gray-400 mb-4">Perfect for occasional users or a one-time boost in your credits.</p>
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full"
                  onClick={() => window.location.href = "https://rzp.io/i/54uLAk28G"}
                >
                  Buy Credits
                </button>
              </div>

              {/* Unlimited Plan */}
              <div className="p-4 border border-gray-600 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">Get 80 Credits for $25</h3>
                <p className="text-gray-400 mb-4">Ideal for frequent users who need a substantial amount of credits.</p>
                <button 
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out w-full"
                  onClick={() => window.location.href = "https://rzp.io/i/E3AHU7N"}
                >
                  Buy Credits
                </button>
              </div>

              {/* Have a referral code? */}
              <div>
                <button
                  onClick={() => setShowReferralInput(true)}
                  className="no-underline hover:text-gray-200"
                >
                  Have a referral code?
                </button>

                {showReferralInput && (
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className={`p-2 border rounded-md flex-grow bg-gray-700 text-white ${promoError ? 'border-red-500' : 'border-gray-600'}`}
                      style={{ height: '42px' }} // Ensuring consistent height
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                      style={{ height: '42px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Ensuring consistent height and centering
                    >
                      Apply
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-red-500 text-sm mt-2">
                    Promo code is not valid
                  </p>
                )}

                {promoSuccess && (
                  <p className="text-green-500 text-sm mt-2">
                    Promo code applied successfully!
                  </p>
                )}
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
