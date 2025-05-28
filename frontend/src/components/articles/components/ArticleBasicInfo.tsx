import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";

interface ArticleBasicInfoProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

interface SlugProps {
  slug: string;
  setSlug: (slug: string) => void;
  title: string;
}

export default function ArticleBasicInfo({
  title,
  setTitle,
  description,
  setDescription,
}: ArticleBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white border border-blue-200 text-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-sm"
          placeholder="Enter article title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-700">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white border border-blue-200 text-slate-800 h-[100px] focus-visible:ring-1 focus-visible:ring-blue-500 resize-none shadow-sm"
          placeholder="Enter article description"
          maxLength={80}
        />
        <div className="text-xs text-blue-600 flex justify-between">
          <span>Max: 80 characters</span>
          <span>{description.length}/80</span>
        </div>
      </div>
    </div>
  );
}

// Slug subcomponent
ArticleBasicInfo.Slug = function ArticleSlug({
  slug,
  setSlug,
  title,
}: SlugProps) {
  const generateSlug = () => {
    setSlug(
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-blue-700 flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="m15 7-5 5 5 5" />
          <path d="M13.5 17.5h2a4 4 0 0 0 0-8h-2" />
          <path d="M6.5 17.5h2a4 4 0 0 0 0-8h-2" />
        </svg>
        Slug
      </label>
      <div className="relative group">
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="bg-white border border-blue-200 text-slate-800 pr-12 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-sm group-hover:border-blue-300 transition-colors"
          placeholder="article-slug"
        />
        <button
          type="button"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 p-1.5 rounded-md transition-colors"
          onClick={generateSlug}
          title="Generate slug from title"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="text-xs text-blue-600 flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        Auto-generated from title
      </div>
    </div>
  );
};
