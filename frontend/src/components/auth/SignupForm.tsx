"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useSignup } from "@/hooks/useSignup";

export default function SignupForm() {
  const {
    formData,
    loading,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
  } = useSignup();

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white dark:bg-gray-800 w-full max-w-[1000px] relative flex shadow-lg rounded-lg overflow-hidden my-8">
        <div className="flex-1 py-8 px-6 flex justify-center items-center">
          <Card className="border-none shadow-none w-full max-w-[350px] bg-transparent">
            <CardContent className="p-0">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold font-serif text-gray-900 dark:text-white tracking-tight">
                  Get Started Now
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Create your account and start your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-serif text-gray-700 dark:text-gray-200">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="h-10 text-sm font-serif rounded-lg border-gray-200 dark:border-gray-600 focus:border-[#3a5b22] focus:ring-[#3a5b22] pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-serif text-gray-700 dark:text-gray-200">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="h-10 text-sm font-serif rounded-lg border-gray-200 dark:border-gray-600 focus:border-[#3a5b22] focus:ring-[#3a5b22] pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-serif text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-10 text-sm font-serif rounded-lg border-gray-200 dark:border-gray-600 focus:border-[#3a5b22] focus:ring-[#3a5b22] pl-10 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-serif text-gray-700 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="h-10 text-sm font-serif rounded-lg border-gray-200 dark:border-gray-600 focus:border-[#3a5b22] focus:ring-[#3a5b22] pl-10 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Role selection */}
                <div className="flex justify-center space-x-8 py-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="user"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#3a5b22] border-gray-300 dark:border-gray-600 focus:ring-[#3a5b22] dark:bg-gray-700"
                    />
                    <label
                      htmlFor="user"
                      className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Register as User
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="author"
                      name="role"
                      value="author"
                      checked={formData.role === "author"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#3a5b22] border-gray-300 dark:border-gray-600 focus:ring-[#3a5b22] dark:bg-gray-700"
                    />
                    <label
                      htmlFor="author"
                      className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Register as Author
                    </label>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="rounded border-gray-300 dark:border-gray-600 text-[#3a5b22] focus:ring-[#3a5b22] data-[state=checked]:bg-[#3a5b22] data-[state=checked]:border-[#3a5b22]"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 dark:text-gray-300"
                  >
                    I agree to the{" "}
                    <span className="text-[#3a5b22] dark:text-[#4a6b32] hover:underline cursor-pointer">
                      terms & policy
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#3a5b22] hover:bg-[#2e4a1b] dark:bg-[#4a6b32] dark:hover:bg-[#3a5b22] rounded-lg text-sm font-semibold font-serif tracking-wide text-white"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign Up
                </Button>

                {/* Separator */}
                <div className="relative flex items-center py-4">
                  <Separator className="w-full dark:bg-gray-600" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 px-4 bg-white dark:bg-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social login buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-serif text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <img
                      className="w-6 h-6 mr-2.5"
                      alt="Google"
                      src="/icons8-google-1.svg"
                    />
                    Sign in with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-serif text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <img
                      className="w-6 h-6 mr-2.5"
                      alt="Apple logo"
                      src="/icons8-apple-logo-1.svg"
                    />
                    Sign in with Apple
                  </Button>
                </div>

                {/* Sign in link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#3a5b22] dark:text-[#4a6b32] font-medium hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Image section */}
        <div className="hidden md:block md:w-1/2">
          <img
            className="h-full w-full object-cover"
            alt="Chris lee"
            src="/chris-lee-70l1tdai6rm-unsplash-1.png"
          />
        </div>
      </div>
    </div>
  );
}
