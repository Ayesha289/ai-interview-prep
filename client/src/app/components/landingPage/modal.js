'use client'
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:5000/auth/register', {
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
          if (data.id){
            localStorage.setItem('userId', data.id);
            localStorage.setItem('credits', data.credits);
            alert(data.message)
            onClose()
            router.push('/PrepBot');
          }
          else
            alert(data.message)
        } else {
          alert(`Registration failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred during registration.');
      }
    } else {
      try {
        const response = await fetch('http://127.0.0.1:5000/auth/login', {
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
          if(data.id){
          localStorage.setItem('userId', data.id);
          localStorage.setItem('credits', data.credits);
          onClose()
          alert(data.message);
          router.push('/PrepBot');
        }else{
          alert(data.message)
        }
        } else {
          alert(`Login failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred during login.');
      }
    }
  };

  const handleForgotPassword = () => {
    router.push('/forget-password');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="bg-gray-600 rounded-lg shadow-md p-6 w-full max-w-md mx-4 sm:mx-auto transform-shadow duration-300">
        <h2 className="text-xl font-bold mb-4 text-white">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
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
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md mt-4 transition duration-300 ease-in-out w-full"
            type="submit"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md mt-4 w-full"
            onClick={onClose}
          >
            Close
          </button>
        </form>
  
        {!isSignUp && (
          <div className="mt-4 text-center">
            <button
              onClick={handleForgotPassword}
              className="text-cyan-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}
  
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
      </div>
    </div>
  );
  
}
