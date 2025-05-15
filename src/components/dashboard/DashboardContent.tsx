"use client";

import { useEffect, useState } from "react";
import { Article, ArticleResponse } from "@/types/articleAdmin";
import { ArticleStats } from "./components/ArticleStats";
import { QuickActions } from "./components/QuickActions";
import { AuthorProfile } from "./components/AuthorProfile";
import { RecentArticles } from "./components/RecentArticles";

export const DashboardContent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:1337/api/articles?filters[author][id][$eq]=2&populate[author]=true&populate[cover]=true"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data: ArticleResponse = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError("Error loading articles. Please try again later.");
        console.error("Error fetching articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
