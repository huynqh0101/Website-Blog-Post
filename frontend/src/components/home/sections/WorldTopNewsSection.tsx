import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react";

interface WorldTopNewsArticle {
  featured: {
    category: string;
    title: string;
    date: string;
    readTime: string;
    description: string;
    image: string;
    hasPlayButton?: boolean;
  };
  smallArticles: Array<{
    category: string;
    title: string;
    date: string;
    image: string;
  }>;
}

interface WorldTopNewsSectionProps {
  worldTopNewsArticles: WorldTopNewsArticle;
}

export const WorldTopNewsSection = ({
  worldTopNewsArticles,
}: WorldTopNewsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-[22px] font-bold text-[#183354] mb-4">
        World Top News
      </h2>
      <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-8">
        <div className="absolute top-0 left-0 w-10 h-[5px]  bg-blue-600"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group.svg"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div
          className="relative md:w-[460px] h-80 bg-cover bg-center cursor-pointer transition-transform duration-300 hover:shadow-lg"
          style={{
            backgroundImage: `url(${worldTopNewsArticles.featured.image})`,
          }}
        >
          {worldTopNewsArticles.featured.hasPlayButton && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-[#f8f8f8] hover:scale-110 transition-all duration-300 cursor-pointer">
              <PlayIcon className="w-4 h-[18px] text-[#f4796c]" />
            </div>
          )}
        </div>
        <div className="md:w-[460px]">
          <div className="text-[13px] text-[#6d757f] font-normal mb-2 hover:text-[#22408a] cursor-pointer transition-colors duration-200">
            {worldTopNewsArticles.featured.category}
          </div>
          <h2 className="text-2xl font-bold text-[#183354] mb-4 hover:text-[#22408a] hover:underline cursor-pointer transition-colors duration-200">
            {worldTopNewsArticles.featured.title}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                {worldTopNewsArticles.featured.date}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                {worldTopNewsArticles.featured.readTime}
              </span>
            </div>
          </div>
          <p className="text-[#545e69] text-base leading-7 mb-4">
            {worldTopNewsArticles.featured.description}
          </p>
          <Button
            variant="outline"
            className="rounded border border-[#cfcfcf] flex items-center gap-2 hover:border-[#22408a] group transition-colors duration-200"
          >
            <span className="text-sm font-medium text-[#183354] group-hover:text-[#22408a] group-hover:underline transition-colors duration-200">
              READ MORE
            </span>
            <ChevronRightIcon className="w-2.5 h-2.5 group-hover:text-[#22408a] transition-colors duration-200" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {worldTopNewsArticles.smallArticles.map((article, index) => (
          <div
            key={index}
            className="flex gap-4 hover:bg-[#f9f9f7] p-2 rounded-md transition-colors duration-200 cursor-pointer -mx-2"
          >
            <div className="flex-1">
              <div className="text-[13px] text-[#6d757f] font-normal mb-2 hover:text-[#22408a] transition-colors duration-200">
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
              className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0 transition-transform duration-300 hover:shadow-md hover:scale-105"
              style={{ backgroundImage: `url(${article.image})` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
