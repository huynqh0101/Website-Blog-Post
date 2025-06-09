"use client";

import React, { useContext } from "react";
import { SideMenuByAnima } from "@/components/layout/SideMenu";
import { SidebarProvider } from "@/context/sidebarContext";
import { ArticleProvider } from "@/context/articleContext";
import { ThemeContext } from "@/context/themeContext";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <SidebarProvider>
      <ArticleProvider>
        <div
          className={`dashboard-layout ${
            isDarkMode ? "bg-gray-900" : "bg-[#fafbff]"
          }`}
        >
          {/* Hide the global footer for dashboard pages */}
          <style jsx global>{`
            footer {
              display: none !important;
            }
          `}</style>

          {/* Dashboard content */}
          <SideMenuByAnima />
          <Suspense
            fallback={
              <div
                className={`flex items-center justify-center h-screen ${
                  isDarkMode ? "bg-gray-900" : "bg-[#fafbff]"
                }`}
              >
                <div
                  className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 ${
                    isDarkMode ? "border-blue-400" : "border-blue-500"
                  }`}
                ></div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </ArticleProvider>
    </SidebarProvider>
  );
}
