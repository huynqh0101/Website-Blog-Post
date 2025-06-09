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
import React, { useState, useEffect, useMemo, useContext } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/context/sidebarContext";
import { ThemeContext } from "@/context/themeContext";

export const SideMenuByAnima = (): JSX.Element => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [topOffset, setTopOffset] = useState(0);

  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

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
      } fixed left-0 transition-all duration-300 z-40 overflow-y-auto ${
        isDarkMode
          ? "bg-gray-800 shadow-[0px_10px_60px_rgba(0,0,0,0.3)]"
          : "bg-white shadow-[0px_10px_60px_#e1ecf880]"
      }`}
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
              <BookIcon
                className={`w-6 h-6 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <div className="ml-2.5">
                <h1
                  className={`font-['Inter',sans-serif] font-semibold text-lg tracking-tight ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Author Panel
                </h1>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className={`p-1 rounded-full ${isCollapsed ? "mx-auto" : ""} ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
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
                      ? isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
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

        {/* User section at bottom */}
        {user && (
          <div
            className={`mt-auto pt-4 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              {!isCollapsed && (
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                      isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="ml-2">
                    <p
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {user.username}
                    </p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className={`p-1 rounded ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
