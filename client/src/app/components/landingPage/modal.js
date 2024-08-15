'use client'
import * as React from 'react';
import { useState } from 'react';
import { db } from '@/app/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function Modal({ onClose }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleJoin = async (e) => {
   e.preventDefault()
    // Here you would handle the logic to submit the email to your backend
    if(email !== ""){
       await addDoc(collection(db, 'waitlist'),{
         email: email.trim()
       })

       await fetch('/api/emails', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           email: email.trim(),
         }),
       })
    }
    // for adding to the waitlist. For now, we'll just log it to the console.
    console.log('Email submitted:', email);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed bg-transparent inset-0 z-50 flex items-center justify-center ">
      <div className="bg-gray-600 rounded-lg shadow-md p-6 w-1/3 transform-shadow duration-300">
        <h2 className="text-xl font-bold mb-4">Join the Waitlist</h2>
        <p className="mb-4">Enter your email to be notified when Preppy launches:</p>
        <input
          type="email"
          className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md mt-4 transition duration-300 ease-in-out"
          onClick={handleJoin}
        >
          Join
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md mt-4 ml-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
