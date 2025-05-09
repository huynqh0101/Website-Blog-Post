import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle = ({ isDarkMode, toggleTheme }: ThemeToggleProps) => {
  return (
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
  );
};
