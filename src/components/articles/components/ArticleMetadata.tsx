import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface ArticleMetadataProps {
  // Bỏ authorId và setAuthorId từ props
  // Thêm type và setType
  type: string;
  setType: (type: string) => void;
  categoryId: string;
  setCategoryId: (id: string) => void;
  categories: Array<{
    id: number;
    name: string;
  }>;
}

export default function ArticleMetadata({
  // Bỏ authorId và setAuthorId
  type,
  setType,
  categoryId,
  setCategoryId,
  categories,
}: ArticleMetadataProps) {
  // Các loại bài viết
  const articleTypes = [
    { id: "news", name: "News" },
    { id: "blog", name: "Blog" },
  ];

  // Lấy authorDocumentId từ localStorage để sử dụng khi submit
  const [authorDocumentId, setAuthorDocumentId] = useState<string | null>(null);

  useEffect(() => {
    // Lấy authorDocumentId từ localStorage khi component mount
    const storedAuthorId = localStorage.getItem("authorDocumentId");
    if (storedAuthorId) {
      setAuthorDocumentId(storedAuthorId);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm mb-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-white border border-blue-200 text-slate-800 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-blue-100 text-slate-800">
            {articleTypes.map((articleType) => (
              <SelectItem
                key={articleType.id}
                value={articleType.id}
                className="focus:bg-blue-50 hover:bg-blue-50"
              >
                {articleType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700">Category</label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="bg-white border border-blue-200 text-slate-800 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-blue-100 text-slate-800">
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id.toString()}
                className="focus:bg-blue-50 hover:bg-blue-50"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
