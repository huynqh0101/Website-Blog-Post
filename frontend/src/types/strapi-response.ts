import { Block } from "./block-components";

export interface StrapiResponse {
  data: StrapiArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string | null;
  cover: StrapiImage | null;
  author: StrapiAuthor | null;
  category: StrapiCategory | null;
  blocks: StrapiBlock[];
  attributes: {
    blocks: Block[];
  };
}

interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  url: string;
}

interface StrapiAuthor {
  id: number;
  name: string;
  email: string;
}

interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export type StrapiBlock =
  | { __component: "shared.rich-text"; id: number; body: string }
  | { __component: "shared.quote"; id: number; title: string; body: string }
  | {
      __component: "shared.media";
      id: number;
      file: {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
          thumbnail: ImageFormat;
          small: ImageFormat;
          medium: ImageFormat;
          large: ImageFormat;
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    }
  | {
      __component: "shared.slider";
      id: number;
      files: Array<{
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
          thumbnail: ImageFormat;
          small: ImageFormat;
          medium: ImageFormat;
          large: ImageFormat;
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      }>;
    };
