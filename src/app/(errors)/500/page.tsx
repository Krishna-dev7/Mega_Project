"use client"

export default function Custom500() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-thin text-gray-800 mb-4">500</h1>
        <p className="text-xl text-gray-600 mb-6">Server Error</p>
        <button 
          onClick={() => window.history.back()}
          className="text-sm text-gray-500 underline hover:text-gray-700 transition-colors"
        >
          Reload
        </button>
      </div>
    </div>
  )
} 