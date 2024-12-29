"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, {Suspense, useState} from "react"
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
  const [isResending, setIsResending] = useState(false)
  const url = `${conf.url}/api/verify`;
  const router = useRouter();

    // Create form using useForm hook
    const form = useForm<z.infer<typeof otpFormSchema>>({
      resolver: zodResolver(otpFormSchema),
      defaultValues: {
        otp: "",
      }
    });

  if (!email) {
    router.push(`/not-found`);
    return;
  }



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

      router.push(`/`);

    } catch (error:any) {
      console.error("Error during OTP verification", error.message);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed", 
        variant: "destructive",
        description: axiosError.response?.data.message || error.message
      });

      setIsSubmitting(false);
    }
  }

  // function to resend otp
  const resendOTP = async () => {
    try {
      
      setIsResending(true)
      const res = await axios.get(
        `${conf.url}/api/verify?email=${encodeURIComponent(email)}`
      )

      if(res.status < 400) {
        toast({
          title: "success",
          description: res.data.message || "request has been sent"
        })
        return;
      }

      toast({
        title: "Error",
        variant: "destructive",
        description: res.data.message || "Failed to send OTP"
      })

    } catch (error:any) {
      console.log(error.message);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "error",
        variant: "destructive",
        description: axiosError?.response?.data.message || "resendOTP error"
      })
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex bg-neutral-100 w-screen items-center 
    justify-center min-h-screen bg-background">
      <Toaster />
      <Card className="w-full border-none shadow-sm bg-neutral-100
       text-dark font-bold max-w-md">
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

              <button
                onClick={resendOTP}
                type="button"
                className="bg-transparent text-black ml-6 text-sm border-black border px-3 py-2 rounded-md" >
                {isResending ? "sending...." : "resend"}
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

const VerifyPageWrapper:React.FC = () => (<Suspense fallback={<div>Loading....</div>}  >
  <VerifyPage />
</Suspense>);

export default VerifyPageWrapper;