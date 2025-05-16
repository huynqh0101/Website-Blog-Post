import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  GripVertical,
  Trash2,
  Upload,
  Plus,
  Type,
  Image as ImageIcon,
  Quote,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/services/articleService";
type BlockType = "rich-text" | "media" | "quote" | "slider";

interface BlockData {
  __component: string;
  id?: number;
  [key: string]: any;
}

interface ArticleBlocksProps {
  blocks: BlockData[];
  updateBlockContent: (index: number, key: string, value: any) => void;
  removeBlock: (index: number) => void;
  addBlock: (type: BlockType) => void;
}

export default function ArticleBlocks({
  blocks,
  updateBlockContent,
  removeBlock,
  addBlock,
}: ArticleBlocksProps) {
  const [isUploading, setIsUploading] = useState(false);
  const handleMediaUpload = async (index: number, file: File) => {
    try {
      setIsUploading(true);

      // Sử dụng service chung
      const fileIds = await uploadFiles(file);

      if (fileIds && fileIds.length > 0) {
        // Update block with file ID
        updateBlockContent(index, "file", fileIds[0]);
        toast.success("Media uploaded successfully");
      }
    } catch (error) {
      console.error("Error in handleMediaUpload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSliderUpload = async (index: number, files: FileList) => {
    try {
      setIsUploading(true);

      // Sử dụng service chung
      const fileIds = await uploadFiles(Array.from(files));

      if (fileIds && fileIds.length > 0) {
        // Update block with array of file IDs
        updateBlockContent(index, "files", fileIds);
        toast.success("Slider images uploaded successfully");
      }
    } catch (error) {
      console.error("Error in handleSliderUpload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-6">
      <div className="mb-6 flex justify-center">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 rounded-full shadow-md shadow-blue-200/50 text-white text-sm flex items-center">
          <span className="font-semibold">Content Blocks</span>
          <span className="ml-2 bg-white/20 text-white text-xs rounded-full w-6 h-6 inline-flex items-center justify-center">
            {blocks.length}
          </span>
        </div>
      </div>

      {/* Blocks container */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-blue-100 overflow-hidden shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center p-3 border-b border-blue-100 bg-blue-50">
              <button
                type="button"
                className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="flex items-center ml-2 space-x-2">
                <GripVertical className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-700">
                  {block.__component.split(".")[1].charAt(0).toUpperCase() +
                    block.__component.split(".")[1].slice(1).replace("-", " ")}
                </span>
              </div>
              <div className="ml-auto flex space-x-1">
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {block.__component === "shared.rich-text" && (
                <Textarea
                  value={block.content || ""}
                  onChange={(e) =>
                    updateBlockContent(index, "content", e.target.value)
                  }
                  className="bg-white border border-blue-200 text-slate-800 min-h-[120px] focus-visible:ring-1 focus-visible:ring-blue-500 resize-y"
                  placeholder="Enter rich text content..."
                />
              )}

              {block.__component === "shared.media" && (
                <div className="space-y-3">
                  <div
                    className="h-[140px] bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer border border-dashed border-blue-200 hover:border-blue-400 transition-colors"
                    onClick={() =>
                      document.getElementById(`media-upload-${index}`)?.click()
                    }
                  >
                    {block.file ? (
                      <div className="text-center">
                        <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-md mb-2 font-medium">
                          Media successfully uploaded
                        </div>
                        <span className="text-xs text-blue-700 px-3 py-1 bg-blue-100 rounded-full">
                          Click to change
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                          <Upload className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-blue-700">
                          {isUploading ? "Uploading..." : "Upload media"}
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={`media-upload-${index}`}
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleMediaUpload(index, e.target.files[0]);
                        }
                      }}
                      disabled={isUploading}
                    />
                  </div>
                  <Input
                    placeholder="Caption"
                    className="bg-white border border-blue-200 text-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500"
                    value={block.caption || ""}
                    onChange={(e) =>
                      updateBlockContent(index, "caption", e.target.value)
                    }
                  />
                </div>
              )}

              {block.__component === "shared.quote" && (
                <div className="space-y-2">
                  <Textarea
                    value={block.text || ""}
                    onChange={(e) =>
                      updateBlockContent(index, "text", e.target.value)
                    }
                    className="bg-white border border-blue-200 text-slate-800 min-h-[80px] focus-visible:ring-1 focus-visible:ring-blue-500"
                    placeholder="Quote text"
                  />
                  <Input
                    placeholder="Quote author"
                    className="bg-white border border-blue-200 text-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500"
                    value={block.author || ""}
                    onChange={(e) =>
                      updateBlockContent(index, "author", e.target.value)
                    }
                  />
                </div>
              )}

              {block.__component === "shared.slider" && (
                <div className="space-y-3">
                  <div
                    className="h-[140px] bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer border border-dashed border-blue-200 hover:border-blue-400 transition-colors"
                    onClick={() =>
                      document.getElementById(`slider-upload-${index}`)?.click()
                    }
                  >
                    {block.files && block.files.length > 0 ? (
                      <div className="text-center">
                        <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-md mb-2 font-medium">
                          {block.files.length} images uploaded
                        </div>
                        <span className="text-xs text-blue-700 px-3 py-1 bg-blue-100 rounded-full">
                          Click to change
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                          <Upload className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-blue-700">
                          {isUploading
                            ? "Uploading..."
                            : "Upload slider images"}
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      id={`slider-upload-${index}`}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleSliderUpload(index, e.target.files);
                        }
                      }}
                      disabled={isUploading}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add block button */}
        <div className="flex justify-center pt-6">
          <div className="grid grid-cols-2 gap-3 w-full max-w-2xl">
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("rich-text")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all group"
            >
              <Type className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Rich Text
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("media")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all group"
            >
              <ImageIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Media
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("quote")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all group"
            >
              <Quote className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Quote
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("slider")}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all group"
            >
              <Layers className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Slider
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
