import z from "zod";

const productSchema = z.object({
  slug: z.string(),
  price: z.number(),
  countInStock: z
    .number()
    .min(20, 'stock must be greater than or equals to 20')
    .max(50, 'stock cannot be more than 50'),
  category: z.string(),
  owner: z.string().min(2, { message: "Owner name must be at least 2 characters." }),
  description: z.string(),
  images: z.array(z.string()), 
});

export { productSchema };
