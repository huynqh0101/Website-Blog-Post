"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Create New Account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="pl-10"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              className="pl-10"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center space-x-8 py-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <label
                htmlFor="user"
                className="ml-2 text-sm font-medium text-gray-600"
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
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <label
                htmlFor="author"
                className="ml-2 text-sm font-medium text-gray-600"
              >
                Register as Author
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
