"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon } from "lucide-react";
import { TopRankedArticles } from "../sidebars/TopRankedArticles";

interface TopRankedArticle {
  number: string;
  title: string;
  date: string;
}

interface TopRankedSectionProps {
  articles: TopRankedArticle[];
}

export const TopRankedSection = ({ articles }: TopRankedSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div className={`mb-8 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div
        className={`border-t border-b h-[5px] relative mb-4 ${
          isDarkMode ? "border-gray-600" : "border-[#dfdfdf]"
        }`}
      >
        <div className="absolute top-0 left-0 w-10 h-[5px] bg-blue-600"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group.svg"
        />
      </div>
      <h2
        className={`text-[22px] font-bold mb-6 transition-colors duration-300 ${
          isDarkMode
            ? "text-white hover:text-blue-400"
            : "text-[#183354] hover:text-[#22408a]"
        }`}
      >
        Top Ranked
      </h2>
      <TopRankedArticles articles={articles} />
    </div>
  );
};
