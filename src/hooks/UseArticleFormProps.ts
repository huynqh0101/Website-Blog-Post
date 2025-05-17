import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadFiles } from "@/services/articleService";

// Types
export type BlockType = "rich-text" | "media" | "quote" | "slider";

export interface BlockData {
  __component: string;
  id?: number;
  [key: string]: any;
}

export type Category = {
  id: number;
  name: string;
};

interface UseArticleFormProps {
  initialData?: any;
  articleId?: string;
  isEditing?: boolean;
}

export function useArticleForm({
  initialData,
  articleId,
  isEditing = false,
}: UseArticleFormProps = {}) {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(
    initialData?.category?.id?.toString() || ""
  );
  const [type, setType] = useState(initialData?.type || "News");

  // Blocks state
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  // Image state
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.cover?.url || null
  );
  const [coverImageId, setCoverImageId] = useState<number | null>(
    initialData?.cover?.id || null
  );

  // UI state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate slug from title
  useEffect(() => {
    if (title && !isEditing) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    }
  }, [title, isEditing]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(
            data.data.map((cat: any) => ({
              id: cat.id,
              name: cat.name,
            }))
          );
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle cover image upload
  const handleCoverImageUpload = async (file: File) => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploading(true);
    try {
      const fileIds = await uploadFiles(file);
      if (fileIds && fileIds.length > 0) {
        setCoverImageId(fileIds[0]);
        toast.success("Cover image uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      handleCoverImageUpload(file);
    }
  };

  // Block functions
  const addBlock = (type: BlockType) => {
    let newBlock: BlockData;

    switch (type) {
      case "rich-text":
        newBlock = { __component: "shared.rich-text", content: "" };
        break;
      case "media":
        newBlock = { __component: "shared.media", file: null, caption: "" };
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

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlockContent = (index: number, key: string, value: any) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index][key] = value;
    setBlocks(updatedBlocks);
  };

  // Format blocks for API submission
  const formatBlocksForAPI = (blocks: BlockData[]) => {
    return blocks.map((block) => {
      if (block.__component === "shared.rich-text") {
        return {
          __component: block.__component,
          body: block.content,
        };
      } else if (block.__component === "shared.media") {
        return {
          __component: block.__component,
          file: block.file,
          caption: block.caption || "",
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
          files: block.files || [],
        };
      }
      return block;
    });
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSlug("");
    setCategoryId("");
    setType("News");
    setBlocks([]);
    setCoverImage(null);
    setCoverPreview(null);
    setCoverImageId(null);
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return {
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
    setIsUploading,
    isSubmitting,
    setIsSubmitting,

    // Functions
    handleCoverImageUpload,
    handleCoverImageChange,
    addBlock,
    removeBlock,
    updateBlockContent,
    formatBlocksForAPI,
    resetForm,
    handleCancel,

    // Router
    router,
  };
}
