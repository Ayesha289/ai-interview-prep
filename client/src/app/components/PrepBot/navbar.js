import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiMagicPalm } from "react-icons/gi";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('interviewId');
        localStorage.removeItem('conversationHistory')
        router.push('/');
    };

    const home = () => {
        router.push('/');
    };

    return(
        <nav className='bg-[#010305] bg-opacity-90 sticky top-0 z-50'>
            <div className='max-md-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <span onClick={home} className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 hover:cursor-pointer">
                            PREPPYY
                          </span>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center space-x-4'>
                            <h3 className='text-xl text-yellow-100 flex items-center gap-2'><GiMagicPalm className='text-4xl text-yellow-300' />Welcome!</h3>
                            <a onClick={handleLogout} className='text-white font-medium p-3 rounded-md capitalize hover:bg-cyan-500 hover:text-black transition duration-300 ease-in-out cursor-pointer'>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}