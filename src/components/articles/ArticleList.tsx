"use client";

import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import LoadingSpinner from "../ui/loading-spinner";
import CategoryFilter from "../news/CategoryFilter";
import { ArticleCard } from "../ArticleCard";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleArticleClick = (article: Article) => {
    if (article.author) {
      const authorData = {
        id: article.author.id,
        name: article.author.name,
        avatar: article.author.avatar?.formats?.thumbnail?.url
          ? `${API_URL}${article.author.avatar.formats.thumbnail.url}`
          : null,
      };
      localStorage.setItem("currentAuthor", JSON.stringify(authorData));
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.category?.name === category
      );
      setFilteredArticles(filtered);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/articles?populate[author][populate]=avatar&populate[cover][populate]=*&populate=category`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data);
        const allArticles = data.data;
        console.log("All Articles:", allArticles);
        setArticles(allArticles);
        setFilteredArticles(allArticles);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Articles</h2>
        <div className="flex-shrink-0">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </section>
  );
}
