"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import NewArticlePage from "@/components/articles/CreateArticlePage";

export default function CreateArticleRoute() {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50"
      }`}
    >
      <NewArticlePage />
    </div>
  );
}
