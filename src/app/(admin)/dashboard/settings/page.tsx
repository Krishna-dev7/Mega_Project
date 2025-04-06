"use client"

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { Camera } from "lucide-react";
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
import storageService from "@/services/StorageService";
import accountService from "@/services/AccountService";
import { toast } from "@/hooks/use-toast";

const SettingPage: React.FC = () => {
	const [isLoading, setisLoading] = useState(false);
  const user = useAppSelector(store => store.auth.data)
	const [file, setFile] = useState<File | undefined>();
	const [imageURL, setImageURL] = useState(user?.avatar);

	useEffect(() => {

		const getImage = async () => {
			if(!file) return;

			const image = await storageService.storeImage({
				type: 'avatar',
				file
			})

			console.log(image);
			const imagePreview = await storageService
				.getImagePreview('avatar', image.$id)
			setImageURL(imagePreview)
		}

		getImage()
	}, [file])


  type profileformValuesType = 
		z.infer<typeof profileFormSchema>

  const form = useForm<profileformValuesType>({
	resolver: zodResolver(profileFormSchema),
	defaultValues: {
	  email: user?.email ?? "",
	  name: user?.fullname ?? "",
	  dob: user?.dob 
			? new Date(user.dob).toISOString().split("T")[0] 
			: new Date().toISOString().split("T")[0]
	}
  })

	useEffect(() => {
		form.reset({
			email: user?.email,
	  name: user?.fullname,
	  dob: user?.dob 
			? new Date(user.dob).toISOString().split("T")[0] 
			: new Date().toISOString().split("T")[0]
		})
	}, [user, form])
   


	const submitForm = async (data: profileformValuesType) => {
		try {
			setisLoading(true)

			if(!user) return

			const res = await accountService.updateUser(
				user._id.toString(), {
				email: data.email,
				fullname: data.name,
				dob: new Date(data.dob),
				avatar: imageURL ?? user?.avatar
			})

			console.log("Update user response: ", res);
			res.success &&
				toast({
					title: "Success",
					description: res.message
				})
			
		} catch (err:any) {
			console.log("Error occurred at submitForm",
				 err.message);
			
		} finally {
			setisLoading(false)
		}
	}


	const handleDOB = (
		e:React.ChangeEvent<HTMLInputElement>
	) => {
		const date = new Date(e.target.value);
		console.log(date.toISOString().split("T")[0]);
		form.setValue("dob", date.toISOString().split("T")[0])
	}

	return (
		<div className="space-y-6 px-4 sm:px-6 md:px-10 py-6 min-h-screen flex flex-col">
			<div>
				<h1 className="text-xl sm:text-2xl font-bold tracking-tight">
					Profile
				</h1>
				<p className="text-sm sm:text-base text-muted-foreground">
					Manage your profile information and how it appears to others.
				</p>
			</div>
	
			<Separator />
	
			{/* Profile Picture Section */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base sm:text-lg">Profile Picture</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						This is your public profile picture. It will be shown across the platform.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
						<Avatar className="h-24 w-24">
							<AvatarImage src={imageURL ?? user?.avatar} alt="Profile picture" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="flex flex-col gap-2 w-full sm:w-auto">
							<Button
								variant="outline"
								size="sm"
								onClick={() => document.getElementById('avatar')?.click()}
								className="w-full sm:w-fit"
							>
								<Camera className="mr-2 h-4 w-4" />
								Change picture
							</Button>
	
							<Input
								type="file"
								name="avatar"
								id="avatar"
								accept="image/*"
								className="hidden"
								multiple={false}
								onChange={(e) => setFile(e.target.files?.[0])}
							/>
	
							<p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
						</div>
					</div>
				</CardContent>
			</Card>
	
			{/* Profile Info Form */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base sm:text-lg">Profile Information</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						Update your profile information and contact details.
					</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitForm)}>
						<CardContent className="space-y-6">
							{/* Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Your name" {...field} />
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
	
							{/* Email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Your email" {...field} />
										</FormControl>
										<FormDescription>
											This email will be used for notifications and account recovery.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
	
							{/* DOB */}
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem className="mt-3">
										<FormLabel>Date Of Birth</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												onChange={(e) => handleDOB(e)}
											/>
										</FormControl>
										<FormDescription>
											Select your date of birth.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4">
							<Button
								onClick={() =>
									form.reset({
										name: user?.fullname,
										email: user?.email,
										dob: user?.dob
											? new Date(user.dob).toLocaleDateString()
											: new Date().toLocaleDateString(),
									})
								}
								variant="outline"
								type="button"
								className="w-full sm:w-auto"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isLoading}
								className="w-full sm:w-auto"
							>
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