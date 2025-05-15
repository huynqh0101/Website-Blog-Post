import { Button } from "@/components/ui/button";

interface ArticleHeaderProps {
  isSubmitting: boolean;
  coverImageId: number | null;
  onCancel: () => void;
}

export default function ArticleHeader({
  isSubmitting,
  coverImageId,
  onCancel,
}: ArticleHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-medium">Create New Article</h1>
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !coverImageId}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isSubmitting ? "Creating..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
