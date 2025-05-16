"use client";

import React from "react";
import { SideMenuByAnima } from "@/components/layout/SideMenu";
import { SidebarProvider } from "@/context/sidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="dashboard-layout bg-[#fafbff]">
        {/* Hide the global footer for dashboard pages */}
        <style jsx global>{`
          footer {
            display: none !important;
          }
        `}</style>

        {/* Dashboard content */}
        <SideMenuByAnima />
        {children}
      </div>
    </SidebarProvider>
  );
}