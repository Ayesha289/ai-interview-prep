/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Back Button */}
      <div className="self-start mt-4 ml-4">
        <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300">
          <span className="material-icons">arrow_back</span>
          <span>Back to Waitlist</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold">Explore our App</h1>
        <p className="text-lg mt-4">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">Preppy</span>, your
          own interview app.
        </p>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Interview preparations just got easier! With our app you can get a 
          mock interview based on the job title and experience level of your choice, 
          getting you ready for the big day.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full max-w-5xl">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Personalized Itineraries</h3>
          <p className="mt-4 text-sm">
            Preppy's AI-driven tool creates customized daily plans based on your
            preferences, interests, and budget. From must-see attractions to
            hidden gems, your travel itinerary will be tailored just for you.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Real-Time Data Integration</h3>
          <p className="mt-4 text-sm">
            Access up-to-date information on attractions, activities,
            restaurants, and accommodations through integrated APIs. Stay
            informed about current offerings and availability.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Optimized Travel Experience</h3>
          <p className="mt-4 text-sm">
            Prioritize your activities and destinations based on your interests
            and budget. Rahi optimizes your itinerary for a seamless travel
            experience, ensuring you make the most of your time.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">
            Accommodation Recommendations
          </h3>
          <p className="mt-4 text-sm">
            Receive suggestions for hotels and other accommodations near your
            planned activities. Compare options and book your stay with ease,
            all within the app.
          </p>
        </div>
      </div>
    </div>
  );
}
