import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ArticleMetadataProps {
  authorId: string | null; // Thay đổi thành string | null
  setAuthorId: (id: string) => void; // Thay đổi thành nhận vào string
  user: any;
  categoryId: string;
  setCategoryId: (id: string) => void;
  categories: Array<{
    id: number;
    name: string;
  }>;
}

export default function ArticleMetadata({
  authorId,
  setAuthorId,
  user,
  categoryId,
  setCategoryId,
  categories,
}: ArticleMetadataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm mb-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700">Author</label>
        <Select
          value={authorId || ""}
          onValueChange={(value) => setAuthorId(value)} // Không cần chuyển đổi thành số nữa
        >
          <SelectTrigger className="bg-white border border-blue-200 text-slate-800 focus:ring-2 focus:ring-blue-500 rounded-md shadow-sm">
            <SelectValue placeholder="Select author" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-blue-100 text-slate-800">
            {user && (
              <SelectItem
                value={user.documentId} // Đây là documentId của author
                className="focus:bg-blue-50 hover:bg-blue-50"
              >
                {user.username}
              </SelectItem>
            )}
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
