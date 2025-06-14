"use client";

import { useEffect, useCallback, useContext } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useArticleForm } from "@/hooks/UseArticleFormProps";
import {
  getArticleById,
  updateArticle,
  transformBlocksFromAPI,
} from "@/services/articleService";

// Components
import ArticleHeader from "@/components/articles/components/ArticleHeader";
import ArticleBasicInfo from "@/components/articles/components/ArticleBasicInfo";
import ArticleCoverImage from "@/components/articles/components/ArticleCoverImage";
import ArticleMetadata from "@/components/articles/components/ArticleMetadata";
import ArticleBlocks from "@/components/articles/components/ArticleBlocks";
import { useArticleContext } from "@/context/articleContext";
import { fetchFileById, getImageUrl } from "@/services/api";
import { ThemeContext } from "@/context/themeContext";

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const { setArticleId, setIsEditMode } = useArticleContext();

  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  // Use useEffect for context updates with cleanup
  useEffect(() => {
    if (articleId) {
      setArticleId(articleId);
      setIsEditMode(true);
    }

    return () => {
      setArticleId("");
      setIsEditMode(false);
    };
  }, [articleId, setArticleId, setIsEditMode]);

  const {
    // Form state
    title,
    setTitle,
    description,
    setDescription,
    slug,
    setSlug,
    categoryId,
    setCategoryId,
    type,
    setType,
    blocks,
    setBlocks,

    // Image state
    coverImage,
    setCoverImage,
    coverPreview,
    setCoverPreview,
    coverImageId,
    setCoverImageId,

    // UI state
    categories,
    isFetching,
    setIsFetching,
    isUploading,
    isSubmitting,
    setIsSubmitting,

    // Functions
    handleCoverImageUpload,
    handleCoverImageChange,
    addBlock,
    removeBlock,
    updateBlockContent,
    formatBlocksForAPI,
    handleCancel,

    // Router
    router,
  } = useArticleForm({ isEditing: true });

  // Memoize expensive functions
  const handleCoverImageUploadMemoized = useCallback(async () => {
    if (coverImage) {
      return handleCoverImageUpload(coverImage);
    }
    return Promise.resolve();
  }, [coverImage, handleCoverImageUpload]);

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

      setIsFetching(true);
      try {
        const result = await getArticleById(articleId);
        const articleData = result.data || result.data;

        // Process basic data
        setTitle(articleData.title || "");
        setDescription(articleData.description || "");
        setSlug(articleData.slug || "");

        // Process category with proper null checks
        if (articleData.category?.data) {
          setCategoryId(articleData.category.data.id.toString());
        } else if (articleData.category?.id) {
          setCategoryId(articleData.category.id.toString());
        }

        // Set type
        setType(articleData.type || "News");

        // Process cover image with better error handling
        if (articleData.cover) {
          const cover = articleData.cover.data
            ? articleData.cover.data
            : articleData.cover;

          if (cover?.id) {
            setCoverImageId(cover.id);

            try {
              const coverData = await fetchFileById(cover.id);
              setCoverPreview(getImageUrl(coverData));
            } catch (error) {
              console.error("Error fetching cover image:", error);

              // Fallback logic
              if (cover?.attributes?.url) {
                const imageUrl = cover.attributes.url.startsWith("http")
                  ? cover.attributes.url
                  : `http://localhost:1337${cover.attributes.url}`;
                setCoverPreview(imageUrl);
              } else if (cover?.url) {
                const imageUrl = cover.url.startsWith("http")
                  ? cover.url
                  : `http://localhost:1337${cover.url}`;
                setCoverPreview(imageUrl);
              }
            }
          }
        }

        // Process blocks efficiently
        if (articleData.blocks && Array.isArray(articleData.blocks)) {
          const transformedBlocks = await transformBlocksFromAPI(
            articleData.blocks
          );
          setBlocks(transformedBlocks);
        } else if (articleData.content) {
          setBlocks([
            { __component: "shared.rich-text", content: articleData.content },
          ]);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchArticle();
  }, [articleId]); // Only depend on articleId, other setters don't change

  // Memoize form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to continue");
          router.push("/login");
          return;
        }

        // Get current article data to compare
        const currentResult = await getArticleById(articleId);
        if (!currentResult.data) {
          throw new Error("Invalid article data structure");
        }

        const currentArticle = currentResult.data;
        const articleData: Record<string, unknown> = {};

        // Efficiently compare and add only changed fields
        if (title !== (currentArticle.title || "")) articleData.title = title;
        if (description !== (currentArticle.description || ""))
          articleData.description = description;

        if (slug !== (currentArticle.slug || "")) {
          articleData.slug =
            slug ||
            title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "");
        }

        if (type !== (currentArticle.type || "news")) articleData.type = type;

        // Always include blocks
        articleData.blocks = formatBlocksForAPI(blocks);

        // Handle category changes
        const currentCategoryId =
          currentArticle.category?.id?.toString() || "0";
        if (
          categoryId !== currentCategoryId &&
          categoryId &&
          categoryId !== "0"
        ) {
          const parsedCategoryId = parseInt(categoryId);
          if (!isNaN(parsedCategoryId)) {
            articleData.category = parsedCategoryId;
          }
        }

        // Handle cover image changes
        const currentCoverId = currentArticle.cover?.id || null;
        if (coverImageId !== currentCoverId && coverImageId !== null) {
          articleData.cover = coverImageId;
        }

        // Handle author changes
        const authorDocumentId = localStorage.getItem("authorDocumentId");
        const currentAuthorId = currentArticle.author?.id?.toString() || "";

        if (authorDocumentId !== currentAuthorId && authorDocumentId) {
          articleData.author = authorDocumentId;
        }

        // If no changes detected
        if (Object.keys(articleData).length === 0) {
          toast.info("No changes detected!");
          setIsSubmitting(false);
          return;
        }

        // Send update request
        await updateArticle(articleId, articleData);
        toast.success("Article updated successfully!");
        router.push(`/dashboard/article/${articleId}`);
      } catch (error) {
        console.error("Error updating article:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to update article"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      title,
      description,
      slug,
      type,
      blocks,
      categoryId,
      coverImageId,
      articleId,
      formatBlocksForAPI,
      router,
    ]
  );

  // Improved loading state
  if (isFetching) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50"
        }`}
      >
        <div
          className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <div
            className={`animate-spin rounded-full h-10 w-10 border-b-2 mb-4 ${
              isDarkMode ? "border-blue-400" : "border-blue-500"
            }`}
          ></div>
          <div
            className={`text-xl font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Loading article data...
          </div>
        </div>
      </div>
    );
  }

  // Return optimized render with dark mode
  return (
    <div
      className={`min-h-screen py-10 px-4 md:px-8 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 text-slate-800"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`max-w-6xl mx-auto space-y-10 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm border ${
          isDarkMode
            ? "bg-gray-800/90 border-gray-700"
            : "bg-white/90 border-blue-100"
        }`}
      >
        <ArticleHeader
          isSubmitting={isSubmitting}
          coverImageId={coverImageId}
          onCancel={handleCancel}
          isEditing={true}
        />

        {/* Basic info section */}
        <div
          className={`border-b pb-8 ${
            isDarkMode ? "border-gray-700" : "border-blue-100"
          }`}
        >
          <ArticleBasicInfo
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>

        {/* Slug and Cover Image */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-8 ${
            isDarkMode ? "border-gray-700" : "border-blue-100"
          }`}
        >
          <ArticleBasicInfo.Slug slug={slug} setSlug={setSlug} title={title} />

          <ArticleCoverImage
            coverPreview={coverPreview}
            setCoverPreview={setCoverPreview}
            setCoverImage={setCoverImage}
            setCoverImageId={setCoverImageId}
            coverImage={coverImage}
            coverImageId={coverImageId}
            isUploading={isUploading}
            handleCoverImageUpload={handleCoverImageUploadMemoized}
            handleCoverImageChange={handleCoverImageChange}
          />
        </div>

        {/* Author and Category */}
        <div
          className={`border-b pb-8 ${
            isDarkMode ? "border-gray-700" : "border-blue-100"
          }`}
        >
          <ArticleMetadata
            type={type}
            setType={setType}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={categories}
          />
        </div>

        {/* Blocks (Dynamic Zone) */}
        <div className="pt-2">
          <ArticleBlocks
            blocks={blocks}
            updateBlockContent={updateBlockContent}
            removeBlock={removeBlock}
            addBlock={addBlock}
          />
        </div>
      </form>
    </div>
  );
}
