import * as react from 'react';
import Image from 'next/image';

export default function Navbar() {
    return(
        <nav className='bg-black'>
            <div className='max-md-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <a href='/' className='text-white font-extrabold'>PREPBOT</a>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center space-x-4'>
                            <a href='/' className='text-white font-medium p-3 rounded-md hover:bg-lime-600 hover:text-black transition duration-300 ease-in-out'>Waitlist now!</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}