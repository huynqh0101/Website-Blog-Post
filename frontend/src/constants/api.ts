export const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/local",
    REGISTER: "/api/auth/local/register",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
  },
  AUTHORS: "/api/authors",
  ARTICLES: "/api/articles",
  USERS: "/api/users",
};

export const getFullUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
