"use client";

import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import ArticleSkeleton from "../ui/article-skeleton";
import CategoryFilter from "../news/CategoryFilter";
import { ArticleCard } from "../ArticleCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [direction, setDirection] = useState(0);

  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
    loadArticles(newPage, true);
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const handleArticleClick = (article: Article) => {
    if (article.author) {
      const authorData = {
        id: article.author.id,
        name: article.author.name,
        avatar: article.author.avatar?.formats?.thumbnail?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.author.avatar.formats.thumbnail.url}`
          : null,
      };
      localStorage.setItem("currentAuthor", JSON.stringify(authorData));
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);

    if (!category) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article: Article) => article.category?.name === category
      );
      setFilteredArticles(filtered);
    }
  };

  const loadArticles = async (pageNum = 1, reset = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await articleService.getAllArticlesWithPagination(
        9,
        pageNum
      );
      const newArticles = response.data;

      setTotalPages(response.meta.pagination.pageCount);

      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        if (reset) {
          setArticles(newArticles);
          setFilteredArticles(
            selectedCategory
              ? newArticles.filter(
                  (article: Article) =>
                    article.category?.name === selectedCategory
                )
              : newArticles
          );
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
          setFilteredArticles((prev) => {
            const combined = [...prev, ...newArticles];
            return selectedCategory
              ? combined.filter(
                  (article: Article) =>
                    article.category?.name === selectedCategory
                )
              : combined;
          });
        }
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadArticles(1, true);
  }, []);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // Trang đầu tiên
    buttons.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        variant={page === 1 ? "default" : "outline"}
        size="sm"
        className={`w-10 h-10 p-0 transition-colors ${
          page === 1
            ? isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-primary text-white hover:bg-primary/90"
            : isDarkMode
            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        1
      </Button>
    );

    let startPage = Math.max(2, page - Math.floor((maxVisiblePages - 3) / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 4);

    if (endPage - startPage < maxVisiblePages - 4) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 4));
    }

    // Dấu ... đầu
    if (startPage > 2) {
      buttons.push(
        <Button
          key="start-ellipsis"
          variant="ghost"
          size="sm"
          className={`w-10 h-10 p-0 ${
            isDarkMode
              ? "text-gray-500 hover:text-gray-400"
              : "text-gray-400 hover:text-gray-500"
          }`}
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Các trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={page === i ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 p-0 transition-colors ${
            page === i
              ? isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-primary text-white hover:bg-primary/90"
              : isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </Button>
      );
    }

    // Dấu ... cuối
    if (endPage < totalPages - 1) {
      buttons.push(
        <Button
          key="end-ellipsis"
          variant="ghost"
          size="sm"
          className={`w-10 h-10 p-0 ${
            isDarkMode
              ? "text-gray-500 hover:text-gray-400"
              : "text-gray-400 hover:text-gray-500"
          }`}
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Trang cuối cùng
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={page === totalPages ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 p-0 transition-colors ${
            page === totalPages
              ? isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-primary text-white hover:bg-primary/90"
              : isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <section
      className={`container p-4 mx-auto ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold transition-colors ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Articles
        </h2>
        <div className="flex-shrink-0">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ArticleSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ArticleCard
                      article={article}
                      onArticleClick={handleArticleClick}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p
                    className={`text-lg transition-colors ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No articles found.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length > 0 && totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center space-y-4">
              <motion.div
                className={`text-sm transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Showing page {page} of {totalPages}
              </motion.div>
              <nav className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`w-10 h-10 p-0 transition-colors ${
                    page === 1
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {renderPaginationButtons()}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages}
                  className={`w-10 h-10 p-0 transition-colors ${
                    page === totalPages
                      ? isDarkMode
                        ? "bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          )}
        </>
      )}
    </section>
  );
}
