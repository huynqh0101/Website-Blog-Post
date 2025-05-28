"use client";

import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "@/context/themeContext";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import useScrollHandling from "@/hooks/useScrollHandling";
import { Logo } from "./components/Logo";
import { DesktopNav } from "./components/DesktopNav";
import { SearchBar } from "./components/SearchBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { AuthButtons } from "./components/AuthButtons";
import MobileMenu from "@/components/MobileMenu"; // Updated path to the correct location

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
      className={`fixed w-full z-[999] top-0 transition-all duration-300 ease-out shadow-md backdrop-blur-sm
      ${
        isDarkMode
          ? "bg-slate-900/95 border-slate-800"
          : "bg-white/95 border-gray-200"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Logo />

        <DesktopNav
          isDarkMode={isDarkMode}
          isSearchVisible={isSearchVisible}
          pathname={pathname}
          getNavItemStyles={getNavItemStyles}
        />

        <div className="hidden lg:flex items-center space-x-6">
          <SearchBar
            isSearchVisible={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />

          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

          <AuthButtons
            isAuthenticated={isAuthenticated}
            user={user}
            isDarkMode={isDarkMode}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onLogout={handleLogout}
          />
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
};

export default Navbar;
