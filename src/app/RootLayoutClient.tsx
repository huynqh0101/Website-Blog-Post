"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/themeContext";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <main>{children}</main>
          </PageTransition>
        </AnimatePresence>
        {!isDashboardRoute && <Footer />}
        <Toaster position="top-center" />
      </AuthProvider>
    </ThemeProvider>
  );
}
