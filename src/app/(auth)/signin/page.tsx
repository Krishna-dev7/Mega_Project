"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Github } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login.schema";
import { useForm } from "react-hook-form";
import conf from "@/helpers/conf";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import accountService from "@/services/AccountService";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const submitForm = async (
    data: z.infer<typeof loginSchema>
  ) => {
    try {

      setIsLoading(true);
      const res = await accountService.loginUser(data)

      /*  await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      }) */

      if (res?.error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: res.error
        })
        return;
      }

      toast({
        title: "Login Success",
        description: res?.success && "login successfully"
      });

      router.push(`/`)
      return;

    } catch (error: any) {
      console.log("signin form error: ", error.message);
      toast({
        title: "Error",
        variant: "destructive",
        description: "An unexpected error has been occurred"
      })

    } finally {
      setIsLoading(false);
    }
  }


  const githubSigin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await accountService.githubLogin()

      /* await signIn('github', {
        redirect: false
      }); */
      console.log(res);

      if (res?.error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: res.error || "something went wrong in githubSign"
        })
        return;
      }

      toast({
        title: "Success 👋",
        description: res?.success && "login successfully"
      })
      router.push(`/`);
      return null;
      
    } catch (error: any) {
      console.log("some error has been occurred", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "An unexpected error has been occurred"
      })
    } finally {
      setIsLoading(false);
    }
  }


  return <div
    className=" bg-[#F5EFFF] sm:text-sm  text-pretty flex flex-col 
    text-black items-center justify-center h-screen py-4 px-2">

    <div className=" w-full max-w-md border border-gray-400 
    p-8 lg:shadow-md rounded-lg">
      <h2 className="text-2xl  font-semibold text-center text-gray-800 mb-6">
        Welcome Back 👋
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}>

          {/* email  */}
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3" >
                <FormLabel >Email</FormLabel>
                <FormControl>
                  <Input className="border border-black" placeholder="demo@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field  */}
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="borderborder-black"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link href={`${conf.url}/forgotPassword`} >
              Forgot your password ?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full border border-gray-400 bg-transparent  mt-6 py-6"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Form>

      {/* GitHub Sign In */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">Or sign in with:</p>
        <Button
          onClick={e => githubSigin(e)}
          disabled={isLoading}
          variant="secondary"
          className="w-full py-6 flex items-center justify-center gap-2"
        >
          <Github size={20} />
          GitHub
        </Button>
      </div>


      {/* Create Account */}
      <div className="mt-6 text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">New customer?</p>
        <Link
          href={`/signup`}
          className="text-sm text-pretty flex items-center justify-center py-5 font-semibold text-gray-800 hover:underline" >
          Create your Account
        </Link>
      </div>
    </div>
  </div>
};


export default LoginPage;