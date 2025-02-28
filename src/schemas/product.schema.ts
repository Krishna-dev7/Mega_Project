import z from "zod"

const productSchema = z.object({
  slug: z.string(),
  price: z.number(),
  countInStock: z
    .number()
    .min(20, 'stock must be greater than or equals to 20')
    .max(50, 'stock cannot be more than 50'),
  category: z.string(),
  description: z.string(),
})