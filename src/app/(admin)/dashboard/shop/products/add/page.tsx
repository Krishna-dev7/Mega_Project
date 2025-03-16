"use client";

import type React from "react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import productSchema from "@/schemas/product.schema";
import { Categories } from "@/models/product.models";
import Loading from "@/components/customUI/Loading";
import { log } from "console";
import storageService from "@/services/StorageService";
import productService from "@/services/productService";
import { useAppSelector } from "@/store/store";

export default function AddProductPage() {
	const router = useRouter();
	// images used to store image URLs
	const [images, setImages] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imageUploading, setImageUploading] =
		useState(false);

	const user = useAppSelector(store => store.auth.data)

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			slug: "",
			price: 0,
			countInStock: 0,
			description: "",
			category: "",
			owner: "",
			images: [],
		},
	});

	async function onSubmit(
		data: z.infer<typeof productSchema>,
	) {
		try {
			setIsSubmitting(true);
			
			const submitResult = await productService.createProduct(
				{
					...data,
					images,
					owner:((user?._id.toString() || "")) 
				}
			)

			submitResult.success 
				&& toast({
					title: 'success',
					description: 'Product added successfully'
				})

			console.log(submitResult.data);
			
		} catch (error: any) {
			toast(error.message 
				|| "Failed to add product.");

				toast({
					title: 'failure',
					description: error.message
				})
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isSubmitting) {
		return (
			<div
				className="loader w-full min-h-screen 
			flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	// function to remove images
	async function removeImage(imageIndex: number) {
		try {
			setImages((prev) =>
				prev.filter((_, index) => 
					index !== imageIndex),
			);
		} catch (err: any) {
			console.log(
				"Error occurred while removing images",
				err.message,
			);
		}
	}

	async function handleImageChange(
		event: ChangeEvent<HTMLInputElement>,
	): Promise<void> {
		try {
			setImageUploading(true);
			const files = event.target.files;
			console.log(files);
			if (!files?.length) return;

			const tempImages:Array<string> = [];
			// upload images
			for (let file of files) {
				let uploadedImage = await storageService.storeImage(
					{
						file,
						type: "product",
					},
				);

				let uploadedImageURL =
					await storageService.getImagePreview(
						"product",
						uploadedImage.$id,
					);

				tempImages.push(uploadedImageURL.href);
			}

			console.log("All your uploaded images URI: ", images);

			setImages(prev => [...prev, ...tempImages]);
		} catch (err: any) {
			console.log(
				"Error occurred at handleImageChange",
				err.message,
			);
		} finally {
			setImageUploading(false);
		}
	}

	return (
		<div className="container mx-auto py-10 dark">
			<Card className="max-w-2xl px-5 mx-auto">
				<CardHeader className="mb-5">
					<CardTitle className="text-lg">
						Add New Product
					</CardTitle>
					<CardDescription>
						Fill in the details to add a new product to your
						inventory.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 font-normal">
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input
												placeholder="product-name-123"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="countInStock"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Count In Stock</FormLabel>
											<FormControl>
												<Input
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Categories).map(
													(category) => (
														<SelectItem
															key={category}
															value={category}>
															{category}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												rows={4}
												placeholder="Describe your product..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Image Upload Section */}
							<div className="space-y-4 mt-2">
								<Label>Product Images</Label>
								<Input
									type="file"
									multiple
									accept="image/*"
									onChange={handleImageChange}
								/>
								<div className="mt-2 flex flex-wrap gap-2">
									{images.map((image, index) => (
										<div
											key={index.toString()}
											className="relative w-20 h-20">
											<img
												src={image}
												alt={`Product ${index}`}
												className="w-full h-full object-cover rounded-lg"
											/>
											<button
												type="button"
												className="absolute top-0 right-0 bg-red-500
												 text-white w-6 h-6 text-center flex items-center
												  justify-center text-lg font-semibold
												  rounded-full" 
												onClick={() => removeImage(index)}>
												x
											</button>
										</div>
									))}
								</div>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={isSubmitting || imageUploading}>
								{isSubmitting || imageUploading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{imageUploading
											? "saving images"
											: "saving...."}
									</>
								) : (
									"Add Product"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
