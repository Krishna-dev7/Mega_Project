"use client";
import conf from "@/helpers/conf";
import { UserSchema } from "@/models/user.models";
import accountService from "@/services/AccountService";
import { useAppSelector } from "@/store/store";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";

type props = {
	account?: UserSchema | null;
};

const Profile: React.FC<props> = ({ account }) => {
	const auth = useAppSelector((store) => {
		console.log("store: ", store);
		return store.auth;
	});

	return (
		<div className="w-full my-1 sm:my-5 flex-grow text-black dark:text-white">
			{/* Avatar & User Info */}
			<div className="avatarSec flex items-center text-pretty">
				<Avatar className="flex-shrink-0 mr-4">
					<AvatarImage
						className="w-14 h-14 aspect-square rounded-full"
						src={account?.avatar}
					/>
					<AvatarFallback>AV</AvatarFallback>
				</Avatar>

				<div>
					<h2 className="sm:text-lg mb-1 text-sm font-semibold">
						{auth.authStatus ? auth.username : "Panda bhai"}
					</h2>

					<p className="text-ellipsis text-yellow-600 dark:text-yellow-300 text-xs overflow-hidden line-clamp-1">
						{auth.data ? auth.data.email : "panda@gmail.com"}
					</p>
				</div>
			</div>

			{/* Link Section */}
			<div
				className="linkSec flex flex-col gap-4 mt-10 pb-10 w-full border-b border-gray-300 dark:border-gray-700 text-sm sm:text-sm text-pretty text-gray-800 dark:text-gray-200 capitalize"
			>
				{auth.authStatus ? (
					<>
						<Link href={`${conf.url}/profile`} className="hover:text-blue-600 dark:hover:text-blue-400">
							Profile
						</Link>
						<Link href={`${conf.url}/api/profile/profileId`} className="hover:text-blue-600 dark:hover:text-blue-400">
							Wishlist
						</Link>
						<Link href={`${conf.url}/api/profile/profileId`} className="hover:text-blue-600 dark:hover:text-blue-400">
							Orders
						</Link>
						<Link href={`${conf.url}/api/profile/profileId`} className="hover:text-blue-600 dark:hover:text-blue-400">
							History
						</Link>
						<button
							className="text-start capitalize text-red-600 dark:text-red-400 hover:underline"
							onClick={accountService.logout}
						>
							Logout
						</button>
					</>
				) : (
					<Link href={`${conf.url}/signup`} className="hover:text-blue-600 dark:hover:text-blue-400">
						Signup
					</Link>
				)}
			</div>

			{/* Secondary Section */}
			<div className="profileSec flex flex-col gap-4 text-sm text-gray-800 dark:text-gray-300 mt-5 text-pretty">
				<Link href={`${conf.url}/api/profile/profileId`} className="hover:text-blue-600 dark:hover:text-blue-400">
					Payment
				</Link>
				<Link href={`${conf.url}/api/profile/profileId`} className="hover:text-blue-600 dark:hover:text-blue-400">
					Issue
				</Link>
			</div>
		</div>
	);
};

export default Profile;
