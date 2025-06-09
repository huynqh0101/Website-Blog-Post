"use client";
import { useState, useEffect, useContext } from "react";
import { Article } from "@/types/articleAdmin";
import { ArticleCard } from "./ArticleCard";
import Link from "next/link";
import { ThemeContext } from "@/context/themeContext";

interface RecentArticlesProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  formatDate: (dateString: string) => string;
}

export const RecentArticles = ({
  articles: initialArticles,
  isLoading,
  error,
  formatDate,
}: RecentArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  const handleDeleteArticle = (deletedId: string) => {
    setArticles(articles.filter((article) => article.documentId !== deletedId));
  };

  return (
    <div
      className={`lg:col-span-3 p-6 rounded-xl shadow-sm ${
        isDarkMode ? "bg-gray-800 shadow-gray-900/20" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Articles
        </h2>
        <Link
          href="/dashboard/my-articles"
          className={`text-sm hover:underline transition-colors ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-indigo-500"
          }`}
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-6">
          <div
            className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 ${
              isDarkMode ? "border-blue-400" : "border-blue-500"
            }`}
          ></div>
        </div>
      ) : error ? (
        <div
          className={`p-4 rounded-lg ${
            isDarkMode
              ? "bg-red-900/50 text-red-300 border border-red-800"
              : "bg-red-50 text-red-600"
          }`}
        >
          {error}
        </div>
      ) : articles.length === 0 ? (
        <div
          className={`text-center py-8 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No articles found. Start writing your first article!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard
              key={article.documentId}
              article={article}
              formatDate={formatDate}
              onDelete={handleDeleteArticle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
