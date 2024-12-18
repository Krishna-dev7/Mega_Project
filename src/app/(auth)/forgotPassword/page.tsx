"use client"

import React, { useState } from "react"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import forgotSchema from "@/schemas/forgot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import ApiResponse from "@/types/ApiResponse";
import conf from "@/helpers/conf";

const ForgotPasswordPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
      newPassword: ""
    }
  });


  const submitForm = async (
    data: z.infer<typeof forgotSchema>
  ) => {
    try {
      setIsLoading(true);
      // console.log(data);
      const res = await axios.postForm<ApiResponse>(
        `${conf.url}/api/forgotPassword`,
        data
      )

      if (!res.data.success) {
        toast({
          title: "Error",
          variant: "destructive",
          description: res.data.message
            || "something went wrong on forgotpassword"
        })

        return;
      }

      toast({
        title: "Success",
        description: res.data.message
      })

      redirect("/signin");
    } catch (error: any) {
      console.log("Something went wrong in forgot password: ", error.messgae);
      toast({
        title: "Error",
        description: error.message
          || "something went wrong in forgot password"
      })
    } finally {
      setIsLoading(false);
    }
  }



  return <div
    className="flex bg-neutral-100 w-screen items-center justify-center min-h-screen bg-background" >
    <Toaster />

    {/* Back Button */}
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
      <Link
        href="/"
        className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition duration-150 ease-in-out"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="text-sm sm:text-base">Back</span>
      </Link>
    </div>


    <Card className="w-full border-none shadow-sm bg-neutral-100 text-dark font-bold max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl mb-3" >Forgot Password</CardTitle>
        <CardDescription
          className="text-sm text-center">
          Enter your email and new password to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} >
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 text-lg" >
                  <FormLabel  >Email</FormLabel>
                  <FormControl>
                    <Input placeholder="demo@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-6" >
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative" >
                      <Input
                        {...field}
                        type={showPassword ? "password" : "text"}
                        placeholder="SimonSays"
                        required
                      />

                      <button
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-2.5 text-gray-700 hover:text-gray-900" >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" >
              {isLoading ? "Changing..." : "Change"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>

  </div>
};

export default ForgotPasswordPage;