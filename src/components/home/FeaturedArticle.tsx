import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, PlayIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedArticleProps {
  article: {
    category: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    image: string;
    hasPlayButton?: boolean;
  };
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Card className="border-0 rounded-none">
      <CardContent className="p-0">
        <div
          className="relative w-full h-[428px] bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          {article.hasPlayButton && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
              <PlayIcon className="w-4 h-[18px] text-[#f4796c]" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mt-6">
          <Badge className="rounded-[3px] text-[#6d757f] bg-transparent border-[#b8c1cd] mb-4">
            {article.category}
          </Badge>
          <h2 className="text-[28px] font-extrabold text-[#183354] text-center leading-tight mb-4">
            {article.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <UserIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                BY
              </span>
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                {article.author}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                {article.date}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-[17px] h-4" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                {article.readTime}
              </span>
            </div>
          </div>
          <p className="text-[#545e69] text-base text-center leading-7">
            {article.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
