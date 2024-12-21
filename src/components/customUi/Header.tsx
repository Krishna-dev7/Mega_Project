"use client"
// React Header Component with TailwindCSS and Lucide React Icons
import React, { useState } from "react";
import {
	User,
	ShoppingCart,
	Search,
} from "lucide-react";
import navItems from "@/helpers/navConfig";
import Link from "next/link";

const Header: React.FC = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<>
			{/* Announcement Bar */}
			<div className="bg-black text-white text-center py-2 text-sm">
				Free Shipping On All Orders Above ₹5000
			</div>

			{/* Header Section */}
			<header className="sticky top-0 bg-white shadow-md z-50">
				<nav className="flex justify-between items-center px-6 py-4">
					{/* Logo */}
					<div className="text-xl font-bold text-gray-800">
						{/* <img
							className="w-10 h-10 mr-2 inline-block" 
							src="https://i.pinimg.com/736x/eb/7a/da/eb7ada7af9d3a6e34783b9bf69fa639a.jpg"
						  alt="LOGO" /> */}
						NOVA.
					</div>


					{/* Navigation Links */}
					<ul
						className={`lg:flex lg:space-x-8 absolute lg:static text-black
							 bg-white w-full h-fit left-0 top-16 lg:top-auto lg:w-auto
							  transition-transform transform ${isNavOpen ? "translate-x-0 h-screen" : "-translate-x-full"}
								 lg:translate-x-0 shadow-lg lg:shadow-none py-4 lg:py-0`}>

						{navItems.map((item, index) => (
							<li
								className=" text-center px-6 py-2 hover: text-gray-700"
								 key={index} >
								<Link href={item.href} >
									{item.slug}
								</Link>
							</li>
						))}
					</ul>


					{/* Icons Section */}
					<div className="flex items-center space-x-6">
						<a href="#search" className="text-gray-800 hover:text-gray-600">
							<Search className="w-6 h-6" />
						</a>
						<a href="#account" className="text-gray-800 hover:text-gray-600">
							<User className="w-6 h-6" />
						</a>
						<div className="relative text-gray-800 hover:text-gray-600">
							<a href="#cart">
								<ShoppingCart className="w-6 h-6" />
								<span className="absolute -top-2 -right-2 bg-red-500
								 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									0
								</span>
							</a>
						</div>
					</div>


					{/* Hamburger Menu */}
					<button
						className="lg:hidden flex flex-col space-y-1.5 focus:outline-none"
						onClick={toggleNav}>
						<span className="block w-6 h-0.5 bg-gray-800"></span>
						<span className="block w-6 h-0.5 bg-gray-800"></span>
						<span className="block w-6 h-0.5 bg-gray-800"></span>
					</button>

				</nav>
			</header>
		</>
	);
};

export default Header;
