export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  cover?: {
    formats: {
      medium: {
        url: string;
      };
    };
    alternativeText?: string;
  };
  author?: {
    id: string;
    name: string;
    avatar?: {
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
  };
  content?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}
