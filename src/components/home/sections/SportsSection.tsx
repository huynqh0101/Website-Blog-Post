import { CalendarIcon } from "lucide-react";
import { SectionHeader } from "../SectionHeader";

interface SportsSectionProps {
  sportsData: {
    featured: {
      category: string;
      title: string;
      date: string;
      image: string;
    };
    smallArticles: Array<{
      category: string;
      title: string;
      date: string;
      image: string;
    }>;
  };
}

export const SportsSection = ({ sportsData }: SportsSectionProps) => {
  return (
    <div>
      <h2 className="text-[22px] font-bold text-[#183354] mb-4">Sports</h2>
      <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-8">
        <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
        <img
          className="absolute top-0 left-9 w-2.5 h-1.5"
          alt="Mask group"
          src="/mask-group-4.svg"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-[630px]">
          <div
            className="w-full h-[378px] bg-cover bg-center mb-4"
            style={{
              backgroundImage: `url(${sportsData.featured.image})`,
            }}
          />
          <div className="text-[13px] text-[#6d757f] font-normal mb-2">
            {sportsData.featured.category}
          </div>
          <h2 className="text-2xl font-bold text-[#183354] mb-4">
            {sportsData.featured.title}
          </h2>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-[17px] h-4" />
            <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
              {sportsData.featured.date}
            </span>
          </div>
        </div>
        <div className="md:w-[300px]">
          <div className="flex flex-col gap-6">
            {sportsData.smallArticles.map((article, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="flex-1">
                  <div className="text-[13px] text-[#6d757f] font-normal mb-1">
                    {article.category}
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#183354] mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-[17px] h-4" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                      {article.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
