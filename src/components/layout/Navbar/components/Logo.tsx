import Link from "next/link";
import { FiEdit3 } from "react-icons/fi"; // Icon bút viết
import { HiOutlineDocumentText } from "react-icons/hi"; // Icon tài liệu

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center group">
      <div className="relative flex items-center">
        {/* Logo icon */}
        <div className="relative mr-3">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
          <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-slate-800 border-2 border-blue-500">
            <HiOutlineDocumentText className="h-5 w-5 text-blue-500" />
            <FiEdit3 className="h-3 w-3 text-blue-400 absolute top-1 right-1 animate-pulse" />
          </div>
        </div>

        {/* Logo text */}
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-wide whitespace-nowrap font-sans text-blue-600 dark:text-blue-400 group-hover:tracking-wider transition-all duration-300">
            DAILY INSIGHT
          </span>
          <span className="text-xs uppercase tracking-widest font-medium text-slate-500 dark:text-slate-400 -mt-1">
            Articles & Blogs
          </span>
        </div>
      </div>
    </Link>
  );
};
