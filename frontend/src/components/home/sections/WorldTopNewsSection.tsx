"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react";

interface WorldTopNewsArticle {
  featured: {
    category: string;
    title: string;
    date: string;
    readTime: string;
    description: string;
    image: string;
    hasPlayButton?: boolean;
  };
  smallArticles: Array<{
    category: string;
    title: string;
    date: string;
    image: string;
  }>;
}

interface WorldTopNewsSectionProps {
  worldTopNewsArticles: WorldTopNewsArticle;
}

export const WorldTopNewsSection = ({
  worldTopNewsArticles,
}: WorldTopNewsSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div className={`mb-8 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <h2
        className={`text-[22px] font-bold mb-4 transition-colors duration-300 ${
          isDarkMode
            ? "text-white hover:text-blue-400"
            : "text-[#183354] hover:text-[#22408a]"
        }`}
      >
        World Top News
      </h2>
      <div
        className={`border-t border-b h-[5px] relative mb-8 ${
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

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div
          className="relative md:w-[460px] h-80 bg-cover bg-center cursor-pointer transition-transform duration-300 hover:shadow-lg rounded-md overflow-hidden"
          style={{
            backgroundImage: `url(${worldTopNewsArticles.featured.image})`,
          }}
        >
          {worldTopNewsArticles.featured.hasPlayButton && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-[#f8f8f8]"
              }`}
            >
              <PlayIcon
                className={`w-4 h-[18px] ${
                  isDarkMode ? "text-blue-400" : "text-[#f4796c]"
                }`}
              />
            </div>
          )}
        </div>
        <div className="md:w-[460px]">
          <div
            className={`text-[13px] font-normal mb-2 cursor-pointer transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-400 hover:text-blue-400"
                : "text-[#6d757f] hover:text-[#22408a]"
            }`}
          >
            {worldTopNewsArticles.featured.category}
          </div>
          <h2
            className={`text-2xl font-bold mb-4 cursor-pointer transition-colors duration-200 hover:underline ${
              isDarkMode
                ? "text-white hover:text-blue-400"
                : "text-[#183354] hover:text-[#22408a]"
            }`}
          >
            {worldTopNewsArticles.featured.title}
          </h2>
          <div className="flex items-center gap-4 mb-4">
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
                {worldTopNewsArticles.featured.date}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon
                className={`w-[17px] h-4 ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              />
              <span
                className={`text-[13px] tracking-[0.52px] ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              >
                {worldTopNewsArticles.featured.readTime}
              </span>
            </div>
          </div>
          <p
            className={`text-base leading-7 mb-4 ${
              isDarkMode ? "text-gray-300" : "text-[#545e69]"
            }`}
          >
            {worldTopNewsArticles.featured.description}
          </p>
          <Button
            variant="outline"
            className={`rounded border flex items-center gap-2 group transition-colors duration-200 ${
              isDarkMode
                ? "border-gray-600 hover:border-blue-400 bg-gray-800 hover:bg-gray-700"
                : "border-[#cfcfcf] hover:border-[#22408a] bg-white"
            }`}
          >
            <span
              className={`text-sm font-medium group-hover:underline transition-colors duration-200 ${
                isDarkMode
                  ? "text-white group-hover:text-blue-400"
                  : "text-[#183354] group-hover:text-[#22408a]"
              }`}
            >
              READ MORE
            </span>
            <ChevronRightIcon
              className={`w-2.5 h-2.5 transition-colors duration-200 ${
                isDarkMode
                  ? "text-white group-hover:text-blue-400"
                  : "text-[#183354] group-hover:text-[#22408a]"
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {worldTopNewsArticles.smallArticles.map((article, index) => (
          <div
            key={index}
            className={`flex gap-4 p-2 rounded-md transition-colors duration-200 cursor-pointer -mx-2 ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-[#f9f9f7]"
            }`}
          >
            <div className="flex-1">
              <div
                className={`text-[13px] font-normal mb-2 transition-colors duration-200 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-[#6d757f] hover:text-[#22408a]"
                }`}
              >
                {article.category}
              </div>
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
            <div
              className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0 transition-transform duration-300 hover:shadow-md hover:scale-105 rounded-md overflow-hidden"
              style={{ backgroundImage: `url(${article.image})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
