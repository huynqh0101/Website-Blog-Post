"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Image as ImageIcon,
  Quote,
  Type,
  X,
  ChevronUp,
  ChevronDown,
  UploadCloud,
} from "lucide-react";

// Định nghĩa các loại block
type BlockType = "rich-text" | "media" | "quote" | "slider";

interface BlockData {
  __component: string;
  id?: number;
  [key: string]: any;
}

interface EditorProps {
  value: BlockData[];
  onChange: (blocks: BlockData[]) => void;
  placeholder?: string;
}

export const Editor = ({ value = [], onChange, placeholder }: EditorProps) => {
  const [blocks, setBlocks] = useState<BlockData[]>(value);
  const [mediaUploads, setMediaUploads] = useState<{
    [index: number]: boolean;
  }>({});

  // Thêm một block mới
  const addBlock = (type: BlockType) => {
    let newBlock: BlockData;

    switch (type) {
      case "rich-text":
        newBlock = {
          __component: "shared.rich-text",
          content: "",
        };
        break;
      case "media":
        newBlock = {
          __component: "shared.media",
          file: null,
          caption: "",
        };
        break;
      case "quote":
        newBlock = {
          __component: "shared.quote",
          text: "",
          author: "",
        };
        break;
      case "slider":
        newBlock = {
          __component: "shared.slider",
          files: [],
        };
        break;
      default:
        return;
    }

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // Cập nhật nội dung của một block
  const updateBlock = (index: number, data: any) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...data };
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // Xóa một block
  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // Di chuyển block lên/xuống
  const moveBlock = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Hoán đổi vị trí
    [newBlocks[index], newBlocks[newIndex]] = [
      newBlocks[newIndex],
      newBlocks[index],
    ];

    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  // Upload file media
  const uploadMedia = async (index: number, file: File) => {
    try {
      setMediaUploads({ ...mediaUploads, [index]: true });

      // Tạo FormData để upload file
      const formData = new FormData();
      formData.append("files", file);

      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload media");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        // Cập nhật block với ID file đã upload
        updateBlock(index, { file: data[0].id });
        return data[0].id;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    } finally {
      setMediaUploads({ ...mediaUploads, [index]: false });
    }
  };

  // Upload nhiều file cho slider
  const uploadMultipleMedia = async (index: number, files: FileList) => {
    try {
      setMediaUploads({ ...mediaUploads, [index]: true });

      const token = localStorage.getItem("jwt");
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        // Lấy danh sách ID của tất cả file đã upload
        const fileIds = data.map((item: any) => item.id);
        updateBlock(index, { files: fileIds });
        return fileIds;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    } finally {
      setMediaUploads({ ...mediaUploads, [index]: false });
    }
  };

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-white">
      {blocks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          {placeholder || "Start adding content blocks to your article..."}
        </div>
      )}

      {blocks.map((block, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                {block.__component.split(".")[1].replace(/-/g, " ")}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => moveBlock(index, "up")}
                disabled={index === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => moveBlock(index, "down")}
                disabled={index === blocks.length - 1}
                className="h-8 w-8 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeBlock(index)}
                className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rich Text Component */}
          {block.__component === "shared.rich-text" && (
            <Textarea
              value={block.content || ""}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder="Enter your text content here..."
              className="min-h-[100px]"
            />
          )}

          {/* Quote Component */}
          {block.__component === "shared.quote" && (
            <div className="space-y-2">
              <Textarea
                value={block.text || ""}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                placeholder="Enter quote text..."
                className="min-h-[80px]"
              />
              <Input
                value={block.author || ""}
                onChange={(e) => updateBlock(index, { author: e.target.value })}
                placeholder="Author name"
              />
            </div>
          )}

          {/* Media Component */}
          {block.__component === "shared.media" && (
            <div className="space-y-3">
              {block.file ? (
                <div className="bg-gray-100 p-3 rounded text-sm flex justify-between items-center">
                  <span>Media file uploaded (ID: {block.file})</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                    onClick={() => updateBlock(index, { file: null })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-3">
                    Upload a media file (image, video)
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id={`media-upload-${index}`}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          await uploadMedia(index, e.target.files[0]);
                        } catch (err) {
                          console.error("Upload failed:", err);
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={mediaUploads[index]}
                    onClick={() =>
                      document.getElementById(`media-upload-${index}`)?.click()
                    }
                  >
                    {mediaUploads[index] ? (
                      <>
                        <span className="animate-spin mr-2">⌛</span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Select File
                      </>
                    )}
                  </Button>
                </div>
              )}

              <Input
                value={block.caption || ""}
                onChange={(e) =>
                  updateBlock(index, { caption: e.target.value })
                }
                placeholder="Caption (optional)"
              />
            </div>
          )}

          {/* Slider Component */}
          {block.__component === "shared.slider" && (
            <div className="space-y-2">
              {block.files && block.files.length > 0 ? (
                <div className="bg-gray-100 p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {block.files.length} files uploaded
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
                      onClick={() => updateBlock(index, { files: [] })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {block.files.map((fileId: number, i: number) => (
                      <div key={i} className="bg-gray-200 p-2 rounded text-xs">
                        ID: {fileId}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-3">
                    Upload multiple images for a slider
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id={`slider-upload-${index}`}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        try {
                          await uploadMultipleMedia(index, e.target.files);
                        } catch (err) {
                          console.error("Upload failed:", err);
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={mediaUploads[index]}
                    onClick={() =>
                      document.getElementById(`slider-upload-${index}`)?.click()
                    }
                  >
                    {mediaUploads[index] ? (
                      <>
                        <span className="animate-spin mr-2">⌛</span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Select Images
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Block selector */}
      <div className="flex flex-wrap gap-2 justify-center mt-4 p-4 border rounded-lg bg-gray-50">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock("rich-text")}
          className="space-x-1"
        >
          <Type className="h-4 w-4" />
          <span>Add Text</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock("media")}
          className="space-x-1"
        >
          <ImageIcon className="h-4 w-4" />
          <span>Add Media</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock("quote")}
          className="space-x-1"
        >
          <Quote className="h-4 w-4" />
          <span>Add Quote</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock("slider")}
          className="space-x-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Slider</span>
        </Button>
      </div>
    </div>
  );
};
