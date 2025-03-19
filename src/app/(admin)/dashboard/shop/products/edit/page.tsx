"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import {
	useRouter,
	useSearchParams,
} from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
	Categories,
	IProduct,
} from "@/models/product.models";
import productSchema from "@/schemas/product.schema";
import productService from "@/services/productService";
import storageService from "@/services/StorageService";
import Image from "next/image";

export default function EditProductPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const productId = searchParams.get("productId");
	const [product, setProduct] = useState<IProduct | null>(
		null,
	);

	const [productImages, setProductImages] = useState<
		string[]
	>([]);

	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			slug: "",
			price: 0,
			countInStock: 0,
			description: "",
			category: "",
			owner: "",
			discount: 0,
			images: [],
		},
	});

	useEffect(() => {
		console.log("call by first useEffect", productId);

		async function fetchProduct() {
			try {
				const res =
					await productService.getProduct(productId);

				console.log("fetching product: ", res);
				setProduct(res.data);
			} catch (err: any) {
				console.log("error occurred at fetch", err.message);
			}
		}
		fetchProduct();
	}, [productId]);

	// Fetch product data
	useEffect(() => {
		if (!product) return;
		setIsLoading(true);
		console.log("product for edit: ", product);

		form.reset({
			slug: product.slug,
			price: product.price,
			countInStock: product.countInStock,
			description: product.description,
			category: product.category,
			owner: product.owner?.toString(),
			discount: product.discount,
			images: product.images,
		});

		setProductImages(product.images);
		setIsLoading(false);
	}, [product, form]);

	function onSubmit(values: z.infer<typeof productSchema>) {
		setIsSubmitting(true);

		// Here you would typically handle the form submission
		// including uploading any new images to your backend
		console.log("Form values:", values);
		// console.log("Images:", productImages);

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
		}, 1500);
	}

	const handleImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.files) {
			const fileArray = Array.from(e.target.files);
			const newImages: string[] = [];
			fileArray.forEach(async (file) => {
				const res = await storageService.storeImage({
					file,
					type: "product",
				});

				const newImageURI =
					await storageService.getImagePreview(
						"product",
						res.$id,
					);

				newImages.push(newImageURI.href);
			});

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
			<div
				className="container mx-auto py-10 flex items-center
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
									{product?.images.map((image, index) => (
										<div
											key={index.toString()}
											className="relative w-20 h-20">
											<Image
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
