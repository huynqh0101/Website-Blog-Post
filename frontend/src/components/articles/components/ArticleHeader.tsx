import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
  isSubmitting: boolean;
  coverImageId: number | null;
  onCancel: () => void;
  isEditing?: boolean; // Thêm prop để xác định là màn hình tạo mới hay chỉnh sửa
}

export default function ArticleHeader({
  isSubmitting,
  coverImageId,
  onCancel,
  isEditing = false, // Mặc định là tạo mới
}: ArticleHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-blue-100 pb-4 mb-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {isEditing ? "Edit Article" : "Create New Article"}
      </h1>
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !coverImageId}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md shadow-blue-200"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update"
            : "Save"}
        </Button>
      </div>
    </div>
  );
}
