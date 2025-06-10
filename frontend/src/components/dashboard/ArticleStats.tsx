"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

interface ArticleStatsProps {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
}

export const ArticleStats = ({
  totalArticles,
  publishedArticles,
  draftArticles,
}: ArticleStatsProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`p-6 rounded-xl shadow-sm ${
        isDarkMode ? "bg-gray-800 shadow-gray-900/20" : "bg-white"
      }`}
    >
      <h2
        className={`text-lg font-medium mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Article Statistics
      </h2>
      <div className="flex justify-between mb-3">
        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Total Articles
        </span>
        <span
          className={`font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {totalArticles}
        </span>
      </div>
      <div className="flex justify-between mb-3">
        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Published
        </span>
        <span
          className={`font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {publishedArticles}
        </span>
      </div>
      <div className="flex justify-between">
        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Draft
        </span>
        <span
          className={`font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {draftArticles}
        </span>
      </div>
    </div>
  );
};
