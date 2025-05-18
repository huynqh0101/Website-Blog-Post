import { CalendarIcon } from "lucide-react";
import { Advertisement } from "../advertisements/Advertisement";

interface BusinessArticle {
  category: string;
  title: string;
  date: string;
  image?: string;
}

interface BusinessSectionProps {
  articles: BusinessArticle[];
}

export const BusinessSection = ({ articles }: BusinessSectionProps) => {
  // Tách bài viết đầu tiên và các bài viết còn lại
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className="mb-8">
      <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-4">
        <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group-3.svg"
        />
      </div>
      <h2 className="text-[22px] font-bold text-[#183354] mb-6">Business</h2>

      {/* Featured Business Article */}
      <div className="mb-6">
        <div
          className="w-full h-[220px] bg-cover bg-center mb-4"
          style={{
            backgroundImage: `url(${featuredArticle.image})`,
          }}
        />
        <div className="text-[13px] text-[#6d757f] font-normal mb-2">
          {featuredArticle.category}
        </div>
        <h3 className="text-lg font-bold text-[#183354] mb-2">
          {featuredArticle.title}
        </h3>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-[17px] h-4" />
          <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
            {featuredArticle.date}
          </span>
        </div>
      </div>

      {/* Side Business Articles */}
      {sideArticles.map((article, index) => (
        <div key={index} className="pb-6 mb-6 border-b border-[#dfdfdf]">
          <div className="text-[13px] text-[#6d757f] font-normal mb-2">
            {article.category}
          </div>
          <h3 className="text-lg font-bold text-[#183354] mb-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-[17px] h-4" />
            <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
              {article.date}
            </span>
          </div>
        </div>
      ))}

      {/* Advertisement Image */}
      <Advertisement
        image="/sidebar-img06-jpg.png"
        className="w-full h-[238px] bg-cover bg-center rounded-[5px]"
      />
    </div>
  );
};
