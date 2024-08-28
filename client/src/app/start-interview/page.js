'use client'
import React, { useState } from 'react';

const StartInterview = () => {
  const [jobType, setJobType] = useState('');
  const [industry, setIndustry] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ jobType, industry, jobLevel, requirements });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6">Start New Interview</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobType">Job Type</label>
          <select 
            id="jobType" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={jobType} 
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="industry">Industry</label>
          <input 
            type="text" 
            id="industry" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={industry} 
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="jobLevel">Job Level</label>
          <select 
            id="jobLevel" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={jobLevel} 
            onChange={(e) => setJobLevel(e.target.value)}
            required
          >
            <option value="">Select Job Level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="requirements">Requirements</label>
          <textarea 
            id="requirements" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={requirements} 
            onChange={(e) => setRequirements(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start Interview
        </button>
      </form>
    </div>
  );
};

export default StartInterview;
