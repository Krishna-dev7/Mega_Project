import { z } from "zod";

const otpFormSchema = z.object({
  otp: z
    .string()
    .min(4, "otp must be length of 6")
});


export default otpFormSchema;