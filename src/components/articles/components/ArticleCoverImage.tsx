import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import Image from "next/image";

interface ArticleCoverImageProps {
  coverPreview: string | null;
  setCoverPreview: (preview: string | null) => void;
  setCoverImage: (image: File | null) => void;
  setCoverImageId: (id: number | null) => void;
  coverImage: File | null;
  coverImageId: number | null;
  isUploading: boolean;
  handleCoverImageUpload: () => Promise<void>;
  handleCoverImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ArticleCoverImage({
  coverPreview,
  setCoverPreview,
  setCoverImage,
  setCoverImageId,
  coverImage,
  coverImageId,
  isUploading,
  handleCoverImageUpload,
  handleCoverImageChange,
}: ArticleCoverImageProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400">Cover</label>
      <div
        className="h-[120px] bg-[#24243c] rounded flex items-center justify-center cursor-pointer border border-dashed border-gray-600"
        onClick={() => document.getElementById("cover-input")?.click()}
      >
        {coverPreview ? (
          <div className="relative w-full h-full">
            <Image
              src={coverPreview}
              alt="Cover preview"
              fill
              className="object-cover rounded"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                setCoverPreview(null);
                setCoverImage(null);
                setCoverImageId(null);
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Plus className="h-10 w-10 mx-auto text-gray-500" />
            <span className="text-sm text-gray-500">
              Click to add an asset or drag and drop one in this area
            </span>
            <input
              type="file"
              id="cover-input"
              className="hidden"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
          </div>
        )}
      </div>
      {coverImage && !coverImageId && (
        <Button
          type="button"
          onClick={handleCoverImageUpload}
          disabled={isUploading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          size="sm"
        >
          {isUploading ? "Uploading..." : "Upload Cover Image"}
        </Button>
      )}
      {coverImageId && (
        <p className="text-xs text-green-500">Image ID: {coverImageId}</p>
      )}
    </div>
  );
}
