"use client";

import React from "react";
import { SideMenuByAnima } from "@/components/layout/SideMenu";
import { SidebarProvider } from "@/context/sidebarContext";
import { ArticleProvider } from "@/context/articleContext"; // Import ArticleProvider
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ArticleProvider>
        {" "}
        {/* Bọc ArticleProvider ở đây */}
        <div className="dashboard-layout bg-[#fafbff]">
          {/* Hide the global footer for dashboard pages */}
          <style jsx global>{`
            footer {
              display: none !important;
            }
          `}</style>

          {/* Dashboard content */}
          <SideMenuByAnima />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
      </ArticleProvider>
    </SidebarProvider>
  );
}
