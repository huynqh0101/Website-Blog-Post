import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

// Lazy load RootLayoutClient
const RootLayoutClient = dynamic(() => import("./RootLayoutClient"), {
  loading: () => <div>Loading...</div>,
  ssr: true, // Set to false if you want client-side only rendering
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PoC Blog - Your Digital Story Platform",
  description:
    "Create, share, and discover amazing stories on our modern blogging platform",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans`}
        suppressHydrationWarning
      >
        <Suspense fallback={<div>Loading application...</div>}>
          <RootLayoutClient>{children}</RootLayoutClient>
          <Toaster position="bottom-right" richColors />
        </Suspense>
      </body>
    </html>
  );
}
