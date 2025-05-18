import { CalendarIcon } from "lucide-react";

interface TopRankedArticlesProps {
  articles: Array<{
    number: string;
    title: string;
    date: string;
  }>;
}

export const TopRankedArticles = ({ articles }: TopRankedArticlesProps) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-[#f9f9f7] p-4 mb-3 hover:shadow-sm transition-shadow duration-200 cursor-pointer"
        >
          <div className="flex gap-4">
            <span className="text-[26px] font-semibold text-[#c2c2c2] group-hover:text-[#22408a]">
              {article.number}
            </span>
            <div>
              <h3 className="text-[17px] font-semibold text-[#183354] mb-2 hover:text-[#22408a] hover:underline transition-colors duration-200">
                {article.title}
              </h3>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-[17px] h-4" />
                <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                  {article.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
