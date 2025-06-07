"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon } from "lucide-react";

interface TopRankedArticlesProps {
  articles: Array<{
    number: string;
    title: string;
    date: string;
  }>;
  isDarkMode?: boolean;
}

export const TopRankedArticles = ({
  articles,
  isDarkMode: propIsDarkMode,
}: TopRankedArticlesProps) => {
  const themeContext = useContext(ThemeContext);
  const contextIsDarkMode = themeContext?.isDarkMode || false;
  const isDarkMode =
    propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode;

  return (
    <div>
      {articles.map((article, index) => (
        <div
          key={index}
          className={`p-4 mb-3 hover:shadow-sm transition-all duration-200 cursor-pointer group ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-750"
              : "bg-[#f9f9f7] hover:bg-gray-50"
          }`}
        >
          <div className="flex gap-4">
            <span
              className={`text-[26px] font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-blue-400 group-hover:text-blue-300"
                  : "text-[#c2c2c2] group-hover:text-[#22408a]"
              }`}
            >
              {article.number}
            </span>
            <div>
              <h3
                className={`text-[17px] font-semibold mb-2 hover:underline transition-colors duration-200 ${
                  isDarkMode
                    ? "text-white hover:text-blue-400"
                    : "text-[#183354] hover:text-[#22408a]"
                }`}
              >
                {article.title}
              </h3>
              <div className="flex items-center gap-1">
                <CalendarIcon
                  className={`w-[17px] h-4 ${
                    isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                  }`}
                />
                <span
                  className={`text-[13px] tracking-[0.52px] ${
                    isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                  }`}
                >
                  {article.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
