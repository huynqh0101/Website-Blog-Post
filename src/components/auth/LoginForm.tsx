"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface LoginFormData {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      router.push("/"); // Redirect to home if already logged in
    }
  }, [router]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Login attempt
      const loginResponse = await fetch(
        "http://localhost:1337/api/auth/local",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.error?.message || "Login failed");
      }

      console.log("Login successful, checking if user is author...");

      // 2. Check if user is an author
      const email = encodeURIComponent(formData.identifier);
      const checkAuthorResponse = await fetch(
        `http://localhost:1337/api/authors?filters[email][$eq]=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginData.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!checkAuthorResponse.ok) {
        console.error("Author check failed:", await checkAuthorResponse.text());
        // If author check fails, proceed as regular user
        login(loginData.jwt, {
          ...loginData.user,
          role: "user",
        });
        toast.success("Login successful as user");
        router.push("/");
        return;
      }

      const authorData = await checkAuthorResponse.json();
      console.log("Author check response:", authorData);

      // Determine user role
      const userRole =
        authorData.data && authorData.data.length > 0 ? "author" : "user";
      console.log("Determined role:", userRole);

      if (
        userRole === "author" &&
        authorData.data &&
        authorData.data.length > 0
      ) {
        const authorDocumentId = authorData.data[0].documentId;
        localStorage.setItem("authorDocumentId", authorDocumentId);
        console.log("Author documentId saved:", authorDocumentId);
      }
      login(loginData.jwt, {
        ...loginData.user,
        role: userRole,
      });

      toast.success(`Login successful as ${userRole}!`);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  // Return early if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1000px] relative flex shadow-lg rounded-lg overflow-hidden my-8">
        <div className="flex-1 py-8 px-6 flex justify-center items-center">
          <Card className="border-none shadow-none w-full max-w-[350px]">
            <CardContent className="p-0">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold font-['Poppins'] text-gray-900 tracking-tight">
                  Welcome back!
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Enter your Credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold font-['Poppins'] text-gray-700">
                    Email address
                  </label>
                  <Input
                    type="email"
                    name="identifier"
                    placeholder="Enter your email"
                    required
                    className="h-10 text-sm font-['Poppins'] rounded-lg border-gray-200 focus:border-[#3a5b22] focus:ring-[#3a5b22]"
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1.5">
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
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember_me"
                    className="rounded border-gray-300 text-[#3a5b22] focus:ring-[#3a5b22]"
                  />
                  <label
                    htmlFor="remember_me"
                    className="text-sm text-gray-600"
                  >
                    Remember for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#3a5b22] hover:bg-[#2e4a1b] rounded-lg text-sm font-semibold font-['Poppins'] tracking-wide"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
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
                    variant="outline"
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-['Poppins'] text-gray-700 border-gray-300"
                  >
                    <img
                      className="w-6 h-6 mr-2.5"
                      alt="Google"
                      src="/google.png"
                    />
                    Sign in with Google
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-auto py-1 px-5 rounded-lg text-sm font-medium font-['Poppins'] text-gray-700 border-gray-300"
                  >
                    <img
                      className="w-6 h-6 mr-2.5"
                      alt="Apple"
                      src="/icons8-apple-logo-1.svg"
                    />
                    Sign in with Apple
                  </Button>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={handleSignUp}
                      className="text-[#3a5b22] font-medium hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            className="h-full w-full object-cover"
            alt="Login background"
            src="/chris-lee-70l1tdai6rm-unsplash-1.png"
          />
        </div>
      </div>
    </div>
  );
}
