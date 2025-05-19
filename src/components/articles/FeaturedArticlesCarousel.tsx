"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import newsData from "@/constants/newsData";

export const FeaturedArticlesCarousel = () => {
  // Sử dụng useMemo để tránh tính toán lại mỗi lần render
  const featuredArticles = useMemo(() => {
    // Tạo mảng các bài viết có đủ thông tin để hiển thị
    const articles = [...newsData.articlesNews].filter(Boolean); // Lọc ra các giá trị null/undefined

    // Lọc ra những bài có hình ảnh
    return articles.filter((article) => !!article.image);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = featuredArticles.length - 1;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
    resetTimer();
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  // Nếu không có đủ bài viết, hiển thị placeholder
  if (featuredArticles.length === 0) {
    return (
      <div className="relative h-[360px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          No featured articles available
        </p>
      </div>
    );
  }

  // Hàm để lấy mô tả an toàn từ bài viết
  const getSafeDescription = (article: any) => {
    return (
      article.description ||
      article.excerpt ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis nunc vitae orci fermentum."
    );
  };

  // Hàm để lấy URL hình ảnh an toàn từ bài viết
  const getSafeImageUrl = (article: any) => {
    if (article.image) return article.image;
    if (article.images && article.images.length > 0) return article.images[0];
    return "/placeholder-image.jpg";
  };

  return (
    <div className="relative h-[360px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Featured articles */}
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex h-full">
              {/* Text Content */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative z-10">
                <span className="inline-block px-6 py-1.5 bg-primary text-white text-base font-medium rounded w-fit mb-4">
                  {article.category || "ARTICLE"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                  {getSafeDescription(article)}
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>

              {/* Image */}
              <div className="hidden md:block w-1/2 relative">
                <Image
                  src={getSafeImageUrl(article)}
                  alt={article.title || "Featured article"}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={index === currentIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 dark:from-slate-800 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-black/30 p-2 rounded-full hover:bg-white/50 dark:hover:bg-black/50 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-primary"
                : "bg-white/50 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};
