'use client'
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomAlert from '../CustomAlert';
import 'dotenv/config';

export default function Modal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(''); // State for OTP input
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isOtpVerification, setIsOtpVerification] = useState(false); // State for OTP stage
  const port = process.env.NEXT_PUBLIC_SERVER;

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleOtpChange = (event) => setOtp(event.target.value); // Handle OTP input

  const router = useRouter();

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOtpVerification) {
      // OTP verification stage
      try {
        const response = await fetch(`${port}/auth/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: localStorage.getItem('userId'), 
            otp: otp,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.message === "OTP verified successfully. Access granted!") {
            onClose();
            router.push('/PrepBot');
          } else {
            showAlert("Incorrect OTP, please try again.");
          }
        } else {
          showAlert(`Verification failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        showAlert('An error occurred during OTP verification.');
      }
    } else if (isSignUp) {
      // Sign-up stage
      if (password !== confirmPassword) {
        showAlert("Passwords do not match!");
        return;
      }
      try {
        const response = await fetch(`${port}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            fname: name,
            password1: password,
            password2: confirmPassword,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          if (data.id) {
            // Transition to OTP verification stage
            localStorage.setItem('userId', data.id);
            localStorage.setItem('credits', data.credits);
            showAlert("Registration successful! Please enter the OTP sent to your email.");
            setIsOtpVerification(true); // Move to OTP verification state
          } else {
            showAlert(data.message);
          }
        } else {
          showAlert(`Registration failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        showAlert('An error occurred during registration.');
      }
    } else {
      // Login stage
      try {
        const response = await fetch(`${port}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.id) {
            localStorage.setItem('userId', data.id);
            localStorage.setItem('credits', data.credits);
            onClose();
            router.push('/PrepBot');
          } else {
            showAlert(data.message);
          }
        } else {
          showAlert(`Login failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        showAlert('An error occurred during login.');
      }
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={closeAlert}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
        <div className="bg-gray-600 rounded-lg shadow-md p-6 w-full max-w-md mx-4 sm:mx-auto transform-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 text-white">
            {isOtpVerification ? 'Verify OTP' : isSignUp ? 'Sign Up' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit}>
            {isOtpVerification ? (
              // OTP Input Field
              <input
                type="text"
                className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mt-4"
                placeholder="Enter your OTP"
                value={otp}
                onChange={handleOtpChange}
              />
            ) : (
              <>
                <input
                  type="email"
                  className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {isSignUp && (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mt-4"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                  />
                )}
                <input
                  type="password"
                  className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mt-4"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {isSignUp && (
                  <input
                    type="password"
                    className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mt-4"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                )}
              </>
            )}
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md mt-4 transition duration-300 ease-in-out w-full"
              type="submit"
            >
              {isOtpVerification ? 'Verify OTP' : isSignUp ? 'Sign Up' : 'Login'}
            </button>
            {!isOtpVerification && (
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md mt-4 w-full"
                onClick={onClose}
              >
                Close
              </button>
            )}
          </form>
          {!isOtpVerification && (
            <p className="mt-4 text-center text-white">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="text-cyan-300 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
