"use client";

import { useEffect, useState, useCallback, useContext } from "react";
import { Article, ArticleResponse } from "@/types/articleAdmin";
import { ArticleStats } from "./components/ArticleStats";
import { QuickActions } from "./components/QuickActions";
import { AuthorProfile } from "./components/AuthorProfile";
import { RecentArticles } from "./components/RecentArticles";
import { useAuth } from "@/context/authContext";
import { ThemeContext } from "@/context/themeContext";

export const DashboardContent = () => {
  const { user } = useAuth();
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    if (!user?.email) {
      setIsLoading(false);
      setError("You need to login to view your articles");
      return;
    }

    try {
      setIsLoading(true);
      // Encode email để tránh các ký tự đặc biệt trong URL
      const encodedEmail = encodeURIComponent(user.email);
      const token = localStorage.getItem("token"); // hoặc tên khác mà bạn lưu token

      // Log để debug
      console.log("Fetching articles for email:", user.email);

      const response = await fetch(
        `http://localhost:1337/api/articles?filters[author][email][$eq]=${encodedEmail}&populate[author]=true&populate[cover]=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`API error: ${response.status} ${response.statusText}`);
        setArticles([]); // Đặt mảng rỗng thay vì throw error
        return; // Thoát khỏi hàm mà không ném lỗi
      }

      const data: ArticleResponse = await response.json();

      if (data.data && Array.isArray(data.data)) {
        setArticles(data.data);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setArticles([]); // Đặt mảng rỗng
      // Bỏ dòng toast.error() để không hiển thị thông báo lỗi
    } finally {
      setIsLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate statistics
  const totalArticles = articles.length;
  const publishedArticles = articles.filter(
    (article) => article.publishedAt
  ).length;
  const draftArticles = totalArticles - publishedArticles;

  if (error && !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className={`p-4 rounded-lg shadow ${
            isDarkMode
              ? "bg-amber-900/50 text-amber-300 border border-amber-800"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          {error}. Please login to view your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Articles Stats */}
      <ArticleStats
        totalArticles={totalArticles}
        publishedArticles={publishedArticles}
        draftArticles={draftArticles}
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Author Profile */}
      <AuthorProfile articles={articles} />

      {/* Recent Articles */}
      <RecentArticles
        articles={articles}
        isLoading={isLoading}
        error={error}
        formatDate={formatDate}
      />
    </div>
  );
};
