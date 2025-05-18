import { CalendarIcon } from "lucide-react";

interface SmallArticleCardProps {
  category?: string;
  title: string;
  date: string;
  image?: string;
}

export const SmallArticleCard = ({
  category,
  title,
  date,
  image,
}: SmallArticleCardProps) => {
  return (
    <div className="flex gap-4">
      {image && (
        <div
          className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="flex-1">
        {category && (
          <div className="text-[13px] text-[#6d757f] font-normal mb-1">
            {category}
          </div>
        )}
        <h3 className="text-[17px] font-semibold text-[#183354] mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-[17px] h-4" />
          <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};
