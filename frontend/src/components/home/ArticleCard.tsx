"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { CalendarIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  author?: string;
  date: string;
  image: string;
  className?: string;
  slug: string;
}

export const ArticleCard = ({
  category,
  title,
  author,
  date,
  image,
  className = "",
  slug,
}: ArticleCardProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <Link href={`/articles/${slug}`} className="block">
      <Card
        className={`border-0 rounded-none transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 hover:bg-gray-750 hover:shadow-lg"
            : "bg-white hover:shadow-sm"
        } ${className}`}
      >
        <CardContent className="p-0">
          <div
            className="w-full h-[180px] bg-cover bg-center mb-4 transition-transform duration-500 hover:scale-[1.02] cursor-pointer rounded-md overflow-hidden"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            className={`text-[13px] font-normal mb-2 cursor-pointer transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-400 hover:text-blue-400"
                : "text-[#6d757f] hover:text-[#22408a]"
            }`}
          >
            {category}
          </div>
          <h3
            className={`text-lg font-bold mb-3 cursor-pointer transition-colors duration-200 hover:underline ${
              isDarkMode
                ? "text-white hover:text-blue-400"
                : "text-[#183354] hover:text-[#22408a]"
            }`}
          >
            {title}
          </h3>
          <div className="flex items-center gap-4">
            {author && (
              <div className="flex items-center gap-1 group">
                <UserIcon
                  className={`w-[17px] h-4 transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 group-hover:text-blue-400"
                      : "text-[#6d757f] group-hover:text-[#22408a]"
                  }`}
                />
                <span
                  className={`text-[13px] tracking-[0.52px] ${
                    isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                  }`}
                >
                  BY
                </span>
                <span
                  className={`text-[13px] tracking-[0.52px] cursor-pointer transition-colors duration-200 hover:underline ${
                    isDarkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-[#6d757f] hover:text-[#22408a]"
                  }`}
                >
                  {author}
                </span>
              </div>
            )}
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
                {date}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
