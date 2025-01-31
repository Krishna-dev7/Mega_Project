import z from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {message: "password must be at least 6 characters long"})
    .max(15, "password must be at most 15 characters long")
})

export default loginSchema;