"use client"
import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage: React.FC = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4 text-gray-600">
          Thank you for your payment. Your transaction was successful.
        </p>
        <button
          onClick={handleReturnHome}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
