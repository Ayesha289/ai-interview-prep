import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



export default function Navbar() {
    const router = useRouter();

    const viewAllInterviews = () => {
        // Logic to view all interviews
        router.push('/your-interviews');
    };

    return(
        <nav className='bg-[#06121c] rounded-lg sticky top-0 z-50'>
            <div className='max-md-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <span className="text-4xl font-extrabold text-transparent font-mono bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500">
                            PREPPYY
                          </span>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center space-x-4'>
                            <h3 className='text-xl'>Welcome back, Favour</h3> {/*this should be the name of the logged in user from the database*/}
                            <a onClick={viewAllInterviews} className='text-white cursor-pointer font-medium p-3 rounded-md capitalize hover:bg-cyan-500 hover:text-black transition duration-300 ease-in-out'>all interviews</a>
                            <a href='/' className='text-white font-medium p-3 rounded-md capitalize hover:bg-cyan-500 hover:text-black transition duration-300 ease-in-out'>logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}