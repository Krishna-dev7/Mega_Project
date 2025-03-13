"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { Camera, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import profileFormSchema from "@/schemas/profile.schema";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/store";

const SettingPage: React.FC = () => {
	const [isLoading, setisLoading] = useState(false);
  const user = useAppSelector(store => store.auth.data)

  type profileformValuesType = z.infer<typeof profileFormSchema>

  const form = useForm<profileformValuesType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: user?.email,
      name: user?.fullname,
      dob: user?.dob,
    }
  })


	return (
		<div className="space-y-6 mx-20 min-h-screen flex flex-col justify-center">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">
					Profile
				</h1>
				<p className="text-muted-foreground">
					Manage your profile information and how it appears
					to others.
				</p>
			</div>

			<Separator />

			{/* Profile picture section */}
			<Card>
				<CardHeader>
					<CardTitle>Profile Picture</CardTitle>
					<CardDescription>
						This is your public profile picture. It will be
						shown across the platform.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-6">
						<Avatar className="h-24 w-24">
							<AvatarImage
								src="/placeholder.svg"
								alt="Profile picture"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="flex flex-col gap-2">
							<Button
								variant="outline"
								size="sm"
								className="w-fit">
								<Camera className="mr-2 h-4 w-4" />
								Change picture
							</Button>
							<p className="text-xs text-muted-foreground">
								JPG, GIF or PNG. Max size 2MB.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Profile information form */}
			<Card>
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>
						Update your profile information and contact
						details.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form>
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Your name"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Your email"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This email will be used for
											notifications and account recovery.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bio</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												value={
													field.value
														? new Date(field.value)
																.toISOString()
																.split("T")[0]
														: ""
												}
											/>
										</FormControl>
										<FormDescription>
											Brief description for your profile.
											Max 160 characters.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
							<Button
								variant="outline"
								type="button">
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isLoading}>
								{isLoading ? "Saving..." : "Save changes"}
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default SettingPage;
