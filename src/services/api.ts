/**
 * API service for handling common API requests
 */

// Category types
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
