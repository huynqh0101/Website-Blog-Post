import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlockResult } from "@/types/media-block";
import { Textarea } from "@/components/ui/textarea";
import { useArticleContext } from "@/context/articleContext";
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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { uploadFiles } from "@/services/articleService";
import {
  fetchFileById,
  getImageUrl,
  fetchArticleBlocksMedia,
} from "@/services/api";
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
  const [mediaContent, setMediaContent] = useState<BlockResult[]>([]);
  const { articleId, isEditMode } = useArticleContext();

  // Lấy dữ liệu ảnh khi component được mount
  useEffect(() => {
    async function loadMediaContent() {
      if (!articleId || !isEditMode) return;

      try {
        console.log("Loading media for article:", articleId);
        const mediaBlocks = await fetchArticleBlocksMedia(articleId);
        setMediaContent(mediaBlocks);
      } catch (error) {
        console.error("Error loading media:", error);
      }
    }

    loadMediaContent();
  }, [articleId, isEditMode]);

  // Hàm helper để tìm URL ảnh từ mediaContent cho một block cụ thể
  const getMediaUrlForBlock = (blockId: number): string | null => {
    const mediaBlock = mediaContent.find(
      (item) => item.type === "media" && item.id === blockId
    );

    if (mediaBlock && mediaBlock.type === "media") {
      return mediaBlock.fileUrl;
    }

    return null;
  };

  // Hàm helper để lấy slides cho một block slider cụ thể
  const getSlidesForBlock = (
    blockId: number
  ): { id: number; url: string }[] => {
    const sliderBlock = mediaContent.find(
      (item) => item.type === "slider" && item.id === blockId
    );

    if (sliderBlock && sliderBlock.type === "slider") {
      return sliderBlock.slides;
    }

    return [];
  };

  const handleMediaUpload = async (index: number, file: File) => {
    try {
      setIsUploading(true);

      // Upload file và nhận ID
      const fileIds = await uploadFiles(file);

      if (fileIds && fileIds.length > 0) {
        // Fetch metadata đầy đủ của file để có thông tin hiển thị
        const fileData = await fetchFileById(fileIds[0]);

        // Cập nhật block với toàn bộ đối tượng file thay vì chỉ ID
        // Điều này đảm bảo getImageUrl có đủ thông tin để tạo URL
        updateBlockContent(index, "file", fileData);
        toast.success("Media uploaded successfully");
      }
    } catch (error) {
      console.error("Error in handleMediaUpload:", error);
      toast.error("Failed to upload media");
    } finally {
      setIsUploading(false);
    }
  };

  const addToSlider = async (blockIndex: number, files: FileList) => {
    try {
      setIsUploading(true);

      const fileIds = await uploadFiles(Array.from(files));
      if (!fileIds || !fileIds.length) {
        toast.error("Failed to upload images");
        return;
      }

      // Fetch dữ liệu chi tiết cho mỗi ảnh đã upload
      const fileDetails = await Promise.all(
        fileIds.map((id) => fetchFileById(id))
      );

      // IMPORTANT: Always get the current block from the latest state
      // Instead of directly referencing blocks[blockIndex]
      updateBlockContent(blockIndex, "files", (currentFiles: any[]) => {
        // Ensure currentFiles is an array with proper deep copy
        const existingFiles = Array.isArray(currentFiles)
          ? JSON.parse(JSON.stringify(currentFiles))
          : [];

        console.log("Existing files before update:", existingFiles);
        console.log("New files to add:", fileDetails);

        // Return a completely new array reference
        return [...existingFiles, ...fileDetails];
      });

      toast.success(`Added ${fileDetails.length} images to slider`);
    } catch (error) {
      console.error("Error adding to slider:", error);
      toast.error("Failed to add images to slider");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSliderUpload = async (index: number, files: FileList) => {
    try {
      setIsUploading(true);

      // Upload files và nhận mảng ID
      const fileIds = await uploadFiles(Array.from(files));

      if (fileIds && fileIds.length > 0) {
        // Fetch metadata đầy đủ cho mỗi file
        const fileDetails = await Promise.all(
          fileIds.map((id) => fetchFileById(id))
        );

        // Update block với mảng đối tượng file đầy đủ
        updateBlockContent(index, "files", fileDetails);
        toast.success("Slider images uploaded successfully");
      }
    } catch (error) {
      console.error("Error in handleSliderUpload:", error);
      toast.error("Failed to upload slider images");
    } finally {
      setIsUploading(false);
    }
  };
  const removeFromSlider = (blockIndex: number, imageIndex: number) => {
    // Lấy mảng files hiện tại từ block
    const currentFiles = blocks[blockIndex].files || [];

    // Tạo mảng mới bằng cách loại bỏ ảnh ở vị trí imageIndex
    const updatedFiles = [
      ...currentFiles.slice(0, imageIndex),
      ...currentFiles.slice(imageIndex + 1),
    ];

    // Cập nhật block với mảng files mới
    updateBlockContent(blockIndex, "files", updatedFiles);
    toast.success("Image removed from slider");
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
                  {block.file ||
                  (isEditMode && block.id && getMediaUrlForBlock(block.id)) ? (
                    <div className="relative border rounded overflow-hidden">
                      {(() => {
                        // Ưu tiên sử dụng URL từ mediaContent (đã được tối ưu)
                        const mediaUrl =
                          isEditMode && block.id
                            ? getMediaUrlForBlock(block.id)
                            : null;
                        // Fallback về cách cũ nếu không có dữ liệu từ mediaContent
                        const imageUrl =
                          mediaUrl || getImageUrl(block.file, "thumbnail");

                        console.log("Media block image URL:", imageUrl);
                        console.log("Media URL from context:", mediaUrl);

                        return imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={block.caption || "Media content"}
                            className="w-full h-auto object-contain max-h-[200px]"
                            onError={(e) => {
                              console.error(
                                `Error loading media image: ${imageUrl}`
                              );
                              e.currentTarget.src = "/placeholder-image.png"; // Fallback image
                            }}
                          />
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">
                              Image not available
                            </span>
                          </div>
                        );
                      })()}
                      <div className="p-2 text-center">
                        <Input
                          placeholder="Add caption (optional)"
                          className="bg-white border border-blue-200 text-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 mt-2"
                          value={block.caption || ""}
                          onChange={(e) =>
                            updateBlockContent(index, "caption", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-[140px] bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer border border-dashed border-blue-200 hover:border-blue-400 transition-colors"
                      onClick={() =>
                        document
                          .getElementById(`media-upload-${index}`)
                          ?.click()
                      }
                    >
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Upload className="h-6 w-6 text-blue-500" />
                        </div>
                        <p className="text-blue-600 font-medium">
                          Click to upload an image
                        </p>
                        <p className="text-slate-500 text-sm">
                          JPG, PNG or GIF
                        </p>
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    id={`media-upload-${index}`}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleMediaUpload(index, e.target.files[0]);
                      }
                    }}
                    disabled={isUploading}
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
                  {/* Preview existing images */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {(() => {
                      // Tạo mảng hiển thị kết hợp từ cả hai nguồn hình ảnh
                      let displayImages: {
                        type: "local" | "api";
                        index: number;
                        url: string;
                        file?: any;
                        id?: number;
                      }[] = [];

                      // Thêm hình ảnh từ block.files (hình ảnh đã upload) nếu có
                      if (
                        Array.isArray(block.files) &&
                        block.files.length > 0
                      ) {
                        displayImages = block.files.map((file, idx) => ({
                          type: "local",
                          index: idx,
                          url: getImageUrl(file, "thumbnail"),
                          file,
                        }));
                      }
                      // Thêm hình ảnh từ API nếu không có hình ảnh local
                      else if (
                        isEditMode &&
                        block.id &&
                        getSlidesForBlock(block.id).length > 0
                      ) {
                        displayImages = getSlidesForBlock(block.id).map(
                          (slide, idx) => ({
                            type: "api",
                            index: idx,
                            url: slide.url,
                            id: slide.id,
                          })
                        );
                      }

                      // Hiển thị trạng thái trống nếu không có hình ảnh nào
                      if (displayImages.length === 0) {
                        return (
                          <div className="col-span-2 text-center py-4 text-slate-500 bg-slate-50 rounded">
                            Chưa có hình ảnh nào
                          </div>
                        );
                      }

                      // Hiển thị tất cả hình ảnh
                      return displayImages.map((item, idx) => (
                        <div
                          key={`${item.type}-${item.index}`}
                          className="relative group border rounded overflow-hidden"
                        >
                          <img
                            src={item.url}
                            alt={`Slide ${idx + 1}`}
                            className="w-full h-auto object-contain max-h-[150px]"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.png";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (item.type === "local") {
                                removeFromSlider(index, item.index);
                              } else {
                                toast.info(
                                  "Chức năng xóa hình ảnh đã lưu sẽ được cập nhật sớm"
                                );
                              }
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Upload button */}
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        document
                          .getElementById(`slider-upload-${index}`)
                          ?.click()
                      }
                      disabled={isUploading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {Array.isArray(block.files) && block.files.length > 0
                        ? "Add More Images"
                        : "Add Images"}
                    </Button>
                    <Input
                      placeholder="Caption (optional)"
                      className="bg-white flex-1 border border-blue-200"
                      value={block.caption || ""}
                      onChange={(e) =>
                        updateBlockContent(index, "caption", e.target.value)
                      }
                    />
                    <input
                      type="file"
                      id={`slider-upload-${index}`}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          if (
                            Array.isArray(block.files) &&
                            block.files.length > 0
                          ) {
                            addToSlider(index, e.target.files);
                          } else {
                            handleSliderUpload(index, e.target.files);
                          }
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
