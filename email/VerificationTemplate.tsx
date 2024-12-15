import React from "react";

type props = {
  otp: string,
  username: string
}

const VerificationTemplate:React.FC<props> = ({ otp, username }) => {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-8 rounded-lg shadow-xl max-w-md mx-auto font-serif">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide">Royal E-Shop</h1>
        <p className="text-sm italic text-gray-300">Your Trusted Shopping Companion</p>
      </header>
      <main className="bg-white rounded-lg p-6 shadow-md text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Hello, {username}!
        </h2>
        <p className="text-lg text-center mb-6">
          We're excited to have you onboard. To verify your email address, use the OTP below:
        </p>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-2xl font-bold rounded-full py-3 px-8 text-center shadow-md mx-auto">
          {otp}
        </div>
        <p className="text-sm text-center mt-6">
          This OTP will expire in 10 minutes. Please do not share this code with anyone.
        </p>
      </main>
      <footer className="mt-6 text-center text-gray-300 text-sm">
        <p>Need help? Contact our support team at support@royaleshop.com</p>
        <p className="mt-2">© {new Date().getFullYear()} Royal E-Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VerificationTemplate;
