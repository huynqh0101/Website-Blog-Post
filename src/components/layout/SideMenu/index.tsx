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
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/context/sidebarContext";

export const SideMenuByAnima = (): JSX.Element => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [topOffset, setTopOffset] = useState(0);

  // Lấy chiều cao của header để đặt top cho sidebar
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      const headerHeight = header.getBoundingClientRect().height;
      setTopOffset(headerHeight);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Memoize menu items với active state dựa trên current path
  const menuItems = useMemo(
    () => [
      {
        href: "/dashboard",
        icon: <LayoutDashboardIcon className="w-5 h-5" />,
        label: "Dashboard",
        isActive: pathname === "/dashboard",
      },
      {
        href: "/dashboard/my-articles",
        icon: <FileTextIcon className="w-5 h-5" />,
        label: "My Articles",
        isActive: pathname === "/dashboard/my-articles",
      },
      {
        href: "/dashboard/new-article",
        icon: <PenToolIcon className="w-5 h-5" />,
        label: "Write New",
        isActive: pathname === "/dashboard/new-article",
      },
      {
        href: "/dashboard/statistics",
        icon: <BarChartIcon className="w-5 h-5" />,
        label: "Statistics",
        isActive: pathname === "/dashboard/statistics",
      },
      {
        href: "/dashboard/guidelines",
        icon: <BookIcon className="w-5 h-5" />,
        label: "Writing Guidelines",
        isActive: pathname === "/dashboard/guidelines",
      },
      {
        href: "/dashboard/settings",
        icon: <SettingsIcon className="w-5 h-5" />,
        label: "Settings",
        isActive: pathname === "/dashboard/settings",
      },
    ],
    [pathname]
  );

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
      <div className="flex flex-col h-full p-4 overflow-y-auto">
        {/* Header with Toggle Button */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-6`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <BookIcon className="w-6 h-6 text-blue-600" />
              <div className="ml-2.5">
                <h1 className="font-['Inter',sans-serif] font-semibold text-lg text-blue-600 tracking-tight">
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
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <MenuIcon className="w-4.5 h-4.5" />
            ) : (
              <XIcon className="w-4.5 h-4.5" />
            )}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <ul className="space-y-2.5">
            {menuItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                    item.isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="ml-3 font-['Inter',sans-serif] font-medium text-sm tracking-tight">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
