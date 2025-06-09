"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { StrapiArticle } from "@/types/strapi-response";
import { articleService } from "@/services/articleService";
import { ThemeContext } from "@/context/themeContext";

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  const [article, setArticle] = useState<StrapiArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);

        // Bước 1: Lấy thông tin cơ bản của bài viết theo ID
        const basicArticle = await articleService.getArticleById(id);

        if (!basicArticle || !basicArticle.data.slug) {
          throw new Error("Article not found or missing slug");
        }

        // Bước 2: Lấy thông tin chi tiết của bài viết theo slug
        const slug = basicArticle.data.slug;
        const detailedArticle = await articleService.getArticleBySlug(slug);
        setArticle(detailedArticle as StrapiArticle);
      } catch (err) {
        setError("Article not found");
        console.error("Error fetching article:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleEdit = () => {
    if (article?.documentId) {
      router.push(`/dashboard/edit-article/${article.documentId}`);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            isDarkMode ? "border-blue-400" : "border-[#3a5b22]"
          }`}
        ></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        className={`container mx-auto px-4 py-8 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h1 className={`text-2xl font-bold text-red-500`}>Article not found</h1>
        <p className={`mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          The requested article could not be found.
        </p>
        <Button onClick={handleBack} className="mt-4" variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Dashboard controls as buttons without wrapper div */}
      <>
        <Button
          variant="ghost"
          onClick={handleBack}
          className={`fixed top-[75px] left-[85px] z-50 flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>

        <Button
          onClick={handleEdit}
          className="fixed top-[75px] right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Article</span>
        </Button>
      </>

      {/* Article content with proper spacing from fixed header */}
      <div className="pt-16">
        <ArticleDetail article={article} />
      </div>
    </div>
  );
}
