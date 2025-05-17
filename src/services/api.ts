/**
 * API service for handling common API requests
 */
import { BlockResult } from "@/types/media-block";
export type Category = {
  id: number;
  name: string;
};

/**
 * Fetch all categories from the API
 */
export const fetchCategories = async (): Promise<Category[]> => {
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
  return data.data || [];
};

/**
 * Fetch categories with authentication
 */
export const fetchCategoriesAuth = async (
  token: string
): Promise<Category[]> => {
  const response = await fetch("http://localhost:1337/api/categories", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data.data || [];
};

export type MediaFileDisplay = {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
  };
};

/**
 * Fetch file by ID from the API with only fields necessary for display
 * @param fileId - The ID of the file to fetch
 * @param token - Optional authentication token
 * @returns Basic file data needed for display
 */
export const fetchFileById = async (
  fileId: number | string,
  token?: string
): Promise<MediaFileDisplay> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `http://localhost:1337/api/upload/files/${fileId}`,
    {
      method: "GET",
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status}`);
  }

  const data = await response.json();

  // Chỉ trả về các trường cần thiết
  return {
    id: data.id,
    url: data.url,
    alternativeText: data.alternativeText,
    caption: data.caption,
    width: data.width,
    height: data.height,
    formats: data.formats
      ? {
          thumbnail: data.formats.thumbnail
            ? {
                url: data.formats.thumbnail.url,
                width: data.formats.thumbnail.width,
                height: data.formats.thumbnail.height,
              }
            : undefined,
          small: data.formats.small
            ? {
                url: data.formats.small.url,
                width: data.formats.small.width,
                height: data.formats.small.height,
              }
            : undefined,
        }
      : undefined,
  };
};

export const getImageUrl = (
  file: MediaFileDisplay | string | number | null | undefined,
  size?: "thumbnail" | "small" | "medium"
): string => {
  const API_URL = "http://localhost:1337"; // Đồng bộ với URL trong ArticleDetail.tsx

  if (!file) return "";

  // Nếu file là số (ID)
  if (typeof file === "number") {
    // ID không đủ thông tin để tạo URL trực tiếp
    return "";
  }

  // Nếu file là chuỗi (URL)
  if (typeof file === "string") {
    // Giả định đây là đường dẫn tương đối
    return `${API_URL}${file}`;
  }

  // Nếu file là đối tượng với cấu trúc formats
  if (
    size &&
    file.formats &&
    (size === "thumbnail" || size === "small") &&
    file.formats[size]?.url
  ) {
    return `${API_URL}${file.formats[size].url}`;
  }

  // Fallback: sử dụng URL chính
  if (file.url) {
    return `${API_URL}${file.url}`;
  }

  return "";
};

export async function fetchArticleBlocksMedia(
  articleId: string
): Promise<BlockResult[]> {
  try {
    const response = await fetch(
      `http://localhost:1337/api/articles/${articleId}?populate[blocks][populate]=*`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch article media");
    }

    const result = await response.json();
    const blocks = result.data?.blocks || [];

    // Đơn giản hóa: Định nghĩa kiểu dữ liệu chỉ với các trường cần thiết
    type SimpleBlock = {
      id: number;
      __component: string;
      file?: { url: string };
      files?: Array<{ id: number; url: string }>;
    };

    // Chỉ lọc các block media và slider, và chỉ lấy thông tin cần thiết
    const mediaBlocks = blocks
      .filter(
        (block: SimpleBlock) =>
          block.__component === "shared.media" ||
          block.__component === "shared.slider"
      )
      .map((block: SimpleBlock): BlockResult => {
        // Xử lý block media
        if (block.__component === "shared.media" && block.file?.url) {
          const fileUrl = block.file.url;
          const fullUrl = fileUrl.startsWith("http")
            ? fileUrl
            : `http://localhost:1337${fileUrl}`;

          // Chỉ trả về ID và URL
          return {
            id: block.id,
            type: "media",
            fileUrl: fullUrl,
          };
        }

        // Xử lý block slider
        if (
          block.__component === "shared.slider" &&
          block.files &&
          Array.isArray(block.files)
        ) {
          // Chỉ lấy ID và URL cho mỗi slide
          const slides = block.files.map((file) => {
            const fileUrl = file.url;
            const fullUrl = fileUrl.startsWith("http")
              ? fileUrl
              : `http://localhost:1337${fileUrl}`;

            return {
              id: file.id,
              url: fullUrl,
            };
          });

          return {
            id: block.id,
            type: "slider",
            slides,
          };
        }

        // Fallback
        return {
          id: block.id,
          type: "unknown",
        };
      });

    return mediaBlocks;
  } catch (error) {
    console.error("Error fetching article media blocks:", error);
    throw error;
  }
}
