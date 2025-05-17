import { StrapiArticle, StrapiResponse } from "@/types/strapi-response";
import { toast } from "sonner";
import { fetchFileById, getImageUrl, MediaFileDisplay } from "./api";
import { Article } from "@/types/article";
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Thống nhất dịch vụ thành một object duy nhất
export const articleService = {
  getArticleBySlug: async (slug: string): Promise<StrapiArticle> => {
    try {
      const res = await fetch(
        `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate[blocks][populate]=*&populate[cover][populate]=*&populate[author][populate]=avatar&populate=category`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();

      if (!response.data || response.data.length === 0) {
        throw new Error("Article not found");
      }

      const article = response.data[0];
      return article;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw new Error("Failed to fetch article");
    }
  },

  async getArticleById(id: string): Promise<{ data: any }> {
    try {
      const response = await fetch(
        `http://localhost:1337/api/articles/${id}?populate=*`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      throw error;
    }
  },
  getAllArticles: async (limit = 9, page = 1): Promise<Article[]> => {
    try {
      const response = await fetch(
        `${API_URL}/api/articles?populate[author][populate]=avatar&populate[cover][populate]=*&populate=category&pagination[pageSize]=${limit}&pagination[page]=${page}&sort=publishedAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  },

  getAllArticleSlugs: async (): Promise<{ slug: string }[]> => {
    try {
      const res = await fetch(
        `${API_URL}/api/articles?populate[author][populate]=avatar&populate=cover&populate=category`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Error fetching article slugs:", res.statusText);
        return [];
      }

      const response = await res.json();
      return response.data.map((article: any) => ({
        slug: article.attributes.slug,
      }));
    } catch (error) {
      console.error("Error fetching article slugs:", error);
      return [];
    }
  },

  uploadFiles: async (files: File | File[]): Promise<number[] | null> => {
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error("Authentication token not found");
        return null;
      }

      const formData = new FormData();

      // Xử lý cả trường hợp một file hoặc nhiều file
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("files", files);
      }

      console.log(
        `Uploading ${Array.isArray(files) ? files.length : 1} file(s)`
      );

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        throw new Error(
          `Failed to upload files: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();

      // Trả về mảng các ID
      return data.map((file: any) => file.id);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error(
        `Upload failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return null;
    }
  },

  createArticle: async (articleData: any) => {
    try {
      const response = await fetch(`${API_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: articleData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create article: ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  updateArticle: async (articleId: string, articleData: any) => {
    try {
      const response = await fetch(`${API_URL}/api/articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: articleData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update article: ${
            errorData.error?.message || JSON.stringify(errorData)
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },
  // Thêm hàm mới để lấy cả thông tin phân trang
  getAllArticlesWithPagination: async (limit = 9, page = 1) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate[author][populate]=avatar&populate[cover][populate]=*&populate=category&pagination[pageSize]=${limit}&pagination[page]=${page}&sort=publishedAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Trả về cả dữ liệu và thông tin phân trang
      return {
        data: data.data,
        meta: data.meta,
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return { data: [], meta: { pagination: { pageCount: 1 } } };
    }
  },
};
export async function transformBlocksFromAPI(apiBlocks: any[]): Promise<any[]> {
  if (!Array.isArray(apiBlocks)) return [];

  const transformedBlocks = [];

  for (const block of apiBlocks) {
    if (block.__component === "shared.rich-text") {
      transformedBlocks.push({
        __component: block.__component,
        content: block.body || "",
        id: block.id,
      });
    } else if (block.__component === "shared.media") {
      // Use the file data directly from the block if available
      let fileData = block.id;
      console.log("fileData", fileData);
      // Only fetch if absolutely necessary (when we have an ID but no file data)
      if (!fileData && block.file?.id) {
        try {
          fileData = await fetchFileById(block.file.id);
        } catch (error) {
          console.error(
            `Error fetching media file with ID ${block.file.id}:`,
            error
          );
        }
      }

      transformedBlocks.push({
        __component: block.__component,
        file: fileData || null,
        caption: block.caption || "",
        id: block.id,
      });
    } else if (block.__component === "shared.quote") {
      transformedBlocks.push({
        __component: block.__component,
        text: block.body || "",
        author: block.title || "",
        id: block.id,
      });
    } else if (block.__component === "shared.slider") {
      // Use the files data directly from the block if available
      let sliderFiles = [];

      if (block.files && Array.isArray(block.files)) {
        // Files are already in the block, use them directly
        sliderFiles = block.files.map((file: any) =>
          typeof file === "object" ? file : { id: file }
        );
      }

      transformedBlocks.push({
        __component: block.__component,
        files: sliderFiles,
        id: block.id,
      });
    } else {
      // Default case for any other block types
      transformedBlocks.push({ ...block });
    }
  }

  return transformedBlocks;
}

// Để duy trì khả năng tương thích ngược với code hiện tại
export const { uploadFiles, getArticleById, createArticle, updateArticle } =
  articleService;
