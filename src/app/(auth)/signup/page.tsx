"use client";

import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import signupSchema from "@/schemas/signup.schem";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import conf from "@/helpers/conf";
import ApiResponse from "@/types/ApiResponse";
import Link from "next/link";


function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullname: "",
      role: "",
    },
  });

  const submitForm = async (data: z.infer<typeof signupSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.postForm<ApiResponse>(
        `${conf.url}/api/signup`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data.success) {
        toast({
          title: "Failed ☹️",
          description: res.data.message || "Something went wrong.",
        });
        return;
      }

      toast({
        title: "Success ⚡",
        description: "Your account has been created successfully."
      });

      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      return null;
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error 😒",
        variant: "destructive",
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5EFFF] flex flex-col">
      {/* Header spacer - prevents content from being hidden under fixed headers */}
      <div className="h-[var(--navbar-height,0px)]" />
      
      {/* Main content */}
      <div className="flex-1 flex items-center text-pretty text-xs justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:mt-0 mt-6 border border-gray-400 sm:w-full w-screen sm:max-w-lg 
					space-y-8 bg-[#F5EFFF] rounded-xl shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Create Account 👋
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} 
						 	className="w-full sm:space-y-6 text-gray-700 space-y-4">
              {/* Username */}
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          {...field}
                          placeholder="Enter your username"
                          className="pl-10 h-11 text-base border-gray-300 focus:ring-2 
													 focus:ring-gray-500 "
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {/* Full Name */}
              <FormField
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="pl-10 h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 h-11 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 text-gray-700 border-gray-300">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-sm h-11 bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
              >
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Already have an account? Return to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;