"use client";

import React, {
	useState,
} from "react";
import {
	User,
	ShoppingCart,
	Search,
} from "lucide-react";
import navItems from "@/helpers/navConfig";
import Link from "next/link";

const Header: React.FC =
	() => {
		const [
			isNavOpen,
			setIsNavOpen,
		] = useState(false);

		const toggleNav = () => {
			setIsNavOpen(
				!isNavOpen,
			);
		};

		return (
			<>
				{/* Announcement Bar */}
				<div className="bg-gray-900 text-white text-center py-2 text-xs">
					Free Shipping on
					Orders Above ₹5000
				</div>

				{/* Header Section */}
				<header className="sticky top-0 mb-0 bg-neutral-50 justify-center flex items-center shadow-sm z-50">
					<nav className="flex justify-between w-full transition-all ease-in-out duration-100 lg:w-2/3 items-center px-6 py-4">
						{/* Logo */}
						<div className="text-xl font-semibold text-gray-900">
							NOVA.
						</div>

						{/* Navigation Links */}
						<ul
							className={`lg:flex lg:justify-center absolute lg:static text-gray-900 w-full lg:w-2/3 
						left-0 top-16 lg:top-auto transition-transform transform ${
							isNavOpen
								? "translate-x-0"
								: "-translate-x-full"
						} lg:translate-x-0 shadow-md lg:shadow-none py-4 lg:py-0`}>
							{navItems.map(
								(
									item,
									index,
								) => (
									<li
										key={
											index
										}
										className="text-center text-md text-pretty p-1 sm:px-6 sm:py-2 hover:text-gray-600">
										<Link
											href={
												item.href
											}>
											{ item.slug }
										</Link>
									</li>
								),
							)}
						</ul>

						{/* Icons Section */}
						<div className="flex items-center space-x-4">
							<a
								href="#search"
								className="text-gray-900 hover:text-gray-700">
								<Search className="w-5 h-5" />
							</a>
							<a
								href="#account"
								className="text-gray-900 hover:text-gray-700">
								<User className="w-5 h-5" />
							</a>
							<div className="relative text-gray-900 hover:text-gray-700">
								<a href="#cart">
									<ShoppingCart className="w-5 h-5" />
									<span
										className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
										rounded-full w-4 h-4 flex items-center justify-center">
											0
									</span>
								</a>
							</div>
						</div>

						{/* Hamburger Menu */}
						<button
							className="lg:hidden focus:outline-none"
							onClick={
								toggleNav
							}>
							<span className="block w-6 h-0.5 bg-gray-900 mb-1"></span>
							<span className="block w-6 h-0.5 bg-gray-900 mb-1"></span>
							<span className="block w-6 h-0.5 bg-gray-900"></span>
						</button>
					</nav>
				</header>
			</>
		);
	};

export default Header;
