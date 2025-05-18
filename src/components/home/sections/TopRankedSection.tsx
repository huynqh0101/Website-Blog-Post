import { CalendarIcon } from "lucide-react";
import { TopRankedArticles } from "../sidebars/TopRankedArticles";
interface TopRankedArticle {
  number: string;
  title: string;
  date: string;
}

interface TopRankedSectionProps {
  articles: TopRankedArticle[];
}

export const TopRankedSection = ({ articles }: TopRankedSectionProps) => {
  return (
    <div className="mb-8">
      <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-4">
        <div className="absolute top-0 left-0 w-10 h-[5px]  bg-blue-600"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group.svg"
        />
      </div>
      <h2 className="text-[22px] font-bold text-[#183354] mb-6">Top Ranked</h2>
      <TopRankedArticles articles={articles} />
    </div>
  );
};
