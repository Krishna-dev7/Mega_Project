"use client"

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center">
        <img
            className='w-42 h-42 sm:w-72 lg:w-72  rounded-full object-cover object-center'
           src="https://i.pinimg.com/736x/dc/eb/93/dceb939dec86bc011a1159bace7d2b99.jpg"
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