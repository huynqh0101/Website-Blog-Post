import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EditorPickArticle {
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  hasPlayButton?: boolean;
}

interface EditorsPicksSectionProps {
  articles: EditorPickArticle[];
}

export const EditorsPicksSection = ({ articles }: EditorsPicksSectionProps) => {
  return (
    <div className="w-full bg-[#f9f9f9] py-16">
      <div className="container max-w-[1320px] px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-bold text-[#183354]">
            Editors' Picks
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-9 h-9 rounded border border-[#cfcfcf]"
            >
              <ChevronLeftIcon className="w-[13px] h-3.5 text-[#f4796c]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-9 h-9 rounded border border-[#cfcfcf]"
            >
              <ChevronRightIcon className="w-[13px] h-3.5 text-[#f4796c]" />
            </Button>
          </div>
        </div>

        <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-8">
          <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
          <img
            className="absolute top-0 left-9 w-2.5 h-1.5"
            alt="Mask group"
            src="/mask-group-7.svg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="border-0 rounded-none">
              <CardContent className="p-0">
                <div
                  className="relative w-full h-60 bg-cover bg-center mb-4"
                  style={{ backgroundImage: `url(${article.image})` }}
                >
                  {article.hasPlayButton && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                      <PlayIcon className="w-4 h-[18px] text-[#f4796c]" />
                    </div>
                  )}
                </div>
                <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                  {article.category}
                </div>
                <h3 className="text-xl font-bold text-[#183354] mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-[17px] h-4" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                      {article.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-[17px] h-4" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
