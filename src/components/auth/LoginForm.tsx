"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";

interface LoginFormData {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
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
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Login failed");
      }

      login(data.jwt, data.user);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
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
    <div className="flex min-h-screen items-center justify-center bg-black px-10 py-1 ">
      <div className="w-full max-w-md">
        <div className="w-full space-y-8 rounded-lg bg-black p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Log in</h2>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="flex h-12 w-full items-center justify-start gap-3 rounded-full border border-gray-700 bg-transparent px-6 py-3 text-white transition hover:border-white">
              <img src="/google.png" alt="Google" className="h-6 w-6" />
              <span className="flex-1 text-center">Continue with Google</span>
            </button>
            <button className="flex h-12 w-full items-center justify-start gap-3 rounded-full border border-gray-700 bg-transparent px-6 py-3 text-white transition hover:border-white">
              <img src="/facebook.png" alt="Facebook" className="h-6 w-6" />
              <span className="flex-1 text-center">Continue with Facebook</span>
            </button>
            <button className="flex h-12 w-full items-center justify-start gap-3 rounded-full border border-gray-700 bg-transparent px-6 py-3 text-white transition hover:border-white">
              <img src="/apple.png" alt="Apple" className="h-6 w-6" />
              <span className="flex-1 text-center">Continue with Apple</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-2 text-sm text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm text-gray-400"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    type="email"
                    name="identifier"
                    placeholder="Email"
                    required
                    className="h-10 w-full rounded-md border border-gray-700 bg-[#121212] pl-10 pr-3 text-xs text-gray-400 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-0 hover:bg-[#121212] [&:-webkit-autofill]:!bg-[#121212] [&:-webkit-autofill]:!text-gray-400 [&:-webkit-autofill_selected]:!bg-[#121212] [-webkit-text-fill-color:#9ca3af] [transition:all_0s_50000s]"
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-gray-400"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="h-10 w-full rounded-md border border-gray-700 bg-[#121212] pl-10 pr-3 text-xs text-gray-400 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-0 hover:bg-[#121212] [&:-webkit-autofill]:!bg-[#121212] [&:-webkit-autofill]:!text-gray-400 [&:-webkit-autofill_selected]:!bg-[#121212] [-webkit-text-fill-color:#9ca3af] [transition:all_0s_50000s]"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-[#121212] text-green-500 focus:ring-0"
                  id="remember_me"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-green-500 text-base font-bold text-black transition-all hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>

            <Link
              href="/forgot-password"
              className="block text-center text-sm text-gray-400 hover:underline"
            >
              Forgot your password?
            </Link>
          </form>

          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={handleSignUp}
                className="text-white hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
