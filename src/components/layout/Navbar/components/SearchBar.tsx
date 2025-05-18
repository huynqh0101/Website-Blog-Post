import { Search } from "lucide-react";
import { useRef, useEffect } from "react";

interface SearchBarProps {
  isSearchVisible: boolean;
  setIsSearchVisible: (value: boolean) => void;
}

export const SearchBar = ({
  isSearchVisible,
  setIsSearchVisible,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input khi trở nên visible và xử lý hiệu ứng outline
  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

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
          ref={inputRef}
          type="text"
          placeholder="Search articles..."
          className="w-full py-1.5 pl-9 pr-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-0 text-sm"
          onBlur={(e) => {
            // Ngăn onBlur kích hoạt nếu người dùng click vào icon search
            if (!e.relatedTarget?.closest(".search-container")) {
              setIsSearchVisible(false);
            }
          }}
        />
        <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
};
