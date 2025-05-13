export interface AuthorProfileData {
  name: string;
  email: string;
  bio?: string;
  avatar?: File | null;
  gender?: string;
  nickname?: string;
  language?: string;
  country?: string;
  timezone?: string;
}

export interface AuthorResponse {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar: {
      id: number;
      formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large: { url: string };
      };
      url: string;
    };
    articles?: Array<{
      id: number;
      documentId: string;
      title: string;
      description: string;
      slug: string;
    }>;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface UserAvatar {
  id: number;
  url: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
    small?: {
      url: string;
    };
  };
}

export interface UserData {
  id: number;
  documentId: string;
  username: string;
  email: string;
  avatar?: UserAvatar;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileData {
  username: string;
  email: string;
  avatar: File | null;
}
