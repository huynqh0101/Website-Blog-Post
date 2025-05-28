import { useState, useEffect } from "react";
import { Article } from "@/types/articleAdmin";
import { ArticleCard } from "./ArticleCard";
import Link from "next/link";

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

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  const handleDeleteArticle = (deletedId: string) => {
    setArticles(articles.filter((article) => article.documentId !== deletedId));
  };

  return (
    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Recent Articles</h2>
        <Link
          href="/dashboard/my-articles"
          className="text-sm text-blue-600 hover:text-indigo-500 hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
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
