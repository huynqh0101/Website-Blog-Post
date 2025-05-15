import {
  FileTextIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PenToolIcon,
  SettingsIcon,
  BookIcon,
  BarChartIcon,
  XIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SideMenuByAnima = (): JSX.Element => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  // Lấy chiều cao của header để đặt top cho sidebar
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      const headerHeight = header.getBoundingClientRect().height;
      setTopOffset(headerHeight);
    }
  }, []);

  // Thông báo sự thay đổi trạng thái sidebar
  useEffect(() => {
    // Gửi sự kiện khi sidebar thay đổi trạng thái
    const event = new CustomEvent("sidebar-toggle", {
      detail: { collapsed: isCollapsed },
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      } fixed left-0 bg-white shadow-[0px_10px_60px_#e1ecf880] transition-all duration-300 z-40 overflow-y-auto`}
      style={{
        top: `${topOffset}px`,
        bottom: 0,
        height: "auto",
      }}
    >
      <div className="flex flex-col h-full p-5 overflow-y-auto">
        {/* Header with Toggle Button */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-8`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <BookIcon className="w-7 h-7 text-[#3a5b22]" />
              <div className="ml-3">
                <h1 className="font-[Poppins,Helvetica] font-semibold text-xl text-[#3a5b22]">
                  Author Panel
                </h1>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className={`p-1 hover:bg-gray-100 rounded-full ${
              isCollapsed ? "mx-auto" : ""
            }`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <MenuIcon className="w-5 h-5" />
            ) : (
              <XIcon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Menu items */}
            <li>
              <Link
                href="/dashbroad"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors bg-[#3a5b22] text-white ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <LayoutDashboardIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    Dashboard
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashbroad/my-articles"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <FileTextIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    My Articles
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashbroad/new-article"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <PenToolIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    Write New
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashbroad/statistics"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <BarChartIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    Statistics
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashbroad/guidelines"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <BookIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    Writing Guidelines
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/dashbroad/settings"
                className={`flex items-center py-3 px-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="ml-3 font-[Poppins,Helvetica] font-medium text-sm">
                    Settings
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
