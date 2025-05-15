import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#24243c] border-0 text-white focus-visible:ring-1 focus-visible:ring-indigo-500"
          placeholder="Enter article title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-[#24243c] border-0 text-white h-[100px] focus-visible:ring-1 focus-visible:ring-indigo-500"
          placeholder="Enter article description"
          maxLength={80}
        />
        <div className="text-xs text-gray-500">max: 80 characters</div>
      </div>
    </div>
  );
}

// Slug subcomponent
ArticleBasicInfo.Slug = function ArticleSlug({ slug, setSlug, title }: SlugProps) {
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
      <label className="text-sm font-medium text-gray-400">slug</label>
      <div className="relative">
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="bg-[#24243c] border-0 text-white pr-10 focus-visible:ring-1 focus-visible:ring-indigo-500"
          placeholder="article-slug"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          onClick={generateSlug}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 15l6-6m-6 6l-6-6m6 6V9m0 0h-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
