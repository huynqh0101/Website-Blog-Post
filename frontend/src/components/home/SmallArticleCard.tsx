"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon } from "lucide-react";

interface SmallArticleCardProps {
  category?: string;
  title: string;
  date: string;
  image?: string;
}

export const SmallArticleCard = ({
  category,
  title,
  date,
  image,
}: SmallArticleCardProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`flex gap-4 p-2 rounded-md transition-all duration-200 cursor-pointer group -mx-2 ${
        isDarkMode
          ? "hover:bg-gray-800 hover:shadow-md"
          : "hover:bg-gray-50 hover:shadow-sm"
      }`}
    >
      {image && (
        <div
          className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0 rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="flex-1">
        {category && (
          <div
            className={`text-[13px] font-normal mb-1 transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-400 group-hover:text-blue-400"
                : "text-[#6d757f] group-hover:text-[#22408a]"
            }`}
          >
            {category}
          </div>
        )}
        <h3
          className={`text-[17px] font-semibold mb-2 group-hover:underline transition-colors duration-200 ${
            isDarkMode
              ? "text-white group-hover:text-blue-400"
              : "text-[#183354] group-hover:text-[#22408a]"
          }`}
        >
          {title}
        </h3>
        <div
          className={`flex items-center gap-1 transition-colors duration-200 ${
            isDarkMode
              ? "text-gray-400 group-hover:text-blue-400"
              : "text-[#6d757f] group-hover:text-[#22408a]"
          }`}
        >
          <CalendarIcon className="w-[17px] h-4" />
          <span className="text-[13px] tracking-[0.52px]">{date}</span>
        </div>
      </div>
    </div>
  );
};
