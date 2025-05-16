import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ArticleMetadataProps {
  authorId: number | null;
  setAuthorId: (id: number) => void;
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
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Author</label>
        <Select
          value={authorId?.toString() || ""}
          onValueChange={(value) => setAuthorId(Number(value))}
        >
          <SelectTrigger className="bg-[#24243c] border-0 text-white focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Add relation" />
          </SelectTrigger>
          <SelectContent className="bg-[#2d2d4a] border-gray-700 text-white">
            {user && (
              <SelectItem value={user.id.toString()}>
                {user.username}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Category</label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="bg-[#24243c] border-0 text-white focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Add relation" />
          </SelectTrigger>
          <SelectContent className="bg-[#2d2d4a] border-gray-700 text-white">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
