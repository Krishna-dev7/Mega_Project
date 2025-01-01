"use client";

import React, { useState } from "react";
import {
	User,
	Mail,
	Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Form,
	FormField,
	FormControl,
	FormMessage,
	FormItem,
	FormLabel,
} from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import signupSchema from "@/schemas/signup.schem";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import conf from "@/helpers/conf";
import ApiResponse from "@/types/ApiResponse";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

function Register() {
	const [isLoading, setIsLoading] =
		useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<
		z.infer<typeof signupSchema>
	>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
			fullname: "",
			role: "",
		},
	});

	const submitForm = async (
		data: z.infer<typeof signupSchema>,
	) => {
		try {
			setIsLoading(true);
			console.log(data);
			const res =
				await axios.postForm<ApiResponse>(
					`${conf.url}/api/signup`,
					JSON.stringify(data),
					{
						headers: {
							"Content-Type": "application/json",
						},
					},
				);

			if (!res.data.success) {
				toast({
					title: "Error",
					description:
						res.data.message ||
						"Something went wrong",
				});
				return;
			}

			toast({
				title: "Success",
				description: res.data.message,
			});

			router.push(
				`/verify?email=${encodeURIComponent(data.email)}`,
			);
			return null;
		} catch (error: any) {
			console.log(
				"error in signup form: ",
				error.message,
			);
			const axiosError =
				error as AxiosError<ApiResponse>;
			toast({
				title: "Error",
				variant: "destructive",
				description:
					axiosError.response?.data.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center w-full max-h-screen h-screen py-10 min-h-full lg:px-2 px-3 ">
			<Toaster />
			<div
				className="lg:z-10 md:z-0 sm:z-0 w-full text-sm max-w-lg lg:shadow-lg
      lg:py-5 lg:px-10 rounded-lg">
				<h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
					Signup
				</h2>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(
							submitForm,
						)}
						className="">
						{/* Username */}
						<FormField
							name="username"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel className="font-semibold text-sm text-gray-700">
										Username
									</FormLabel>
									<FormControl>
										<div className="relative">
											<User
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
												size={20}
											/>
											<Input
												{...field}
												placeholder="Enter your username"
												className="pl-10 py-2.5 text-base border-gray-800 focus:ring-2 focus:ring-gray-500  "
											/>
										</div>
									</FormControl>
									<FormMessage className="text-sm text-red-500" />
								</FormItem>
							)}
						/>

						{/* Full Name */}
						<FormField
							name="fullname"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel className="font-semibold text-sm text-gray-700">
										Full Name
									</FormLabel>
									<FormControl>
										<div className="relative">
											<User
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
												size={20}
											/>
											<Input
												{...field}
												placeholder="Enter your full name"
												className="pl-10 py-2.5 text-base border-gray-800 focus:ring-2 focus:ring-gray-500"
											/>
										</div>
									</FormControl>
									<FormMessage className="text-sm text-red-500" />
								</FormItem>
							)}
						/>

						{/* Email */}
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel className="font-semibold text-sm text-gray-700">
										Email
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Mail
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
												size={20}
											/>
											<Input
												{...field}
												placeholder="Enter your email"
												className="pl-10 py-2.5 text-base border-gray-800 focus:ring-2 focus:ring-gray-500"
											/>
										</div>
									</FormControl>
									<FormMessage className="text-sm text-red-500" />
								</FormItem>
							)}
						/>

						{/* Password */}
						<FormField
							name="password"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel className="font-semibold text-sm text-gray-700">
										Password
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Lock
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
												size={20}
											/>
											<Input
												{...field}
												type="password"
												placeholder="Enter your password"
												className="pl-10 py-2.5 text-base border-gray-800 focus:ring-2 focus:ring-gray-500"
											/>
										</div>
									</FormControl>
									<FormMessage className="text-sm text-red-500" />
								</FormItem>
							)}
						/>

						{/* User Role */}
						<FormField
							name="role"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel className="font-semibold text-sm text-gray-700">
										Role
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) =>
												field.onChange(value)
											}
											defaultValue={field.value}>
											<SelectTrigger className="w-full border-gray-800 pl-3 py-2.5 text-base">
												<SelectValue placeholder="Select Role" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="user">
													User
												</SelectItem>
												<SelectItem value="seller">
													Seller
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage className="text-sm text-red-500" />
								</FormItem>
							)}
						/>

						{/* Submit Button */}
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md tracking-wider py-6 transition-colors duration-300 ease-in-out text-sm">
							{isLoading
								? "Creating..."
								: "Create Account"}
						</Button>

						{/* Login Link */}
						<div className="text-center mt-4 pt-4 border-t border-gray-200">
							<Link
								className="text-gray-600 hover:text-gray-900 hover:underline text-base"
								href={`/signin`}>
								Already have an account? Return to
								Login
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default Register;
