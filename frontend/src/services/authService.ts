import { API_BASE_URL, ENDPOINTS, getFullUrl } from "@/constants/api";
import {
  LoginCredentials,
  AuthResponse,
  AuthorResponse,
  User,
} from "@/types/auth";

/**
 * Service for authentication related API calls
 */
export const authService = {
  /**
   * Login with email/username and password
   * @param credentials User credentials
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch(getFullUrl(ENDPOINTS.AUTH.LOGIN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Authentication failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Check if a user is an author
   * @param email User's email
   * @param token JWT token
   */
  checkAuthorStatus: async (
    email: string,
    token: string
  ): Promise<AuthorResponse> => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await fetch(
        getFullUrl(`${ENDPOINTS.AUTHORS}?filters[email][$eq]=${encodedEmail}`),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Author check failed:", await response.text());
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
          },
        };
      }

      return await response.json();
    } catch (error) {
      console.error("Error checking author status:", error);
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
      };
    }
  },

  /**
   * Save authentication data to localStorage
   */
  saveAuthData: (token: string, user: User): void => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  /**
   * Save author data if the user is an author
   */
  saveAuthorData: (documentId: string): void => {
    localStorage.setItem("authorDocumentId", documentId);
  },

  /**
   * Check if user is authenticated (has token)
   */
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  /**
   * Logout - clear stored auth data
   */
  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorDocumentId");
  },
  // Thêm các methods sau vào authService
  /**
   * Register a new user
   * @param userData User registration data
   */
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(getFullUrl(ENDPOINTS.AUTH.REGISTER), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Registration failed");
    }

    return data;
  },

  /**
   * Create an author profile
   * @param authorData Author data
   */
  createAuthor: async (authorData: {
    name: string;
    email: string;
    password: string;
    avatar?: number;
  }): Promise<any> => {
    const response = await fetch(getFullUrl(ENDPOINTS.AUTHORS), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: authorData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error?.message?.includes("email")) {
        throw new Error("Email is already registered");
      }
      throw new Error(data.error?.message || "Author registration failed");
    }

    return data;
  },

  /**
   * Set default avatar for user
   * @param userId User ID
   * @param token JWT token
   * @param avatarId Avatar ID
   */
  setUserAvatar: async (
    userId: number,
    token: string,
    avatarId: number = 13
  ): Promise<any> => {
    const response = await fetch(getFullUrl(`${ENDPOINTS.USERS}/${userId}`), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarId,
      }),
    });

    if (!response.ok) {
      console.error("Failed to set default avatar");
      // Không ném lỗi, chỉ log để tránh làm gián đoạn luồng chính
    }

    return response.ok;
  },
};
