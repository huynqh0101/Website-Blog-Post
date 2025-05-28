import { CalendarIcon } from "lucide-react";
import { Advertisement } from "../advertisements/Advertisement";
import Link from "next/link"; // Thêm import Link

interface BusinessArticle {
  category: string;
  title: string;
  date: string;
  image?: string;
  slug: string; // Thêm slug để tạo URL
}

interface BusinessSectionProps {
  articles: BusinessArticle[];
}

export const BusinessSection = ({ articles }: BusinessSectionProps) => {
  // Tách bài viết đầu tiên và các bài viết còn lại
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className="mb-10 mt-[80px]">
      <h2 className="text-[22px] font-bold text-[#183354] mb-5 relative inline-block ">
        Business
      </h2>
      <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-6">
        <div className="absolute top-0 left-0 w-10 h-[5px] bg-blue-600"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group.svg"
        />
      </div>
      {/* Featured Business Article */}
      <Link href={`/articles/${featuredArticle.slug}`} className="block">
        <div className="mb-8 group cursor-pointer">
          <div
            className="w-full h-[240px] bg-cover bg-center mb-4 transition-transform duration-300 group-hover:scale-[1.02] rounded-md overflow-hidden shadow-sm"
            style={{
              backgroundImage: `url(${
                featuredArticle.image || "/default-business-image.jpg"
              })`,
            }}
          />
          <div className="text-[13px] text-[#183354] font-medium mb-2 uppercase tracking-wider">
            {featuredArticle.category}
          </div>
          <h3 className="text-xl font-bold text-[#183354] mb-2 group-hover:text-[#22408a] group-hover:underline transition-colors duration-200">
            {featuredArticle.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[#6d757f]">
            <CalendarIcon className="w-[17px] h-4" />
            <span className="text-[13px] tracking-[0.52px]">
              {featuredArticle.date}
            </span>
          </div>
        </div>
      </Link>

      {/* Side Business Articles */}
      <div className="space-y-1">
        {sideArticles.map((article, index) => (
          <Link
            key={index}
            href={`/articles/${article.slug}`}
            className="block"
          >
            <div className="py-4 border-b border-[#dfdfdf] hover:bg-gray-50 px-2 -mx-2 rounded transition-colors duration-200 cursor-pointer group">
              <div className="text-[13px] text-[#183354] font-medium mb-1.5 uppercase tracking-wider">
                {article.category}
              </div>
              <h3 className="text-lg font-bold text-[#183354] mb-2 group-hover:text-[#22408a] group-hover:underline transition-colors duration-200">
                {article.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[#6d757f]">
                <CalendarIcon className="w-[17px] h-4" />
                <span className="text-[13px] tracking-[0.52px]">
                  {article.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Advertisement Image */}
      <div className="mt-8">
        <Advertisement
          image="/sidebar-img06-jpg.png"
          className="w-full h-[238px] bg-cover bg-center rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
        />
      </div>
    </div>
  );
};
