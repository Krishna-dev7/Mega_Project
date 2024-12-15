"use client"

import { useSearchParams } from "next/navigation"
import React from "react"
import { redirect } from "next/navigation"
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
  FormDescription
} from "@/components/ui/form";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import otpFormSchema from "@/schemas/otp.schema";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import ApiResponse from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle } from "@/components/ui/card";
import conf from "@/helpers/conf";

const VerifyPage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const url = `${conf.url}/api/verify`;

  if (!email) {
    const message = "You are not allowed to access this page";
    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error?error=${encodeURIComponent(message)}&errorCode=400`);
  }

  // Create form using useForm hook
  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    }
  });

  // Function to handle form submission
  const submitOtp = async (data: z.infer<typeof otpFormSchema>) => {
    try {
      setIsSubmitting(true);
      const newData = {
        otp: data.otp,
        email
      }

      const res = await axios.post<ApiResponse>(url, newData);

      toast({
        title: "OTP Verified",
        description: res.data?.message || "OTP verified successfully",
      });

      setIsSubmitting(false);
      redirect("/");

    } catch (error:any) {
      console.error("Error during OTP verification", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed", 
        variant: "destructive",
        description: axiosError.response?.data.message || error.message
      });

      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex bg-neutral-100 w-screen items-center justify-center min-h-screen bg-background">
      <Toaster />
      <Card className="w-full border-none shadow-sm bg-neutral-100 text-dark font-bold max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          <CardDescription className="text-sm text-dark">
            Enter the 4-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitOtp)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel className="sr-only">One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        {...field}
                        className="mx-auto justify-center flex"
                      >
                        <InputOTPGroup className="justify-center">
                          <InputOTPSlot className="border-black" index={0} />
                          <InputOTPSlot className="border-black"  index={1} />
                          <InputOTPSlot className="border-black"  index={2} />
                          <InputOTPSlot className="border-black"  index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center text-sm text-dark mt-2">
                      Please enter the one-time password sent to your email.
                    </FormDescription>
                    <FormMessage className="text-center text-lg font-mono text-red-600 font-dark" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className=" py-5 px-5 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyPage;