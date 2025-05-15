import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, GripVertical, Trash2, Upload, Plus } from "lucide-react";

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
  return (
    <div className="pt-8">
      <div className="mb-4 flex justify-center">
        <div className="bg-[#24243c] px-4 py-2 rounded-full text-sm flex items-center">
          <span>blocks</span>
          <span className="ml-1.5 bg-gray-700 text-gray-300 text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
            {blocks.length}
          </span>
        </div>
      </div>

      {/* Blocks container */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="bg-[#24243c] rounded border border-gray-700 overflow-hidden"
          >
            <div className="flex items-center p-3 border-b border-gray-700 bg-[#2d2d4a]">
              <button type="button" className="p-1 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="flex items-center ml-2 space-x-2">
                <GripVertical className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {block.__component.split(".")[1].charAt(0).toUpperCase() +
                    block.__component.split(".")[1].slice(1).replace("-", " ")}
                </span>
              </div>
              <div className="ml-auto flex space-x-1">
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="p-1 text-gray-400 hover:text-red-400"
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
                  className="bg-[#1b1b2f] border-0 text-white min-h-[120px] focus-visible:ring-1 focus-visible:ring-indigo-500"
                  placeholder="Enter rich text content..."
                />
              )}

              {block.__component === "shared.media" && (
                <div className="space-y-3">
                  <div
                    className="h-[120px] bg-[#1b1b2f] rounded flex items-center justify-center cursor-pointer border border-dashed border-gray-700"
                    onClick={() =>
                      document.getElementById(`media-upload-${index}`)?.click()
                    }
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Upload media
                      </span>
                      <input
                        type="file"
                        id={`media-upload-${index}`}
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={(e) => {
                          // Handle media upload logic here
                        }}
                      />
                    </div>
                  </div>
                  <Input
                    placeholder="Caption"
                    className="bg-[#1b1b2f] border-0 text-white focus-visible:ring-1 focus-visible:ring-indigo-500"
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
                    className="bg-[#1b1b2f] border-0 text-white min-h-[80px] focus-visible:ring-1 focus-visible:ring-indigo-500"
                    placeholder="Quote text"
                  />
                  <Input
                    placeholder="Quote author"
                    className="bg-[#1b1b2f] border-0 text-white focus-visible:ring-1 focus-visible:ring-indigo-500"
                    value={block.author || ""}
                    onChange={(e) =>
                      updateBlockContent(index, "author", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add block button */}
        <div className="flex justify-center pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("rich-text")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Add Rich Text
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("media")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Add Media
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("quote")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Add Quote
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addBlock("slider")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Add Slider
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
