import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, {message: "Username must be at least 4 characters long"})
  .max(20, {message: "Username must be at most 20 characters long"})
  .regex(/^[a-zA-Z0-9]*$/, "username can only contain letters and numbers")


const signupSchema = z.object({
  username: usernameValidation,
  fullname: z.string().regex(/^[a-zA-z\s]{4,12}$/, "fullname can contain only letters"),
  email: z.string().email(),
  role: z.string().regex(/(user)|(seller)/, "only user or seller is allowed"),
  password: z
    .string()
    .min(6, "password must be at least 6 character long ")
    .max(15, "password must be at most 15 characters long")
})

export default signupSchema;


  // phoneNumber: z
  //   .string()
  //   .length(10, {message: "must be 10 character long"})
  //   .regex(/^[0-9]*$/, "only numbers are allowed"),