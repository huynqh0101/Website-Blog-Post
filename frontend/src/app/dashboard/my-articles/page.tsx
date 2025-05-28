"use client";

import { useState, useEffect, useCallback } from "react";
import { Article, ArticleResponse } from "@/types/articleAdmin";
import { ArticleCard } from "@/components/dashboard/components/ArticleCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

export default function MyArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const articlesPerPage = 9;

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

      // Build the filter query based on category and user's email
      let filterQuery = `filters[author][email][$eq]=${encodedEmail}`;
      if (selectedCategory) {
        filterQuery += `&filters[category][name][$eq]=${selectedCategory}`;
      }

      // Fetch articles with pagination and category filtering
      const response = await fetch(
        `http://localhost:1337/api/articles?${filterQuery}&populate[author]=true&populate[cover]=true&populate[category]=true&pagination[page]=${currentPage}&pagination[pageSize]=${articlesPerPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data: ArticleResponse = await response.json();
      console.log("Fetched articles:", data);
      setArticles(data.data);

      // Calculate total pages from the pagination metadata
      if (data.meta?.pagination) {
        setTotalPages(data.meta.pagination.pageCount);
      }
    } catch (err) {
      setError("Error loading articles. Please try again later.");
      console.error("Error fetching articles:", err);
      toast.error("Could not load your articles");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, selectedCategory, user?.email]);

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

  const handleDeleteArticle = (deletedId: string) => {
    setArticles(articles.filter((article) => article.documentId !== deletedId));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  if (!user) {
    return (
      <div className="lg:ml-[200px] p-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-center py-8 text-gray-500">
            Please login to view your articles.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-[200px] p-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 mt-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">My Articles</h1>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {selectedCategory
              ? `No articles found in the "${selectedCategory}" category.`
              : "No articles found. Start writing your first article!"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.documentId}
                  article={article}
                  formatDate={formatDate}
                  onDelete={handleDeleteArticle}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
