"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useArticleForm } from "@/hooks/UseArticleFormProps";
import { createArticle } from "@/services/articleService";

// Components
import ArticleHeader from "./components/ArticleHeader";
import ArticleBasicInfo from "./components/ArticleBasicInfo";
import ArticleCoverImage from "./components/ArticleCoverImage";
import ArticleMetadata from "./components/ArticleMetadata";
import ArticleBlocks from "./components/ArticleBlocks";

export default function CreateArticlePage() {
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
  } = useArticleForm();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storedAuthorId = localStorage.getItem("authorDocumentId");

    if (!title || !description || !coverImageId) {
      toast.error("Please fill all required fields and upload a cover image");
      return;
    }

    if (!storedAuthorId) {
      toast.error("No author ID found. Please login again.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formattedBlocks = formatBlocksForAPI(blocks);

      type ArticleData = {
        title: string;
        description: string;
        slug: string;
        author: string;
        category: number | null;
        cover: number;
        type: string;
        blocks?: any[];
      };

      // Trong hàm handleSubmit
      const articleData: ArticleData = {
        title,
        description,
        slug,
        author: storedAuthorId,
        category: categoryId ? parseInt(categoryId) : null,
        cover: coverImageId,
        type: type || "blog",
      };

      if (formattedBlocks.length > 0) {
        articleData.blocks = formattedBlocks;
      }

      console.log("Sending data:", JSON.stringify(articleData));

      const data = await createArticle(articleData);
      toast.success("Article created successfully");
      router.push(`/dashboard/article/${data.data.documentId}`);
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 text-slate-800 py-10 px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto space-y-10 bg-white/90 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-blue-100"
      >
        <ArticleHeader
          isSubmitting={isSubmitting}
          coverImageId={coverImageId}
          onCancel={handleCancel}
        />

        {/* Basic info section */}
        <div className="border-b border-blue-100 pb-8">
          <ArticleBasicInfo
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>

        {/* Slug and Cover Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-blue-100 pb-8">
          <ArticleBasicInfo.Slug slug={slug} setSlug={setSlug} title={title} />

          <ArticleCoverImage
            coverPreview={coverPreview}
            setCoverPreview={setCoverPreview}
            setCoverImage={setCoverImage}
            setCoverImageId={setCoverImageId}
            coverImage={coverImage}
            coverImageId={coverImageId}
            isUploading={isUploading}
            handleCoverImageUpload={() =>
              coverImage
                ? handleCoverImageUpload(coverImage)
                : Promise.resolve()
            }
            handleCoverImageChange={handleCoverImageChange}
          />
        </div>

        {/* Author and Category */}
        <div className="border-b border-blue-100 pb-8">
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
