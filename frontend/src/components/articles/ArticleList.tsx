"use client";

import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import ArticleSkeleton from "../ui/article-skeleton";
import CategoryFilter from "../news/CategoryFilter";
import { ArticleCard } from "../ArticleCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Thêm import

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [direction, setDirection] = useState(0); // -1: đi về trước, 1: đi về sau, 0: khởi tạo

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;

    // Xác định hướng chuyển trang để áp dụng animation tương ứng
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
    setPage(1); // Khởi tạo lại trang khi đổi danh mục

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

      // Thêm tham số để lấy thông tin phân trang
      const response = await articleService.getAllArticlesWithPagination(
        9,
        pageNum
      );
      const newArticles = response.data;

      // Cập nhật thông tin tổng số trang
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

  // Tải trang đầu tiên khi component mount
  useEffect(() => {
    loadArticles(1, true);
  }, []);

  // Hàm tạo các nút phân trang
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5; // Số lượng nút trang hiển thị tối đa

    // Luôn hiển thị trang đầu tiên
    buttons.push(
      <Button
        key={1}
        onClick={() => handlePageChange(1)}
        variant={page === 1 ? "default" : "outline"}
        size="sm"
        className={`w-10 h-10 p-0 ${page === 1 ? "bg-primary text-white" : ""}`}
      >
        1
      </Button>
    );

    // Tính toán phạm vi trang hiển thị
    let startPage = Math.max(2, page - Math.floor((maxVisiblePages - 3) / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 4);

    // Điều chỉnh lại phạm vi nếu cần
    if (endPage - startPage < maxVisiblePages - 4) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 4));
    }

    // Hiển thị dấu ... nếu có nhiều trang ở đầu
    if (startPage > 2) {
      buttons.push(
        <Button
          key="start-ellipsis"
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Hiển thị các trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={page === i ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 p-0 ${
            page === i ? "bg-primary text-white" : ""
          }`}
        >
          {i}
        </Button>
      );
    }

    // Hiển thị dấu ... nếu có nhiều trang ở cuối
    if (endPage < totalPages - 1) {
      buttons.push(
        <Button
          key="end-ellipsis"
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0"
          disabled
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Luôn hiển thị trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          variant={page === totalPages ? "default" : "outline"}
          size="sm"
          className={`w-10 h-10 p-0 ${
            page === totalPages ? "bg-primary text-white" : ""
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <section className="container p-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Articles</h2>
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
                  <p className="text-lg text-gray-500">No articles found.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length > 0 && totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center space-y-4">
              <motion.div
                className="text-sm text-gray-500"
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
                  className="w-10 h-10 p-0"
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
                  className="w-10 h-10 p-0"
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
