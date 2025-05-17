import React, { createContext, useContext, useState, ReactNode } from "react";

interface ArticleContextType {
  articleId: string;
  setArticleId: (id: string) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
}

// Tạo context với giá trị mặc định
const ArticleContext = createContext<ArticleContextType>({
  articleId: "",
  setArticleId: () => {},
  isEditMode: false,
  setIsEditMode: () => {},
});

// Custom hook để sử dụng context
export const useArticleContext = () => useContext(ArticleContext);

// Provider component
interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const [articleId, setArticleId] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const value = {
    articleId,
    setArticleId,
    isEditMode,
    setIsEditMode,
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
