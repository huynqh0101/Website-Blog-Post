"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ArticleHeader from "./components/ArticleHeader";
import ArticleBasicInfo from "./components/ArticleBasicInfo";
import ArticleCoverImage from "./components/ArticleCoverImage";
import ArticleMetadata from "./components/ArticleMetadata";
import ArticleBlocks from "./components/ArticleBlocks";
import { uploadFiles } from "@/services/articleService";

// Type definitions for our content
type BlockType = "rich-text" | "media" | "quote" | "slider";

interface BlockData {
  __component: string;
  id?: number;
  [key: string]: any;
}

type Category = {
  id: number;
  name: string;
};

export default function NewArticlePage() {
  const router = useRouter();
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("blog");
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null);

  // Image upload state
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverImageId, setCoverImageId] = useState<number | null>(null);

  // Loading states
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    }
  }, [title]);

  const handleCoverImageUpload = async () => {
    if (!coverImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setIsUploading(true);

      // Sử dụng service chung uploadFiles
      const fileIds = await uploadFiles(coverImage);

      if (fileIds && fileIds.length > 0) {
        setCoverImageId(fileIds[0]);
        toast.success("Cover image uploaded successfully");
      } else {
        throw new Error("Failed to get file ID from server");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch("http://localhost:1337/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setCoverImageId(null);
    }
  };

  // Add a new block
  const addBlock = (type: BlockType) => {
    let newBlock: BlockData;

    switch (type) {
      case "rich-text":
        newBlock = {
          __component: "shared.rich-text",
          content: "",
        };
        break;
      case "media":
        newBlock = {
          __component: "shared.media",
          file: null,
          caption: "",
        };
        break;
      case "quote":
        newBlock = {
          __component: "shared.quote",
          text: "",
          author: "",
        };
        break;
      case "slider":
        newBlock = {
          __component: "shared.slider",
          files: [],
        };
        break;
      default:
        return;
    }

    setBlocks([...blocks, newBlock]);
  };

  // Remove a block
  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
  };

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

      // Chuyển đổi format của blocks nếu cần
      const formattedBlocks = blocks.map((block) => {
        if (block.__component === "shared.rich-text") {
          return {
            __component: block.__component,
            body: block.content, // Đổi từ content thành body
          };
        } else if (block.__component === "shared.quote") {
          return {
            __component: block.__component,
            title: block.text, // Đổi từ text thành title
            body: block.author, // Đổi từ author thành body
          };
        } else if (block.__component === "shared.media") {
          return {
            __component: block.__component,
            file: block.file, // Đảm bảo sử dụng trường file là số ID
          };
        } else if (block.__component === "shared.slider") {
          return {
            __component: block.__component,
            files: block.files, // Đảm bảo files là mảng các số ID
          };
        }
        // Giữ nguyên các loại block khác
        return block;
      });

      // Định nghĩa kiểu dữ liệu cho articleData
      interface ArticleData {
        data: {
          title: string;
          description: string;
          slug: string;
          type: string;
          author: string | null;
          category: number | null;
          cover: number | null;
          blocks?: any[]; // Thêm trường blocks là tùy chọn
        };
      }

      // Khởi tạo articleData với kiểu đã định nghĩa
      const articleData: ArticleData = {
        data: {
          title,
          description,
          slug,
          author: storedAuthorId,
          category: categoryId ? parseInt(categoryId) : null,
          cover: coverImageId,
          type: type || "blog",
        },
      };

      // Chỉ thêm blocks vào khi có dữ liệu
      if (formattedBlocks.length > 0) {
        articleData.data.blocks = formattedBlocks;
      }

      console.log("Sending data:", JSON.stringify(articleData));

      // Phần còn lại của mã không thay đổi
      const response = await fetch("http://localhost:1337/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response details:", errorData);
        console.error("Error status:", response.status);
        throw new Error(
          `Failed to create article: ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      toast.success("Article created successfully");
      router.push(`/dashbroad/article/${data.data.id}`);
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update block content
  const updateBlockContent = (index: number, key: string, value: any) => {
    const newBlocks = [...blocks];
    newBlocks[index][key] = value;
    setBlocks(newBlocks);
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
          onCancel={() => router.push("/dashbroad")}
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
            handleCoverImageUpload={handleCoverImageUpload}
            handleCoverImageChange={handleCoverImageChange}
          />
        </div>

        {/* Author and Category */}
        <div className="border-b border-blue-100 pb-8">
          <ArticleMetadata
            authorId={authorId}
            setAuthorId={() => {}}
            user={user}
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
