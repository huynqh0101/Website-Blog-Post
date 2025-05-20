import { CalendarIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ArticleCardProps {
  category: string;
  title: string;
  author?: string;
  date: string;
  image: string;
  className?: string;
  slug: string; // Thêm prop slug để tạo đường dẫn
}

export const ArticleCard = ({
  category,
  title,
  author,
  date,
  image,
  className = "",
  slug,
}: ArticleCardProps) => {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <Card
        className={`border-0 rounded-none hover:shadow-sm transition-shadow duration-300 ${className}`}
      >
        <CardContent className="p-0">
          <div
            className="w-full h-[180px] bg-cover bg-center mb-4 transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="text-[13px] text-[#6d757f] font-normal mb-2 hover:text-[#22408a] cursor-pointer transition-colors duration-200">
            {category}
          </div>
          <h3 className="text-lg font-bold text-[#183354] mb-3 hover:text-[#22408a] hover:underline cursor-pointer transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center gap-4">
            {author && (
              <div className="flex items-center gap-1 group">
                <UserIcon className="w-[17px] h-4 group-hover:text-[#22408a] transition-colors duration-200" />
                <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                  BY
                </span>
                <span className="text-[13px] text-[#6d757f] tracking-[0.52px] hover:text-[#22408a] hover:underline transition-colors duration-200 cursor-pointer">
                  {author}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                {date}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
