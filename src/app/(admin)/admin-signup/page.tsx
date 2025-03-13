'use client';

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import signupSchema from "@/schemas/signup.schem";
import accountService from "@/services/AccountService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AdminSignup: React.FC = () => {
	const [showPassword, setShowPassword] = useState(true);
	const [loading, setLoading] = useState(false);
	const router = useRouter()
	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
			fullname: "",
			role: "admin",
		},
	});

	const submitForm = async (
		data: z.infer<typeof signupSchema>,
	) => {
		try {
			setLoading(true);
			const res = await accountService
        .createAccount(data);

			console.log(' I am called');
			

			res.success &&
				toast({
					title: "Success",
					description: res.message 
            || "Login successfully",
				});

			router.push("/verify")

			setLoading(false);
		} catch (err: any) {
			console.log("Admin signup failure" 
        + err.message);

			toast({
				title: "Failure",
				description: err.message 
          || "Signup failed",
			});
		}
	};

	return (
		<div
			className=" bg-[#F5EFFF] sm:text-sm text-pretty flex 
      text-black flex-col items-center justify-center h-screen py-4
			gap-1">

			<div className="back-btn absolute top-10 left-10">
				<Button
					onClick={() => router.push("/")}
					variant={'ghost'}
					className="bg-black text-white hover:bg-black"	
					>
					<ChevronLeft />
					Back
				</Button>
			</div>

			<div
				className="w-full max-w-md border border-gray-400 p-8
				 lg:shadow-md mx-auto rounded-lg">
				<h2
					className="text-2xl font-semibold text-center
          text-gray-800 mb-6">
					Welcome Admin  👋
				</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitForm)}>

						{/* username */}
						<FormField 
							name="username"
							render={({field}) => (
								<FormItem className="mt-3">
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input 
											placeholder="Nicky"
											{...field}
											/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>

						{/* fullname */}
						<FormField 
							name="fullname"
							render={({field}) => {								
								return <FormItem className="mt-3">
									<FormLabel>FullName</FormLabel>
									<FormControl>
										<Input 
											type="text"
											placeholder="John Doe"
											{...field}
											/>
									</FormControl>
									<FormMessage />
								</FormItem>
							}}
						/>

						{/* email  */}
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem className="mt-3">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="border border-black"
											placeholder="demo@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password field  */}
						<FormField
							name="password"
							render={({ field }) => (
                <FormItem className="mt-3">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												{...field}
												className="borderborder-black"
												type={
													showPassword ? "text" : "password"
												}
												placeholder="Enter your password"
												required
											/>
											<button
												type="button"
												onClick={() =>
													setShowPassword(!showPassword)
												}
												className="absolute right-3 top-2.5 text-gray-500 
												hover:text-gray-700">
													{showPassword 
														?	(<EyeOff size={20} />) 
														: (<Eye size={20} />)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>



						{/* Forgot Password */}
						{/* <div className="text-right mt-3">
							<Link href={`${conf.url}/forgotPassword`}>
								Forgot your password ?
							</Link>
						</div> */}

						{/* Submit Button */}
						<Button
							type="submit"
							disabled={loading}
							className="w-full border border-gray-400 
              bg-black text-white hover:bg-black mt-6 py-6">
							{loading ? "Signing up..." : "Create Account"}
						</Button>
					</form>
				</Form>

				{/* Create Account */}
				<div className="mt-6 text-center border-t border-gray-200 pt-4">
					<p className="text-sm text-gray-600">
						Old customer?
					</p>
					<Link
						href={`/admin-signin`}
						className="text-sm text-pretty flex items-center justify-center
						 py-5 font-semibold text-gray-800 hover:underline">
						Login here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminSignup;
