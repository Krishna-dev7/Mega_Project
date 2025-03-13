"use client";

import type React from "react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import productSchema from "@/schemas/product.schema";
import { Categories } from "@/models/product.models";
import Loading from "@/components/customUI/Loading";

export default function AddProductPage() {
	const router = useRouter();
	const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false);


	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			slug: "",
			price: 0,
			countInStock: 0,
			description: "",
			category: "",
			owner: "",
		},
	});

	async function onSubmit(
		data: z.infer<typeof productSchema>,
	) {
		setIsSubmitting(true);

		const productData = {
			...data,
			images, 
		};

		try {
			
		} catch (error: any) {
			toast(error.message || "Failed to add product.");
		} finally {
			setIsSubmitting(false);
		}
	}


  if(isSubmitting) {
    return <div className="loader min-h-screen flex place-items-center">
      <Loading />
    </div>
  }
	

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {

    try {

      imageFiles.map(file => console.log(file))
      
    } catch (err:any) {
      console.log("Error occurred at handleImageChange",
         err.message);
    }
    
  }

	return (
		<div className="container mx-auto py-10 dark">
			<Card className="max-w-2xl px-5 mx-auto">
				<CardHeader className="mb-5">
					<CardTitle className="text-lg">Add New Product</CardTitle>
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
												{Object.values(Categories).map((category) => (
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
											key={index}
											className="relative w-20 h-20">
											<img
												src={image}
												alt={`Product ${index}`}
												className="w-full h-full object-cover rounded-lg"
											/>
											<button
												type="button"
												className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
												// onClick={() => removeImage(index)}
                        >
												x
											</button>
										</div>
									))}
								</div>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Saving...
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
