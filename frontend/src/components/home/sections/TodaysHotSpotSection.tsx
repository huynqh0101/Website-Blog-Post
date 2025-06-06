"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon, PlayIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface TodayHotSpotArticle {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  hasPlayButton?: boolean;
  slug: string;
}

interface TodaysHotSpotSectionProps {
  articles: TodayHotSpotArticle[];
}

export const TodaysHotSpotSection = ({
  articles,
}: TodaysHotSpotSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div className={`mb-12 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex items-center mb-6">
        <h2
          className={`text-[22px] font-bold transition-colors duration-300 relative ${
            isDarkMode
              ? "text-white hover:text-blue-400"
              : "text-[#183354] hover:text-[#22408a]"
          }`}
        >
          Today's Hot Spot
        </h2>
        <div
          className={`flex-1 ml-4 border-t border-b h-[5px] relative ${
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={`/articles/${article.slug}`}
            className="block"
          >
            <Card
              className={`border-0 rounded-none group cursor-pointer hover:shadow-md transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-750" : "bg-white"
              }`}
            >
              <CardContent className="p-0">
                <div
                  className="relative w-full h-[200px] bg-cover bg-center mb-3 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  {article.hasPlayButton && (
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-blue-600"
                          : "bg-white hover:bg-[#22408a]"
                      }`}
                    >
                      <PlayIcon
                        className={`w-4 h-[18px] transition-colors duration-300 ${
                          isDarkMode
                            ? "text-blue-400 group-hover:text-white"
                            : "text-[#f4796c] group-hover:text-white"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`text-[13px] font-normal mb-2 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 group-hover:text-blue-400"
                      : "text-[#6d757f] group-hover:text-[#22408a]"
                  }`}
                >
                  {article.category}
                </div>
                <h3
                  className={`text-lg font-bold mb-3 group-hover:underline transition-all duration-300 ${
                    isDarkMode
                      ? "text-white group-hover:text-blue-400"
                      : "text-[#183354] group-hover:text-[#22408a]"
                  }`}
                >
                  {article.title}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <UserIcon
                      className={`w-[17px] h-4 transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-[#6d757f] group-hover:text-[#22408a]"
                      }`}
                    />
                    <span
                      className={`text-[13px] tracking-[0.52px] transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-[#6d757f] group-hover:text-[#22408a]"
                      }`}
                    >
                      BY
                    </span>
                    <span
                      className={`text-[13px] tracking-[0.52px] transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-[#6d757f] group-hover:text-[#22408a]"
                      }`}
                    >
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon
                      className={`w-[17px] h-4 transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-[#6d757f] group-hover:text-[#22408a]"
                      }`}
                    />
                    <span
                      className={`text-[13px] tracking-[0.52px] transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-400 group-hover:text-blue-400"
                          : "text-[#6d757f] group-hover:text-[#22408a]"
                      }`}
                    >
                      {article.date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
