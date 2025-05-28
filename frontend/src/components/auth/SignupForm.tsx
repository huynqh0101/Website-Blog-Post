"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Thêm Eye và EyeOff vào dòng import icons
import { User, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "author" | "user";
}

export default function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      if (formData.role === "user") {
        const response = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Something went wrong");
        }
        const updateResponse = await fetch(
          `http://localhost:1337/api/users/${data.user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${data.jwt}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar: 13, // Use the same default avatar ID as author
            }),
          }
        );

        if (!updateResponse.ok) {
          console.error("Failed to set default avatar");
        }
        login(data.jwt, {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: "user",
        });
      } else {
        const response = await fetch("http://localhost:1337/api/authors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              name: formData.username,
              email: formData.email,
              password: formData.password,
              avatar: 13, // Default avatar ID
            },
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error?.message?.includes("username")) {
            throw new Error("Username is already taken");
          } else if (data.error?.message?.includes("email")) {
            throw new Error("Email is already registered");
          }
          throw new Error(data.error?.message || "Registration failed");
        }

        const userResponse = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }),
          }
        );
        const userData = await userResponse.json();
        if (!userResponse.ok) {
          throw new Error(
            userData.error?.message || "User registration failed"
          );
        }
        // Assuming the author API returns similar structure as user registration
        login(userData.jwt, {
          id: data.data.id, // ID của author entry
          username: formData.username,
          email: formData.email,
          role: "author",
        });
      }
      toast.success(`Registration successful as ${formData.role}!`);
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1000px] relative flex shadow-lg rounded-lg overflow-hidden my-8">
        <div className="flex-1 py-8 px-6 flex justify-center items-center">
          <Card className="border-none shadow-none w-full max-w-[350px]">
            <CardContent className="p-0">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold font-['Poppins'] text-gray-900 tracking-tight">
                  Get Started Now
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Create your account and start your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-['Poppins'] text-gray-700">
                    Name
                  </label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-10 text-sm font-['Poppins'] rounded-lg border-gray-200 focus:border-[#3a5b22] focus:ring-[#3a5b22]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-['Poppins'] text-gray-700">
                    Email address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-10 text-sm font-['Poppins'] rounded-lg border-gray-200 focus:border-[#3a5b22] focus:ring-[#3a5b22]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-['Poppins'] text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-10 text-sm font-['Poppins'] rounded-lg border-gray-200 focus:border-[#3a5b22] focus:ring-[#3a5b22] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-['Poppins'] text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="h-10 text-sm font-['Poppins'] rounded-lg border-gray-200 focus:border-[#3a5b22] focus:ring-[#3a5b22] pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center space-x-8 py-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="user"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#3a5b22] border-gray-300 focus:ring-[#3a5b22]"
                    />
                    <label
                      htmlFor="user"
                      className="ml-2 text-sm font-medium text-gray-700"
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
                      className="w-4 h-4 text-[#3a5b22] border-gray-300 focus:ring-[#3a5b22]"
                    />
                    <label
                      htmlFor="author"
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      Register as Author
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="rounded border-gray-300 text-[#3a5b22] focus:ring-[#3a5b22]"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <span className="text-[#3a5b22] hover:underline cursor-pointer">
                      terms & policy
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#3a5b22] hover:bg-[#2e4a1b] rounded-lg text-sm font-semibold font-['Poppins'] tracking-wide"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Sign Up
                </Button>

                <div className="relative flex items-center py-4">
                  <Separator className="w-full" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 px-4 bg-white">
                    <span className="text-sm text-gray-500 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-['Poppins'] text-gray-700 border-gray-300"
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
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-['Poppins'] text-gray-700 border-gray-300"
                  >
                    <img
                      className="w-6 h-6 mr-2.5"
                      alt="Apple logo"
                      src="/icons8-apple-logo-1.svg"
                    />
                    Sign in with Apple
                  </Button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#3a5b22] font-medium hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

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
