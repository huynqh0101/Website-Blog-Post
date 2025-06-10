"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon } from "lucide-react";
import { Advertisement } from "../Advertisement";

interface TopStoryArticle {
  category: string;
  title: string;
  date: string;
  image: string;
}

interface TopStoriesSectionProps {
  articles: TopStoryArticle[];
}

export const TopStoriesSection = ({ articles }: TopStoriesSectionProps) => {
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
        Top Stories
      </h2>

      {articles.map((article, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 pb-6 ${
            index < articles.length - 1
              ? isDarkMode
                ? "border-b border-gray-600 mb-6"
                : "border-b border-[#dfdfdf] mb-6"
              : ""
          } cursor-pointer transition-all duration-200 p-2 rounded-md -mx-2 group ${
            isDarkMode
              ? "hover:bg-gray-800 hover:shadow-md"
              : "hover:bg-[#f9f9f7] hover:shadow-sm"
          }`}
        >
          <div className="flex-1">
            <div
              className={`text-[13px] font-normal mb-1 transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-400 group-hover:text-blue-400"
                  : "text-[#6d757f] group-hover:text-[#22408a]"
              }`}
            >
              {article.category}
            </div>
            <h3
              className={`text-[17px] font-semibold mb-2 group-hover:underline transition-colors duration-200 ${
                isDarkMode
                  ? "text-white group-hover:text-blue-400"
                  : "text-[#183354] group-hover:text-[#22408a]"
              }`}
            >
              {article.title}
            </h3>
            <div
              className={`flex items-center gap-1 transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-400 group-hover:text-blue-400"
                  : "text-[#6d757f] group-hover:text-[#22408a]"
              }`}
            >
              <CalendarIcon className="w-[17px] h-4" />
              <span className="text-[13px] tracking-[0.52px]">
                {article.date}
              </span>
            </div>
          </div>
          <div
            className={`w-[90px] h-[90px] rounded-full bg-cover bg-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 overflow-hidden ${
              isDarkMode
                ? "group-hover:shadow-lg shadow-gray-900/50"
                : "group-hover:shadow-md"
            }`}
            style={{ backgroundImage: `url(${article.image})` }}
          />
        </div>
      ))}
    </div>
  );
};
