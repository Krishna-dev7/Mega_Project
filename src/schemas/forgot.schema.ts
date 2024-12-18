import {z} from "zod";

const forgotSchema = z.object({
  email: z.string().email(),
  newPassword: z
    .string()
    .min(6, "password must be at least 6 characters long")
    .max(12, "password must at most 12 characters long")
    .regex(/^(?=.*[A-Z])+.*$/, "password must contain at least one uppercase letter and no white spaces"),
});

export default forgotSchema;