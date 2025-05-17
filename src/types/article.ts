export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string | null;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    bio: string;
    avatar?: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          url: string;
        };
        small: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          url: string;
        };
      };
      url: string;
    };
  };
  cover?: {
    url?: string;
    formats?: {
      medium?: {
        url: string;
      };
      small?: { url: string };
      thumbnail?: { url: string };
    };
    alternativeText?: string;
  };
  category?: {
    name: string;
    slug: string;
  };
}
