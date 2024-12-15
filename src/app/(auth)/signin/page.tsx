"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Github, Icon, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem
} from "@/components/ui/form";

import { BackgroundLines } from "@/components/ui/background-lines";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login.schema";
import { useForm } from "react-hook-form";
import conf from "@/helpers/conf";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

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
        description: res?.ok && "login successfully"
      });

      redirect(`${conf.url}/`)

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
      const res = await signIn('github', {
        redirect: false
      });
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
        title: "Login Success",
        description: res?.ok && "login successfully"
      })
      redirect(`${conf.url}/`)
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


  return <BackgroundLines
    className="flex flex-col items-center justify-center h-screen  ">
    <Toaster />
    <div className=" lg:z-10 md:z-0 sm:z-0 w-full max-w-md bg-white p-8 lg:shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 uppercase mb-6">
        Login
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}>

          {/* email  */}
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            <Link href={`${conf.url}/api/auth/forgotPassword`} >
              Forgot your password ?
            </Link>
          </div>



          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6"
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
          className="w-full flex items-center justify-center gap-2"
        >
          <Github size={20} />
          GitHub
        </Button>
      </div>


      {/* Create Account */}
      <div className="mt-6 text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">New customer?</p>
        <Link
          href={`${conf.url}/signup`}
          className="text-lg text-center py-5 font-bold text-gray-800 hover:underline" >
          Create your Account <User className="inline" size={20} />
        </Link>
      </div>
    </div>
  </BackgroundLines>

};


{/* return (
    <div className="flex flex-col items-center justify-center h-screen md:bg-white lg:bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 lg:shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 uppercase mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="loginEmail"
              className="block text-sm font-medium text-gray-700 uppercase">
              Email
            </label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="loginPassword"
              className="block text-sm font-medium text-gray-700 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <a
              href="#"
              id="forgotPassword"
              className="text-sm text-gray-600 hover:underline">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-900 uppercase font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Or sign in with:</p>
          <button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
            <Github className="mr-2" size={20} />
            GitHub
          </button>
        </div>
        <div className="mt-6 text-center border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">New customer?</p>
          <a
            href="/register"
            id="switchToRegister"
            className="text-sm font-medium text-gray-800 hover:underline">
            Create your account
          </a>
        </div>
      </div>
    </div>
  );
}; */}

export default LoginPage;