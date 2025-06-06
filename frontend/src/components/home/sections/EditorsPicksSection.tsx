"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EditorPickArticle {
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  hasPlayButton?: boolean;
}

interface EditorsPicksSectionProps {
  articles: EditorPickArticle[];
}

export const EditorsPicksSection = ({ articles }: EditorsPicksSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`w-full py-16 ${isDarkMode ? "bg-gray-800" : "bg-[#f9f9f9]"}`}
    >
      <div className="container max-w-[1320px] px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-[22px] font-bold hover:underline transition-all duration-200 ${
              isDarkMode
                ? "text-white hover:text-blue-400"
                : "text-[#183354] hover:text-[#22408a]"
            }`}
          >
            Editors' Picks
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`w-9 h-9 rounded transition-all duration-200 ${
                isDarkMode
                  ? "border-gray-600 hover:border-blue-400 hover:bg-gray-700"
                  : "border-[#cfcfcf] hover:border-[#22408a] hover:bg-white"
              }`}
            >
              <ChevronLeftIcon
                className={`w-[13px] h-3.5 ${
                  isDarkMode ? "text-blue-400" : "text-[#f4796c]"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`w-9 h-9 rounded transition-all duration-200 ${
                isDarkMode
                  ? "border-gray-600 hover:border-blue-400 hover:bg-gray-700"
                  : "border-[#cfcfcf] hover:border-[#22408a] hover:bg-white"
              }`}
            >
              <ChevronRightIcon
                className={`w-[13px] h-3.5 ${
                  isDarkMode ? "text-blue-400" : "text-[#f4796c]"
                }`}
              />
            </Button>
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Card
              key={index}
              className={`border-0 rounded-none group hover:shadow-md transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white"
              }`}
            >
              <CardContent className="p-0">
                <div
                  className="relative w-full h-60 bg-cover bg-center mb-4 overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  {article.hasPlayButton && (
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-blue-600"
                          : "bg-white hover:bg-[#22408a]"
                      }`}
                    >
                      <PlayIcon
                        className={`w-4 h-[18px] ${
                          isDarkMode
                            ? "text-blue-400 group-hover:text-white"
                            : "text-[#f4796c] group-hover:text-white"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`text-[13px] font-normal mb-2 transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 group-hover:text-blue-400"
                      : "text-[#6d757f] group-hover:text-[#22408a]"
                  }`}
                >
                  {article.category}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 group-hover:underline transition-colors duration-200 ${
                    isDarkMode
                      ? "text-white group-hover:text-blue-400"
                      : "text-[#183354] group-hover:text-[#22408a]"
                  }`}
                >
                  {article.title}
                </h3>
                <div className="flex items-center gap-4">
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
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
