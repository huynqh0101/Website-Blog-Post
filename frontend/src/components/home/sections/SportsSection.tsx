"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon } from "lucide-react";

interface SportsSectionProps {
  sportsData: {
    featured: {
      category: string;
      title: string;
      date: string;
      image: string;
    };
    smallArticles: Array<{
      category: string;
      title: string;
      date: string;
      image: string;
    }>;
  };
}

export const SportsSection = ({ sportsData }: SportsSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div className={`mb-8 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <h2
        className={`text-[22px] font-bold mb-4 transition-colors duration-300 inline-block ${
          isDarkMode
            ? "text-white hover:text-blue-400"
            : "text-[#183354] hover:text-[#22408a]"
        }`}
      >
        Sports
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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Featured Article */}
        <div className="md:w-[630px] group cursor-pointer">
          <div
            className="w-full h-[378px] bg-cover bg-center mb-4 overflow-hidden transition-transform duration-500 hover:scale-[1.02] rounded-md"
            style={{
              backgroundImage: `url(${sportsData.featured.image})`,
            }}
          />
          <div
            className={`text-[13px] font-normal mb-2 transition-colors duration-300 ${
              isDarkMode
                ? "text-gray-400 group-hover:text-blue-400"
                : "text-[#6d757f] group-hover:text-[#22408a]"
            }`}
          >
            {sportsData.featured.category}
          </div>
          <h2
            className={`text-2xl font-bold mb-4 group-hover:underline transition-colors duration-300 ${
              isDarkMode
                ? "text-white group-hover:text-blue-400"
                : "text-[#183354] group-hover:text-[#22408a]"
            }`}
          >
            {sportsData.featured.title}
          </h2>
          <div
            className={`flex items-center gap-1 transition-colors duration-300 ${
              isDarkMode
                ? "text-gray-400 group-hover:text-blue-400"
                : "text-[#6d757f] group-hover:text-[#22408a]"
            }`}
          >
            <CalendarIcon className="w-[17px] h-4" />
            <span className="text-[13px] tracking-[0.52px]">
              {sportsData.featured.date}
            </span>
          </div>
        </div>

        {/* Small Articles */}
        <div className="md:w-[300px]">
          <div className="flex flex-col gap-6">
            {sportsData.smallArticles.map((article, index) => (
              <div
                key={index}
                className={`flex gap-4 group cursor-pointer p-2 transition-all duration-300 rounded-sm ${
                  isDarkMode
                    ? "hover:bg-gray-800 hover:shadow-md"
                    : "hover:shadow-sm hover:bg-gray-50"
                }`}
              >
                <div
                  className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.05] rounded-md"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
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
                    className={`text-[17px] font-semibold mb-2 group-hover:underline transition-colors duration-300 ${
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
