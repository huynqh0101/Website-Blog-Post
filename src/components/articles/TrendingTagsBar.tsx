"use client";
import { TrendingUp } from "lucide-react";

export const TrendingTagsBar = () => {
  const trendingTags = [
    "COVID-19",
    "Climate Change",
    "Economy",
    "Elections",
    "Technology",
    "AI",
    "Sports",
    "Health",
  ];

  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm p-3 rounded-lg flex items-center overflow-x-auto no-scrollbar">
      <div className="flex items-center text-primary font-medium mr-4 whitespace-nowrap">
        <TrendingUp size={16} className="mr-2" />
        <span>Trending:</span>
      </div>

      <div className="flex space-x-3">
        {trendingTags.map((tag, index) => (
          <a
            key={tag}
            href={`/articles?tag=${tag.toLowerCase().replace(" ", "-")}`}
            className={`text-sm whitespace-nowrap hover:text-primary transition-colors ${
              index < 3
                ? "font-medium text-gray-800 dark:text-gray-200"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
};
