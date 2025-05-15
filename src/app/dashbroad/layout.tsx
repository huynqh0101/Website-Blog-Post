"use client";

import React from "react";
import { SideMenuByAnima } from "@/components/layout/SideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout bg-[#fafbff]">
      {/* Hide the global footer for dashboard pages */}
      <style jsx global>{`
        footer {
          display: none !important;
        }
      `}</style>

      {/* Dashboard content */}
      {children}
    </div>
  );
}
