import z from "zod";

const productSchema = z.object({
	slug: z.string(),
	price: z.coerce.number(),
  images: z.array(z.string()),
	countInStock: z
		.coerce
		.number()
		.min(20, "stock must be greater than or equals to 20")
		.max(50, "stock cannot be more than 50"),
	category: z.string(),
	description: z.string(),
	owner: z.string(),
	discount: z
		.coerce
		.number()
		.min(0, "discount must be greater than or equals to 0")
		.max(100, "discount cannot be more than 100")
		.optional(),
	sizes: z.array(z.string()),
});


export default productSchema