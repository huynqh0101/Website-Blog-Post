import { Button } from "@/components/ui/button";
import { X, Plus, Image as ImageIcon } from "lucide-react";
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
    <div className="space-y-3 mb-8">
      <label className="text-sm font-medium text-blue-700 flex items-center gap-2">
        <ImageIcon className="w-4 h-4" /> Cover Image
      </label>
      <div
        className={`h-[180px] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ${
          coverPreview
            ? "border-none shadow-md shadow-blue-200"
            : "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 hover:border-blue-400"
        }`}
        onClick={() => document.getElementById("cover-input")?.click()}
      >
        {coverPreview ? (
          <div className="relative w-full h-full group">
            <Image
              src={coverPreview}
              alt="Cover preview"
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <span className="text-xs text-white font-medium">
                Click to change image
              </span>
              <button
                type="button"
                className="bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setCoverPreview(null);
                  setCoverImage(null);
                  setCoverImageId(null);
                }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center px-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-800 block">
              Click to select a cover image
            </span>
            <span className="text-xs text-blue-600 mt-1 block">
              Recommended: 1200 x 600 pixels
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
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-sm"
          size="sm"
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : (
            "Upload Cover Image"
          )}
        </Button>
      )}
      {coverImageId && (
        <p className="text-xs bg-green-100 text-green-700 py-1.5 px-3 rounded-md font-medium flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Image uploaded successfully (ID: {coverImageId})
        </p>
      )}
    </div>
  );
}
