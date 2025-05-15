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
  const [authorId, setAuthorId] = useState<number | null>(null);

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

  // Set author ID from current user
  useEffect(() => {
    if (user) {
      setAuthorId(user.id);
    }
  }, [user]);

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setCoverImageId(null);
    }
  };

  // Upload cover image to Strapi
  const handleCoverImageUpload = async () => {
    if (!coverImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("files", coverImage);

      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setCoverImageId(data[0].id);
        toast.success("Cover image uploaded successfully");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
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

    if (!title || !description || !coverImageId || !authorId) {
      toast.error("Please fill all required fields and upload a cover image");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("jwt");

      const articleData = {
        data: {
          title,
          description,
          slug,
          author: authorId,
          category: categoryId ? parseInt(categoryId) : null,
          cover: coverImageId,
          type,
          blocks,
        },
      };

      const response = await fetch("http://localhost:1337/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
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
    <div className="min-h-screen bg-[#1b1b2f] text-white py-10 px-8">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
        <ArticleHeader
          isSubmitting={isSubmitting}
          coverImageId={coverImageId}
          onCancel={() => router.push("/dashbroad")}
        />

        {/* Basic info section */}
        <ArticleBasicInfo
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />

        {/* Slug and Cover Image */}
        <div className="grid grid-cols-2 gap-6">
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
        <ArticleMetadata
          authorId={authorId}
          setAuthorId={setAuthorId}
          user={user}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />

        {/* Blocks (Dynamic Zone) */}
        <ArticleBlocks
          blocks={blocks}
          updateBlockContent={updateBlockContent}
          removeBlock={removeBlock}
          addBlock={addBlock}
        />
      </form>
    </div>
  );
}
