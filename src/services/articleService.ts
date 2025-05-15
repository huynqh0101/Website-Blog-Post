import { StrapiArticle, StrapiResponse } from "@/types/strapi-response";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

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
