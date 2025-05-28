export interface Comment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  article_id: string;
  user: {
    id: number;
    username: string;
    avatar: {
      formats: {
        thumbnail: {
          url: string;
        };
        small: {
          url: string;
        };
      };
      url: string;
    };
  };
}

export interface CreateCommentRequest {
  data: {
    content: string;
    article_id: string;
    user: string;
  };
}
