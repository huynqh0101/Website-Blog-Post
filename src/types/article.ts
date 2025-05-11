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
    name: string;
    avatar?: {
      formats: {
        thumbnail: {
          url: string;
        };
      };
    };
  };
}
