"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Footer from '../components/landingPage/footer';
import CustomAlert from '../components/CustomAlert';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const router = useRouter();
    const token = searchParams.get('token');

    const showAlert = (message) => {
        setAlertMessage(message);
        setIsAlertVisible(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (token) {
            try {
                const response = await fetch(`https://ai-interview-sage.vercel.app/auth/password_reset_verified/${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: password }),
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert(data.message);
                    router.push('/');

                } else {
                    showAlert(`Error: ${data.message}`);
                }
            } catch (error) {
                showAlert('An error occurred while resetting the password.');
            }
        } else {
            showAlert('Invalid URL');
            router.push('/');
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
            <div className="min-h-screen flex flex-col bg-gray-900">
                <nav className="bg-black bg-opacity-80 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
                                        PREPPYY
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="flex-grow flex flex-col items-center justify-center py-8">
                    <h1 className="text-2xl font-bold mb-4 text-white">Reset Password</h1>
                    <form onSubmit={handleResetPassword} className="flex flex-col items-center w-full max-w-md">
                        <input
                            type="password"
                            className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-cyan-500 mb-4"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        >
                            Reset Password
                        </button>
                    </form>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ResetPassword;
