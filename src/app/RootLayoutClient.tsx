"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/themeContext";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/authContext";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navbar />
        <main className="min-h-screen max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
          <Toaster />
        </main>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}
