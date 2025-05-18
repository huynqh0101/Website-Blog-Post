import { CalendarIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ArticleCardProps {
  category: string;
  title: string;
  author?: string;
  date: string;
  image: string;
  className?: string;
}

export const ArticleCard = ({
  category,
  title,
  author,
  date,
  image,
  className = "",
}: ArticleCardProps) => {
  return (
    <Card className={`border-0 rounded-none ${className}`}>
      <CardContent className="p-0">
        <div
          className="w-full h-[180px] bg-cover bg-center mb-4"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="text-[13px] text-[#6d757f] font-normal mb-2">
          {category}
        </div>
        <h3 className="text-lg font-bold text-[#183354] mb-3">{title}</h3>
        <div className="flex items-center gap-4">
          {author && (
            <div className="flex items-center gap-1">
              <UserIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                BY
              </span>
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
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
  );
};
