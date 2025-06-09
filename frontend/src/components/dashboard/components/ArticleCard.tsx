"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Article } from "@/types/articleAdmin";
import { toast } from "sonner";
import { useState, useContext } from "react";
import { useAuth } from "@/context/authContext";
import { ThemeContext } from "@/context/themeContext";

interface ArticleCardProps {
  article: Article;
  formatDate: (dateString: string) => string;
  onDelete?: (id: string) => void;
}

export const ArticleCard = ({
  article,
  formatDate,
  onDelete,
}: ArticleCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (confirm("Are you sure you want to delete this article?")) {
      try {
        setIsDeleting(true);

        // Lấy token từ localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Authorization token not found. Please log in again.");
          return;
        }

        // Gọi API để xóa bài viết
        const response = await fetch(
          `http://localhost:1337/api/articles/${article.documentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete article");
        }

        toast.success("Article deleted successfully");

        // Cập nhật UI sau khi xóa
        if (onDelete) {
          onDelete(article.documentId);
        }
      } catch (error) {
        console.error("Error deleting article:", error);
        toast.error("An error occurred while deleting the article");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow relative ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:shadow-gray-900/20"
          : "bg-white border-gray-200"
      }`}
    >
      <Link href={`/dashboard/article/${article.documentId}`} className="block">
        <div className="relative h-40 w-full">
          <Image
            src={`http://localhost:1337${article.cover.url}`}
            alt={article.title}
            fill
            className="object-cover"
          />
          {!article.publishedAt && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-md">
              Draft
            </div>
          )}
        </div>
        <div className="p-4">
          <h3
            className={`font-medium text-base line-clamp-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </h3>
          <p
            className={`text-sm mt-1 line-clamp-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {article.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              {article.publishedAt
                ? `Published: ${formatDate(article.publishedAt)}`
                : `Created: ${formatDate(article.createdAt)}`}
            </span>

            {/* Action buttons in bottom-right corner */}
            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  router.push(`/dashboard/edit-article/${article.documentId}`);
                }}
                className={`p-1 rounded-full transition-all ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                title="Edit article"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`p-1 rounded-full transition-all ${
                  isDeleting
                    ? isDarkMode
                      ? "bg-gray-800 cursor-not-allowed"
                      : "bg-gray-200 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                title="Delete article"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    isDeleting
                      ? isDarkMode
                        ? "text-gray-600"
                        : "text-gray-400"
                      : "text-red-600"
                  }`}
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
