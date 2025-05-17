import { useState, useRef, useEffect } from "react";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserAvatarDropdownProps {
  username: string;
  userRole?: string;
  onLogout: () => void;
  isDarkMode?: boolean;
}

export default function UserAvatarDropdown({
  username,
  userRole,
  onLogout,
  isDarkMode = false,
}: UserAvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 ${
          isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center`}
        >
          <span className="text-primary font-medium">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <span
          className={`text-sm font-medium ${
            isDarkMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {username}
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 border
          ${
            isDarkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="py-1">
            {/* Chỉ hiển thị Dashboard nếu user là author */}
            {userRole === "author" && (
              <button
                onClick={() => {
                  router.push("/dashboard");
                  setOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-2 text-sm
                  ${
                    isDarkMode
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                  }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>
            )}
            <button
              onClick={() => {
                router.push("/profile");
                setOpen(false);
              }}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm
                ${
                  isDarkMode
                    ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                }`}
            >
              <User size={16} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm
                ${
                  isDarkMode
                    ? "text-red-400 hover:bg-slate-800 hover:text-red-300"
                    : "text-red-500 hover:bg-slate-100 hover:text-red-600"
                }`}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
