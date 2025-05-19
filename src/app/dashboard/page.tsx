"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { SideMenuByAnima } from "@/components/layout/SideMenu";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DashboardPage = (): JSX.Element => {
  const { user } = useAuth();
  const router = useRouter();
  // State để theo dõi sidebar đã thu gọn hay không
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Kiểm tra xác thực và phân quyền
    if (!user || user.role !== "author") {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
    }

    // Lắng nghe sự kiện sidebar thay đổi
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsSidebarCollapsed(e.detail.collapsed);
    };

    window.addEventListener("sidebar-toggle" as any, handleSidebarToggle);
    return () => {
      window.removeEventListener("sidebar-toggle" as any, handleSidebarToggle);
    };
  }, [user, router]);

  // Nếu không phải author, trả về null
  if (!user || user.role !== "author") {
    return <></>;
  }

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Side Menu - Sẽ được render tự động với vị trí fixed */}
      <SideMenuByAnima />

      {/* Main Content - Dynamic margin based on sidebar state */}
      <div
        className={`transition-all duration-300 p-10 ${
          isSidebarCollapsed ? "ml-[80px]" : "ml-[250px]"
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 mt-7">
          <h1 className="text-3xl font-semibold text-gray-800 font-['Poppins',system-ui,-apple-system,BlinkMacSystemFont,sans-serif]">
            Dashboard
          </h1>

          {/* Search Bar */}
          <div className="relative w-[280px]">
            <Input
              className="pl-10 py-2.5 h-[42px] bg-white rounded-xl border border-gray-100 shadow-md hover:border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all duration-200 font-['Poppins',system-ui,-apple-system,sans-serif] font-normal text-gray-600 text-sm"
              placeholder="Search..."
            />
            <SearchIcon className="absolute w-4 h-4 top-[14px] left-4 text-gray-400" />
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardContent />
      </div>
    </div>
  );
};

export default DashboardPage;
