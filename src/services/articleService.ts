import { StrapiArticle, StrapiResponse } from "@/types/strapi-response";
import { toast } from "sonner";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

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

  async getArticleById(id: string): Promise<StrapiArticle> {
    try {
      const response = await fetch(`http://localhost:1337/api/articles/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      throw error;
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

      if (!res.ok) return [];

      const response = await res.json();
      return response.data.map((article: any) => ({
        slug: article.attributes.slug,
      }));
    } catch (error) {
      return [];
    }
  },
};

export const uploadFiles = async (
  files: File | File[]
): Promise<number[] | null> => {
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

    console.log(`Uploading ${Array.isArray(files) ? files.length : 1} file(s)`);

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
};
