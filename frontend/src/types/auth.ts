export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  role: 'author' | 'user';
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
}

export interface AuthorResponse {
  data: Author[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
