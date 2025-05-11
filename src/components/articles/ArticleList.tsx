"use client";

import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../ui/loading-spinner";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/articles?populate[author][populate]=avatar&populate=cover`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setTimeout(() => {
          setArticles(data.data);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container p-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.id}
            className="group w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden">
              {article.cover?.formats?.medium?.url ? (
                <Image
                  src={`${API_URL}${article.cover.formats.medium.url}`}
                  alt={article.cover.alternativeText || article.title}
                  width={500}
                  height={300}
                  className="object-cover w-full aspect-[16/9] transform transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full aspect-[16/9] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 space-y-3 relative">
              {/* Author Avatar */}
              <div className="absolute -top-8 right-4 transform transition-transform duration-300 group-hover:scale-110">
                {article.author?.avatar?.formats?.thumbnail?.url ? (
                  <Image
                    src={`${API_URL}${article.author.avatar.formats.thumbnail.url}`}
                    alt={article.author.name}
                    width={48}
                    height={48}
                    className="rounded-full aspect-square object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center border-4 border-white shadow-md">
                    <span className="text-base text-primary font-medium">
                      {article.author?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 mt-4">
                {article.title}
              </h3>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <time className="group-hover:text-primary/80 transition-colors duration-300">
                  {formatDate(article.publishedAt)}
                </time>
                {article.author && (
                  <span className="group-hover:text-primary/80 transition-colors duration-300">
                    {article.author.name}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
