"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { FaCalendarAlt } from "react-icons/fa";

interface ArticleCardProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function ArticleCard({ article, onArticleClick }: ArticleCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  // Helper function để lấy URL ảnh tốt nhất có sẵn
  const getCoverImageUrl = () => {
    if (!article.cover) return null;

    // Kiểm tra các format theo thứ tự ưu tiên
    if (article.cover.formats?.medium?.url) {
      return `${API_URL}${article.cover.formats.medium.url}`;
    }
    if (article.cover.formats?.small?.url) {
      return `${API_URL}${article.cover.formats.small.url}`;
    }
    if (article.cover.formats?.thumbnail?.url) {
      return `${API_URL}${article.cover.formats.thumbnail.url}`;
    }

    // Nếu không có format nào, dùng URL gốc
    if (article.cover.url) {
      return `${API_URL}${article.cover.url}`;
    }

    // Không có URL nào
    return null;
  };

  const coverImageUrl = getCoverImageUrl();

  return (
    <Link
      href={`/articles/${article.slug}`}
      onClick={() => onArticleClick && onArticleClick(article)}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="relative overflow-hidden">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={article.cover?.alternativeText || article.title}
            width={500}
            height={300}
            className="object-cover w-full aspect-[16/9] transform transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full aspect-[16/9] flex items-center justify-center ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-800"
                : "bg-gradient-to-br from-gray-100 to-gray-200"
            }`}
          >
            <span
              className={`${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
            >
              No image available
            </span>
          </div>
        )}

        {article.category && (
          <div className="absolute top-4 left-4">
            <span
              className={`text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${
                isDarkMode ? "bg-blue-600/90" : "bg-primary/90"
              }`}
            >
              {article.category.name}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 space-y-3 flex-grow flex flex-col relative">
        <div className="absolute -top-8 right-4 transform transition-transform duration-300 group-hover:scale-110">
          {article.author?.avatar?.formats?.thumbnail?.url ? (
            <Image
              src={`${API_URL}${article.author.avatar.formats.thumbnail.url}`}
              alt={article.author.name}
              width={48}
              height={48}
              className={`rounded-full aspect-square object-cover border-4 shadow-md ${
                isDarkMode ? "border-gray-800" : "border-white"
              }`}
            />
          ) : (
            <div
              className={`rounded-full w-12 h-12 flex items-center justify-center border-4 shadow-md ${
                isDarkMode
                  ? "bg-blue-600/20 border-gray-800"
                  : "bg-primary/10 border-white"
              }`}
            >
              <span
                className={`text-base font-medium ${
                  isDarkMode ? "text-blue-400" : "text-primary"
                }`}
              >
                {article.author?.name?.charAt(0) || "U"}
              </span>
            </div>
          )}
        </div>

        <h3
          className={`text-lg md:text-xl font-semibold transition-colors duration-300 line-clamp-2 mt-4 ${
            isDarkMode
              ? "text-white group-hover:text-blue-400"
              : "text-gray-900 group-hover:text-primary"
          }`}
        >
          {article.title}
        </h3>

        <div
          className={`flex justify-between items-center text-xs ${
            isDarkMode ? "text-gray-400" : "text-muted-foreground"
          }`}
        >
          <time
            className={`transition-colors duration-300 flex items-center gap-1 ${
              isDarkMode
                ? "group-hover:text-blue-400"
                : "group-hover:text-primary/80"
            }`}
          >
            <FaCalendarAlt
              className={`transition-colors ${
                isDarkMode
                  ? "text-gray-500 group-hover:text-blue-400"
                  : "text-gray-400 group-hover:text-primary/80"
              }`}
            />
            {formatDate(article.publishedAt)}
          </time>
          {article.author && (
            <span
              className={`font-medium transition-colors duration-300 ${
                isDarkMode
                  ? "group-hover:text-blue-400"
                  : "group-hover:text-primary/80"
              }`}
            >
              {article.author.name}
            </span>
          )}
        </div>

        <p
          className={`text-sm line-clamp-2 transition-colors duration-300 flex-grow ${
            isDarkMode
              ? "text-gray-300 group-hover:text-gray-200"
              : "text-muted-foreground group-hover:text-gray-700"
          }`}
        >
          {article.description}
        </p>
      </div>
    </Link>
  );
}
