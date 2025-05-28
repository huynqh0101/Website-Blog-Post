"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react"; // Bỏ import User vì không cần
import { useMemo } from "react";
import newsData from "@/constants/newsData";

export const ArticleHighlightSection = () => {
  const { featuredArticle, worldTopNewsArticles } = useMemo(() => newsData, []);

  // Kiểm tra nếu không có dữ liệu
  if (!featuredArticle || !worldTopNewsArticles) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Phần loading skeleton giữ nguyên */}
      </div>
    );
  }

  // Kết hợp các bài viết có đầy đủ thông tin và hình ảnh
  const sideArticles = [
    ...(worldTopNewsArticles.smallArticles || []),
    ...(newsData.todayHotSpotArticles || []),
  ].slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Featured Article - Takes up 3 columns */}
      <div className="md:col-span-3">
        <div className="relative h-[380px] group overflow-hidden rounded-lg shadow-md">
          <Image
            src={featuredArticle.images[0]}
            alt={featuredArticle.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded mb-3">
              {featuredArticle.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              <Link
                href={`/articles/${featuredArticle.id}`}
                className="hover:underline focus:underline focus:outline-none"
              >
                {featuredArticle.title}
              </Link>
            </h1>
            <p className="text-gray-200 text-sm mb-3 line-clamp-2">
              {featuredArticle.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis nunc vitae orci fermentum."}
            </p>
            <div className="flex flex-wrap items-center text-sm text-gray-300 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{featuredArticle.date}</span>
              </div>
              {featuredArticle.readTime && (
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Articles - Takes up 2 columns */}
      <div className="md:col-span-2 space-y-4">
        {sideArticles.map((article, index) => (
          <div
            key={article.id}
            className={`flex h-[120px] overflow-hidden ${
              index < 2 ? "border-b border-gray-200 dark:border-gray-700" : ""
            } pb-4 group hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-md transition-colors duration-200 p-2`}
          >
            <div className="relative w-[120px] h-[100px] flex-shrink-0 overflow-hidden rounded-md shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="ml-4 flex flex-col flex-1">
              {article.category && (
                <span className="text-xs font-medium text-primary">
                  {article.category}
                </span>
              )}
              <h3 className="text-base font-bold mb-auto line-clamp-2 group-hover:text-primary transition-colors">
                <Link
                  href={`/articles/${article.id}`}
                  className="focus:outline-none focus:text-primary"
                >
                  {article.title}
                </Link>
              </h3>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                <Calendar size={12} className="mr-1" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
