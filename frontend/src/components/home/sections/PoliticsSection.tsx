"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface PoliticsSectionProps {
  articles: Array<{
    category?: string;
    title: string;
    author?: string;
    date: string;
    description?: string;
    image?: string;
    id?: string;
    slug?: string;
  }>;
}

export const PoliticsSection = ({ articles }: PoliticsSectionProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className={`mb-8 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex items-center mb-4">
        <h2
          className={`text-[22px] font-bold ${
            isDarkMode ? "text-white" : "text-[#183354]"
          }`}
        >
          Politics
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

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-[653px]">
          <div className="flex flex-col md:flex-row gap-6">
            <Link
              href={`/articles/${mainArticle.slug}`}
              className="block w-full md:w-[330px]"
            >
              <div
                className="w-full h-[295px] bg-cover bg-center rounded-md overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                style={{ backgroundImage: `url(${mainArticle.image})` }}
              />
            </Link>
            <div className="flex flex-col">
              <div
                className={`text-[13px] font-normal mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              >
                {mainArticle.category}
              </div>
              <Link href={`/articles/${mainArticle.slug}`}>
                <h3
                  className={`text-xl font-extrabold mb-4 hover:underline cursor-pointer transition-colors duration-200 ${
                    isDarkMode
                      ? "text-white hover:text-blue-400"
                      : "text-[#183354] hover:text-[#22408a]"
                  }`}
                >
                  {mainArticle.title}
                </h3>
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <UserIcon
                    className={`w-[17px] h-4 ${
                      isDarkMode ? "text-gray-400" : "text-[#6d757f]"
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
                    className={`text-[13px] tracking-[0.52px] ${
                      isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                    }`}
                  >
                    {mainArticle.author}
                  </span>
                </div>
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
                    {mainArticle.date}
                  </span>
                </div>
              </div>
              <p
                className={`text-base leading-7 mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-[#545e69]"
                }`}
              >
                {mainArticle.description}
              </p>
              <Link href={`/articles/${mainArticle.slug}`}>
                <Button
                  variant="outline"
                  className={`w-[138px] h-9 rounded border flex items-center gap-2 group transition-colors duration-200 ${
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
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`md:w-[267px] border-l pl-6 ${
            isDarkMode ? "border-gray-600" : "border-[#dfdfdf]"
          }`}
        >
          <div className="flex flex-col gap-4">
            {sideArticles.map((article, index) => (
              <div
                key={index}
                className={`pb-4 ${
                  index < sideArticles.length - 1
                    ? isDarkMode
                      ? "border-b border-gray-600"
                      : "border-b border-[#dfdfdf]"
                    : ""
                }`}
              >
                <Link href={`/articles/${article.slug}`}>
                  <h3
                    className={`text-lg font-semibold mb-2 hover:underline cursor-pointer transition-colors duration-200 ${
                      isDarkMode
                        ? "text-white hover:text-blue-400"
                        : "text-[#183354] hover:text-[#22408a]"
                    }`}
                  >
                    {article.title}
                  </h3>
                </Link>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
