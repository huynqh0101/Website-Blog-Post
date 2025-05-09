import { Search } from "lucide-react";

interface SearchBarProps {
  isSearchVisible: boolean;
  setIsSearchVisible: (value: boolean) => void;
}

export const SearchBar = ({
  isSearchVisible,
  setIsSearchVisible,
}: SearchBarProps) => {
  return (
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
  );
};
