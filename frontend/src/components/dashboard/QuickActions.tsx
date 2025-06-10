"use client";
import Link from "next/link";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

export const QuickActions = () => {
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
        Quick Actions
      </h2>
      <div className="space-y-3">
        <Link
          href="/dashboard/new-article"
          className={`flex items-center p-3 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-[#f6f8ff] hover:bg-[#eef2ff]"
          }`}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className={`font-medium text-sm ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Create New Article
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Start writing a new article
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/my-articles"
          className={`flex items-center p-3 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-[#f6f8ff] hover:bg-[#eef2ff]"
          }`}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className={`font-medium text-sm ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              View All Articles
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your articles
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
