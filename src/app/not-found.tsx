"use client"

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <img
            className='max-w-sm sm:w-40 lg:w-52'
           src="https://i.pinimg.com/736x/c8/09/6b/c8096b93bed9f46ffe4fbc999dca4e22.jpg" 
           alt="" 
           />
        <h1 className="text-6xl font-thin text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
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