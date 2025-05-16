"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";

// Components
import ArticleBasicInfo from "@/components/articles/components/ArticleBasicInfo";
import ArticleBlocks from "@/components/articles/components/ArticleBlocks";
import ArticleCoverImage from "@/components/articles/components/ArticleCoverImage";
import ArticleMetadata from "@/components/articles/components/ArticleMetadata";
import ArticleHeader from "@/components/articles/components/ArticleHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "react-markdown";

// Services
import { uploadFiles } from "@/services/articleService";

// Types
type BlockType = "rich-text" | "media" | "quote" | "slider";

interface BlockData {
  __component: string;
  id?: number;
  [key: string]: any;
}

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();

  // State
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Article data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  // Cover image
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageId, setCoverImageId] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Metadata
  const [type, setType] = useState<string>("news");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);

  // Content blocks
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  // Preview tab
  const [activeTab, setActiveTab] = useState<string>("editor");

  useEffect(() => {
    const fetchArticleAndData = async () => {
      setIsFetching(true);
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authorization token not found. Please log in again.");
          router.push("/login");
          return;
        }

        // Fetch categories
        const categoriesResponse = await fetch(
          "http://localhost:1337/api/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(
            categoriesData.data.map((cat: any) => ({
              id: cat.id,
              name: cat.name, // Make sure to access name from attributes
            }))
          );
        } else {
          console.error(
            "Failed to fetch categories:",
            categoriesResponse.statusText
          );
        }

        // Fetch article data
        const response = await fetch(
          `http://localhost:1337/api/articles/${articleId}?populate=*`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch article:", response.statusText);
          throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        const result = await response.json();
        // Remove console.log in production
        console.log(result);

        const articleData = result.data.attributes || result.data;

        // Basic info
        setTitle(articleData.title || "");
        setDescription(articleData.description || "");
        setSlug(articleData.slug || "");

        if (articleData.category && articleData.category.id) {
          setCategoryId(articleData.category.id.toString());
        }

        // Cover image
        if (articleData.cover && articleData.cover.url) {
          const imageUrl = articleData.cover.url.startsWith("http")
            ? articleData.cover.url
            : `http://localhost:1337${articleData.cover.url}`;
          setCoverPreview(imageUrl);
          setCoverImageId(articleData.cover.documentId || null);
        }

        // Process blocks
        if (articleData.blocks && Array.isArray(articleData.blocks)) {
          // Transform blocks to match the expected format
          const transformedBlocks = articleData.blocks.map((block: any) => {
            // Map based on component type
            if (block.__component === "shared.rich-text") {
              return {
                __component: block.__component,
                content: block.body || "",
                id: block.id,
              };
            } else if (block.__component === "shared.media") {
              return {
                __component: block.__component,
                file: block.id,
                caption: block.caption || "",
                id: block.id,
              };
            } else if (block.__component === "shared.quote") {
              return {
                __component: block.__component,
                text: block.body || "",
                author: block.title || "",
                id: block.id,
              };
            } else if (block.__component === "shared.slider") {
              return {
                __component: block.__component,
                files: block.images || [],
                id: block.id,
              };
            }
            return block;
          });

          setBlocks(transformedBlocks);
        } else {
          // If no blocks, create default rich-text block with content
          const combinedContent = articleData.content || "";
          if (combinedContent) {
            setBlocks([
              { __component: "shared.rich-text", content: combinedContent },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    if (articleId) {
      fetchArticleAndData();
    }
  }, [articleId, router]);

  // Handle cover image functions
  const handleCoverImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadedFileIds = await uploadFiles(file);
      if (uploadedFileIds && uploadedFileIds.length > 0) {
        setCoverImageId(String(uploadedFileIds[0]));
        toast.success("Cover image uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading cover image:", error);
      toast.error("Failed to upload cover image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      handleCoverImageUpload(file);
    }
  };

  // Block functions
  const updateBlockContent = (index: number, key: string, value: any) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index][key] = value;
    setBlocks(updatedBlocks);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type: BlockType) => {
    let newBlock: BlockData;

    switch (type) {
      case "rich-text":
        newBlock = { __component: "shared.rich-text", content: "" };
        break;
      case "media":
        newBlock = { __component: "shared.media" };
        break;
      case "quote":
        newBlock = { __component: "shared.quote", text: "", author: "" };
        break;
      case "slider":
        newBlock = { __component: "shared.slider", files: [] };
        break;
      default:
        return;
    }

    setBlocks([...blocks, newBlock]);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const authorDocumentId = localStorage.getItem("authorDocumentId");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to continue");
        router.push("/login");
        return;
      }

      // Transform blocks to API format
      const apiBlocks = blocks.map((block) => {
        if (block.__component === "shared.rich-text") {
          return {
            __component: block.__component,
            body: block.content,
          };
        } else if (block.__component === "shared.media") {
          return {
            __component: block.__component,
            file: block.file,
            caption: block.caption,
          };
        } else if (block.__component === "shared.quote") {
          return {
            __component: block.__component,
            body: block.text,
            title: block.author,
          };
        } else if (block.__component === "shared.slider") {
          return {
            __component: block.__component,
            images: block.files,
          };
        }
        return block;
      });

      // Prepare article data
      const articleData = {
        title,
        description,
        slug:
          slug ||
          title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
        authorId: authorDocumentId,
        type,
        categoryId: parseInt(categoryId),
        blocks: apiBlocks,
        coverImageId,
      };

      // Update article
      const updateResponse = await fetch(
        `http://localhost:1337/api/articles/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: articleData }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update article");
      }

      toast.success("Article updated successfully!");
      router.push("/dashboard/articles");
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Failed to update article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading article data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-50 text-slate-800 py-10 px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto space-y-10 bg-white/90 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm border border-blue-100"
      >
        <ArticleHeader
          isSubmitting={isSubmitting}
          coverImageId={coverImageId !== null ? Number(coverImageId) : null}
          onCancel={handleCancel}
          isEditing={true}
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
            setCoverImageId={(id: number | null) =>
              setCoverImageId(id !== null ? String(id) : null)
            }
            coverImage={coverImage}
            coverImageId={coverImageId !== null ? Number(coverImageId) : null}
            isUploading={isUploading}
            handleCoverImageUpload={() =>
              handleCoverImageUpload(coverImage as File)
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
