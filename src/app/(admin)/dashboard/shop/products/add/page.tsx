"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImagePlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { productSchema } from "@/schemas/product.schema";
// import toast from "react-hot-toast";

// const formSchema = z.object({
//   slug: z.string().min(3, { message: "Slug must be at least 3 characters." }).max(50),
//   price: z.coerce.number().positive({ message: "Price must be a positive number." }),
//   countInStock: z.coerce.number().int().nonnegative({ message: "Count in stock must be a non-negative integer." }),
//   description: z.string().min(10, { message: "Description must be at least 10 characters." }),
//   category: z.string({ required_error: "Please select a category." }),
//   owner: z.string().min(2, { message: "Owner name must be at least 2 characters." }),
//   discount: z.coerce.number().min(0, { message: "Discount must be a non-negative number." }).max(100, { message: "Discount cannot exceed 100%." }),
// });

const categories = ["Electronics", "Clothing", "Home & Garden", "Books", "Toys", "Sports", "Beauty", "Health", "Automotive", "Other"];

export default function AddProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: { slug: "", price: 0, countInStock: 0, description: "", category: "", owner: "", discount: 0 },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    setIsSubmitting(true);

    const productData = {
      ...values,
      images, // Send images as base64 (or change to a proper file upload system)
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        toast("Product added successfully!");
        router.push("/products"); // Redirect after success
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast(error.message || "Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);

      const imagePromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then((base64Images) => setImages((prev) => [...prev, ...base64Images]))
        .catch((err) => console.error("Error converting images", err));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto py-10 dark">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details to add a new product to your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl><Input placeholder="product-name-123" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="text" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="countInStock" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Count In Stock</FormLabel>
                    <FormControl><Input type="text" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>{categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Describe your product..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Image Upload Section */}
              <div>
                <Label>Product Images</Label>
                <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
                      <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => removeImage(index)}>x</button>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : "Add Product"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
