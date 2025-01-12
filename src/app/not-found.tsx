"use client"

import Link from 'next/link'
import img from "../../public/boy2.png";
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen dark:bg-[#121212] w-screen dark:text-gray-400  
    flex items-center justify-center">
      <div className="text-center">

        <Image 
          className='w-36 h-36 mx-auto  sm:w-72 sm:h-72 lg:w-72 
            rounded-full object-cover object-center'
          
          src={img} 
          alt="cuteBoy" />
        <h1 className="text-6xl font-thin mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}