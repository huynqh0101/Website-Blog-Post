import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronRightIcon, UserIcon } from "lucide-react";
import Link from "next/link"; // Import Link từ Next.js

interface PoliticsSectionProps {
  articles: Array<{
    category?: string;
    title: string;
    author?: string;
    date: string;
    description?: string;
    image?: string;
    id?: string;
    slug?: string;
  }>;
}

export const PoliticsSection = ({ articles }: PoliticsSectionProps) => {
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-[22px] font-bold text-[#183354]">Politics</h2>
        <div className="flex-1 ml-4 border-t border-b border-[#dfdfdf] h-[5px] relative">
          <div className="absolute top-0 left-0 w-10 h-[5px]  bg-blue-600"></div>
          <img
            className="absolute top-0 left-9 w-2.5 h-1.5"
            alt="Mask group"
            src="/mask-group.svg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-[653px]">
          <div className="flex flex-col md:flex-row gap-6">
            <Link href={`/articles/${mainArticle.slug}`} className="block w-full md:w-[330px]">
              <div
                className="w-full h-[295px] bg-cover bg-center"
                style={{ backgroundImage: `url(${mainArticle.image})` }}
              />
            </Link>
            <div className="flex flex-col">
              <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                {mainArticle.category}
              </div>
              <Link href={`/articles/${mainArticle.slug}`}>
                <h3 className="text-xl font-extrabold text-[#183354] mb-4 hover:text-[#22408a] hover:underline cursor-pointer transition-colors duration-200">
                  {mainArticle.title}
                </h3>
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <UserIcon className="w-[17px] h-4" />
                  <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                    BY
                  </span>
                  <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                    {mainArticle.author}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-[17px] h-4" />
                  <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                    {mainArticle.date}
                  </span>
                </div>
              </div>
              <p className="text-[#545e69] text-base leading-7 mb-4">
                {mainArticle.description}
              </p>
              <Link href={`/articles/${mainArticle.slug}`}>
                <Button
                  variant="outline"
                  className="w-[138px] h-9 rounded border border-[#cfcfcf] flex items-center gap-2 group hover:border-[#22408a] transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-[#183354] group-hover:text-[#22408a] group-hover:underline transition-colors duration-200">
                    READ MORE
                  </span>
                  <ChevronRightIcon className="w-2.5 h-2.5 group-hover:text-[#22408a] transition-colors duration-200" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-[267px] border-l border-[#dfdfdf] pl-6">
          <div className="flex flex-col gap-4">
            {sideArticles.map((article, index) => (
              <div
                key={index}
                className={`pb-4 ${
                  index < sideArticles.length - 1
                    ? "border-b border-[#dfdfdf]"
                    : ""
                }`}
              >
                <Link href={`/articles/${article.slug}`}>
                  <h3 className="text-lg font-semibold text-[#183354] mb-2 hover:text-[#22408a] hover:underline cursor-pointer transition-colors duration-200">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-[17px] h-4" />
                  <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                    {article.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};