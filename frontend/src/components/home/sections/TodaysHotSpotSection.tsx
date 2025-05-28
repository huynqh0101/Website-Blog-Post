import { CalendarIcon, PlayIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; // Thêm import Link

interface TodayHotSpotArticle {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  hasPlayButton?: boolean;
  slug: string; // Thêm slug để tạo URL
}

interface TodaysHotSpotSectionProps {
  articles: TodayHotSpotArticle[];
}

export const TodaysHotSpotSection = ({
  articles,
}: TodaysHotSpotSectionProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="text-[22px] font-bold text-[#183354] hover:text-[#22408a] transition-colors duration-300 relative">
          Today's Hot Spot
        </h2>
        <div className="flex-1 ml-4 border-t border-b border-[#dfdfdf] h-[5px] relative">
          <div className="absolute top-0 left-0 w-10 h-[5px] bg-blue-600"></div>
          <img
            className="absolute top-0 left-9 w-2.5 h-1.5"
            alt="Mask group"
            src="/mask-group.svg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={`/articles/${article.slug}`}
            className="block"
          >
            <Card className="border-0 rounded-none group cursor-pointer hover:shadow-md transition-all duration-300">
              <CardContent className="p-0">
                <div
                  className="relative w-full h-[200px] bg-cover bg-center mb-3 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-300"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  {article.hasPlayButton && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-[#22408a] transition-colors duration-300">
                      <PlayIcon className="w-4 h-[18px] text-[#f4796c] group-hover:text-white" />
                    </div>
                  )}
                </div>
                <div className="text-[13px] text-[#6d757f] font-normal mb-2 group-hover:text-[#22408a] transition-colors duration-300">
                  {article.category}
                </div>
                <h3 className="text-lg font-bold text-[#183354] mb-3 group-hover:text-[#22408a] group-hover:underline transition-all duration-300">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-[17px] h-4 group-hover:text-[#22408a] transition-colors duration-300" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px] group-hover:text-[#22408a] transition-colors duration-300">
                      BY
                    </span>
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px] group-hover:text-[#22408a] transition-colors duration-300">
                      {article.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-[17px] h-4 group-hover:text-[#22408a] transition-colors duration-300" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px] group-hover:text-[#22408a] transition-colors duration-300">
                      {article.date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
