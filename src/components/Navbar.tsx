"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useState, useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";
import { Search, User, Moon, Sun } from "lucide-react";
import useScrollHandling from "@/hooks/useScrollHandling";
import { navigationItems } from "@/constants/navigation";
import { useAuth } from "@/context/authContext";
import UserAvatarDropdown from "./userAvatarDropdown";
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDarkMode, toggleTheme }: any = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollPosition } = useScrollHandling();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setIsScrolled(scrollPosition > 80);
  }, [scrollPosition]);

  const getNavItemStyles = (isActive: boolean) => {
    return `relative px-6 py-2 transition-all duration-300 font-medium tracking-wide text-[15px]
    after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[2px]
    after:bg-primary after:transition-transform after:duration-300
    after:origin-center after:transform
    hover:after:scale-x-100 ${
      isActive
        ? `${
            isDarkMode
              ? "text-primary after:scale-x-100"
              : "text-primary after:scale-x-100"
          }`
        : `${
            isDarkMode
              ? "text-slate-300 hover:text-white after:scale-x-0"
              : "text-slate-600 hover:text-primary after:scale-x-0"
          }`
    }`;
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      className={`fixed w-full z-50 top-0 transition-all duration-300 ease-out shadow-md backdrop-blur-sm
      ${
        isDarkMode
          ? "bg-slate-900/95 border-slate-800"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4">
          <FaNewspaper className="h-6 w-6 text-primary transition-colors duration-300" />
          <span className="text-xl font-bold tracking-wide whitespace-nowrap font-sans bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:tracking-wider transition-all duration-300">
            Daily News
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu
          className={`hidden lg:flex transition-all duration-300 ${
            isSearchVisible ? "-translate-x-20" : "translate-x-0"
          }`}
        >
          <NavigationMenuList
            className={`flex transition-all duration-300 ${
              isSearchVisible ? "space-x-1" : "space-x-6"
            }`}
          >
            {navigationItems.map((item) => (
              <NavigationMenuItem
                key={item.name}
                className={`group px-1 transition-all duration-300 ${
                  isSearchVisible ? "scale-90" : "scale-100"
                }`}
              >
                {item.dropdownItems ? (
                  <>
                    <NavigationMenuTrigger
                      className={`relative px-6 py-2 transition-colors duration-300 font-medium tracking-wide text-[15px]
                      after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[2px]
                      after:bg-primary after:transition-all after:duration-300
                      after:origin-center after:transform after:scale-x-0
                      hover:after:scale-x-100 data-[state=open]:bg-transparent
                      ${
                        isDarkMode
                          ? "text-slate-300 hover:text-white data-[state=open]:text-white bg-transparent"
                          : "text-slate-600 hover:text-primary data-[state=open]:text-primary"
                      }`}
                    >
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={`min-w-[180px] p-2 space-y-1 rounded-md shadow-lg backdrop-blur-sm
                        transition-colors duration-300
                        ${
                          isDarkMode
                            ? "bg-slate-900/95 border border-slate-700/50"
                            : "bg-white/95 border border-slate-200"
                        }`}
                      >
                        {item.dropdownItems.map((dropItem) => (
                          <li key={dropItem.name}>
                            <Link
                              href={dropItem.href}
                              className={`block px-4 py-2 rounded-md text-[14px] transition-colors duration-300
                              ${
                                isDarkMode
                                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                              }`}
                            >
                              {dropItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={getNavItemStyles(pathname === item.href)}
                  >
                    {item.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Search, Theme, Auth */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="h-5 w-5 text-slate-400 hover:text-primary cursor-pointer transition-colors duration-300"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            <div
              className={`absolute -right-2 top-[-8px] flex items-center ${
                isSearchVisible ? "w-[220px] opacity-100" : "w-0 opacity-0"
              } transition-all duration-300 overflow-hidden`}
            >
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-1.5 pl-9 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                onBlur={() => setIsSearchVisible(false)}
                autoFocus
              />
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors duration-300 ${
              isDarkMode
                ? "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Moon className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Sun className="h-5 w-5 transition-transform duration-300" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <UserAvatarDropdown
                username={user?.username || "User"}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
              />
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleSignIn}
                  className={`group flex items-center justify-center space-x-2 font-medium w-[120px] overflow-hidden
                  tracking-normal hover:tracking-wider transition-all duration-300 ${
                    isDarkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-800"
                      : "text-slate-600 hover:text-primary hover:bg-slate-100"
                  }`}
                >
                  <User
                    className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode
                        ? "group-hover:text-white"
                        : "group-hover:text-primary"
                    }`}
                  />
                  <span className="text-center">Sign in</span>
                </Button>
                <Button
                  variant="default"
                  onClick={handleSignUp}
                  className={`font-medium w-[120px] overflow-hidden text-center
                  tracking-normal hover:tracking-wider transition-all duration-300 ${
                    isDarkMode
                      ? "bg-white text-slate-900 hover:bg-slate-200 hover:shadow-white/10"
                      : "bg-primary text-white hover:bg-primary/90"
                  } shadow-sm hover:shadow-md`}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Navbar;
