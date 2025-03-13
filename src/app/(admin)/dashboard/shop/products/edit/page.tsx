"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
	useRouter,
	useSearchParams,
} from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImagePlus, Loader2 } from "lucide-react";

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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store/store";
import { IProduct } from "@/models/product.models";

const formSchema = z.object({
	slug: z
		.string()
		.min(3, {
			message: "Slug must be at least 3 characters.",
		})
		.max(50),
	price: z.coerce.number().positive({
		message: "Price must be a positive number.",
	}),
	countInStock: z.coerce.number().int().nonnegative({
		message:
			"Count in stock must be a non-negative integer.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	category: z.string({
		required_error: "Please select a category.",
	}),
	owner: z.string().min(2, {
		message: "Owner name must be at least 2 characters.",
	}),
	discount: z.coerce
		.number()
		.min(0, {
			message: "Discount must be a non-negative number.",
		})
		.max(100, {
			message: "Discount cannot exceed 100%.",
		}),
});

const categories = [
	"Electronics",
	"Clothing",
	"Home & Garden",
	"Books",
	"Toys",
	"Sports",
	"Beauty",
	"Health",
	"Automotive",
	"Other",
];

// Mock product data - in a real app, you would fetch this from your API
const mockProduct = {
	id: "1",
	slug: "sample-product",
	price: 99.99,
	countInStock: 25,
	description:
		"This is a sample product description that is longer than 10 characters.",
	category: "Electronics",
	owner: "John Doe",
	discount: 10,
	images: [
		// In a real app, these would be URLs to your stored images
		"/placeholder.svg?height=200&width=200",
		"/placeholder.svg?height=200&width=200",
	],
};

type ProductImage = {
	id?: string;
	url: string;
	file?: File;
	isNew?: boolean;
};

export default function EditProductPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [productImages, setProductImages] = useState<
		ProductImage[]
	>([]);
	const params = useSearchParams();
	const productId = params.get("productId");
	const product = useAppSelector((store) =>
		store.product.products.find(
			(product) => product._id.toString() == productId,
		),
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slug: "",
			price: 0,
			countInStock: 0,
			description: "",
			category: "",
			owner: "",
			discount: 0,
		},
	});

	// Fetch product data
	useEffect(() => {
		// In a real app, you would fetch the product data from your API
		// For example: fetch(`/api/products/${productId}`)

		// Simulate API call with mock data
		if (!product) return;

		setTimeout(() => {
			form.reset({
				slug: product?.slug,
				price: product?.price,
				countInStock: product.countInStock,
				description: product.description,
				category: product.category,
				owner: product.owner?.toString(),
				discount: product.discount,
			});

			// Set initial images
			setProductImages(
				mockProduct.images.map((url, index) => ({
					id: `existing-${index}`,
					url,
					isNew: false,
				})),
			);

			setIsLoading(false);
		}, 1000);
	}, [product]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);

		// Here you would typically handle the form submission
		// including uploading any new images to your backend
		console.log("Form values:", values);
		console.log("Images:", productImages);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);

			// Show success toast
			toast({
				title: "Product Updated",
				description:
					"Your product has been successfully updated.",
				variant: "default",
			});

			// In a real app, you might redirect to the product page
			// router.push(`/products/${values.slug}`)
		}, 1500);
	}

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files) {
			const fileArray = Array.from(e.target.files);
			const newImages: ProductImage[] = fileArray.map(
				(file) => ({
					url: URL.createObjectURL(file),
					file,
					isNew: true,
				}),
			);

			setProductImages((prev) => [...prev, ...newImages]);
		}
	};

	const removeImage = (index: number) => {
		setProductImages((prev) =>
			prev.filter((_, i) => i !== index),
		);
	};

	if (isLoading) {
		return (
			<div className="container mx-auto py-10 flex items-center
       justify-center min-h-[400px] dark">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>Edit Product</CardTitle>
					<CardDescription>
						Update your product information
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6">
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
										<FormDescription>
											This will be used in the product URL.
										</FormDescription>
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
													type="number"
													step="0.01"
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
													type="number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
													{categories.map((category) => (
														<SelectItem
															key={category}
															value={category}>
															{category}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="discount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Discount (%)</FormLabel>
											<FormControl>
												<Input
													type="number"
													min="0"
													max="100"
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
								name="owner"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Owner</FormLabel>
										<FormControl>
											<Input
												placeholder="Product owner name"
												{...field}
											/>
										</FormControl>
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
												placeholder="Describe your product..."
												className="min-h-[120px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div>
								<Label htmlFor="images">
									Product Images
								</Label>
								<div className="mt-2">
									<div className="flex items-center justify-center w-full">
										<label
											htmlFor="images"
											className="flex flex-col items-center justify-center 
                        w-full h-32 border-2 border-dashed rounded-lg cursor-pointer
                      bg-gray-50 hover:bg-gray-100 dark:border-gray-600
                      dark:hover:border-gray-500">
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<ImagePlus className="w-8 h-8 mb-3 text-gray-500" />
												<p className="mb-2 text-sm text-gray-500">
													<span className="font-semibold">
														Click to upload
													</span>{" "}
													or drag and drop
												</p>
												<p className="text-xs text-gray-500">
													PNG, JPG, GIF up to 10MB
												</p>
											</div>
											<Input
												id="images"
												type="file"
												multiple
												accept="image/*"
												className="hidden"
												onChange={handleImageChange}
											/>
										</label>
									</div>
								</div>

								{productImages.length > 0 && (
									<div className="mt-4 grid grid-cols-2 sm:grid-cols-3 
                    md:grid-cols-4 gap-4">
										{productImages.map((image, index) => (
											<div
												key={index}
												className="relative group">
												<div className="aspect-square rounded-md 
                        overflow-hidden bg-gray-100 border">
													<img
														src={
															image.url ||
															"/placeholder.svg"
														}
														alt={`Product image ${index + 1}`}
														className="w-full h-full object-cover"
													/>
													{image.isNew && (
														<div className="absolute top-1 left-1 bg-blue-500
                             text-white text-xs px-1 rounded">
															New
														</div>
													)}
												</div>
												<button
													type="button"
													onClick={() => removeImage(index)}
													className="absolute top-1 right-1 bg-red-500 text-white
                           rounded-full w-5 h-5 flex items-center justify-center text-xs">
													×
												</button>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="flex gap-4">
								<Button
									type="submit"
									className="flex-1"
									disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										"Update Product"
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => router.back()}
									className="flex-1">
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
