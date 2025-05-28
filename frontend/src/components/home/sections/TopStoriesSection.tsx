import { CalendarIcon } from "lucide-react";
import { Advertisement } from "../advertisements/Advertisement";

interface TopStoryArticle {
  category: string;
  title: string;
  date: string;
  image: string;
}

interface TopStoriesSectionProps {
  articles: TopStoryArticle[];
}

export const TopStoriesSection = ({ articles }: TopStoriesSectionProps) => {
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
      <h2 className="text-[22px] font-bold text-[#183354] mb-6">Top Stories</h2>

      {articles.map((article, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 pb-6 ${
            index < articles.length - 1 ? "border-b border-[#dfdfdf] mb-6" : ""
          } cursor-pointer hover:bg-[#f9f9f7] transition-colors duration-200 p-2 rounded-md -mx-2`}
        >
          <div className="flex-1">
            <div className="text-[13px] text-[#6d757f] font-normal mb-1">
              {article.category}
            </div>
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
          <div
            className="w-[90px] h-[90px] rounded-full bg-cover bg-center flex-shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-md overflow-hidden"
            style={{ backgroundImage: `url(${article.image})` }}
          />
        </div>
      ))}
    </div>
  );
};
