export interface ArticleDetailResponse {
  data: ArticleDetail[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ArticleDetail {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string | null;
  cover: {
    id: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    url: string;
    alternativeText: string;
  } | null;
  author: {
    id: number;
    name: string;
    email: string;
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  blocks: ContentBlock[];
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

type ContentBlock = RichTextBlock | QuoteBlock | MediaBlock | SliderBlock;

interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  title: string;
  body: string;
}

interface MediaBlock {
  __component: "shared.media";
  id: number;
}

interface SliderBlock {
  __component: "shared.slider";
  id: number;
}
