"use client";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Article } from "@/types/articleAdmin";

interface AuthorProfileProps {
  articles: Article[];
}

export const AuthorProfile = ({ articles }: AuthorProfileProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  if (articles.length === 0) return null;

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
        Author Profile
      </h2>
      <div>
        <div className="flex items-center mb-3">
          {(() => {
            // Lấy thông tin author từ localStorage
            const currentAuthorString = localStorage.getItem("currentAuthor");
            let avatarUrl = "";

            if (currentAuthorString) {
              try {
                const currentAuthor = JSON.parse(currentAuthorString);
                // Sử dụng avatar từ localStorage nếu có
                if (currentAuthor.avatar) {
                  avatarUrl = currentAuthor.avatar;
                }
              } catch (e) {
                console.error(
                  "Error parsing currentAuthor from localStorage:",
                  e
                );
              }
            }

            return avatarUrl ? (
              <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
                <Image
                  src={avatarUrl}
                  alt={articles[0].author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              // Fallback về chữ cái đầu khi không có avatar
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium mr-3 ${
                  isDarkMode ? "bg-blue-600" : "bg-[#3a5b22]"
                }`}
              >
                {articles[0].author.name.charAt(0)}
              </div>
            );
          })()}
          <div>
            <p
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {articles[0].author.name}
            </p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {articles[0].author.email}
            </p>
          </div>
        </div>
        {articles[0].author.bio && (
          <p
            className={`text-sm mt-2 line-clamp-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {articles[0].author.bio}
          </p>
        )}
      </div>
    </div>
  );
};
