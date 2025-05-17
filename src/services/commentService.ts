import { Comment, CreateCommentRequest } from "@/types/comment";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const commentService = {
  getCommentsByArticle: async (articleId: string): Promise<Comment[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No JWT token found");
        return [];
      }
      const res = await fetch(
        `${API_URL}/api/comments?filters[article_id][$eq]=${articleId}&populate[user][populate]=avatar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return [];

      const response = await res.json();
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  },

  createComment: async (
    content: string,
    articleId: string
  ): Promise<CreateCommentRequest | null> => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        console.error("Authentication required: Please login to comment");
        return null;
      }

      const user = JSON.parse(userStr);

      const requestBody = {
        data: {
          content: content,
          article_id: articleId,
          user: user.id.toString(),
        },
      };

      const res = await fetch(`${API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await res.json();
      console.log("Response:", responseData);

      if (!res.ok) {
        console.error("Error creating comment:", responseData);
        return null;
      }

      return responseData.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return null;
    }
  },
};
