"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel
} from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from 'next/navigation';
import signupSchema from '@/schemas/signup.schem';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/hooks/use-toast';
import conf from '@/helpers/conf';
import ApiResponse from '@/types/ApiResponse';
import { FileUpload } from '@/components/ui/file-upload';
import Link from 'next/link';
import { BackgroundLines } from '@/components/ui/background-lines';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<File>();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phoneNumber: "",
      fullname: "",
      role: ""
    }
  });

  const submitForm = async (
    data: z.infer<typeof signupSchema>
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.postForm<ApiResponse>(
        `${conf.url}/api/signup`,
        data
      )

      if (!res.data.success) {
        toast({
          title: "Error",
          description: res.data.message || "Something went wrong"
        })
        return;
      }

      toast({
        title: "Success",
        description: res.data.message
      })
      redirect(`${conf.url}/`);

    } catch (error: any) {
      console.log("error in signup form: ", error.message);
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        variant: "destructive",
        description: axiosError.response?.data.message,
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BackgroundLines className="flex justify-center items-center w-full max-h-fit h-fit py-10 min-h-screen px-4 ">
      <div className="w-full max-w-md min-h-screen h-fit max-h-fit lg:max-w-xl bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-center text-3xl font-bold uppercase tracking-wider text-gray-900 mb-6">
          Create Account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="space-y-5"
          >
            {/* Username */}
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base text-gray-700">Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
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
                  <FormLabel className="font-bold text-base text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
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
                  <FormLabel className="font-bold text-base text-gray-700">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
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
                  <FormLabel className="font-bold text-base text-gray-700">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base text-gray-700">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        {...field}
                        placeholder="86293XXXX"
                        className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* User Role */}
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base text-gray-700">Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full pl-3 py-2.5 text-base">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <div className="w-full border border-dashed mt-5 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
              <FormLabel className="font-bold text-base text-gray-700 block mb-3">Avatar</FormLabel>
              <FileUpload
                key="fileupload"
                onChange={(files: File[]) => setAvatar(files[0])}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md uppercase tracking-wider py-3.5 text-base transition-colors duration-300 ease-in-out"
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>

            {/* Login Link */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <Link
                className="text-gray-600 hover:text-gray-900 hover:underline text-base"
                href={`${conf.url}/signin`}
              >
                Already have an account? Return to Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </BackgroundLines>
  );
}

export default Register;