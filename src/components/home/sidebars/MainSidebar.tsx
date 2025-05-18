import { Advertisement } from "../advertisements/Advertisement";
import { TopRankedSection } from "../sections/TopRankedSection";
import { TopStoriesSection } from "../sections/TopStoriesSection";

interface MainSidebarProps {
  topStoriesArticles: Array<{
    category: string;
    title: string;
    date: string;
    image: string;
  }>;
  topRankedArticles: Array<{
    number: string;
    title: string;
    date: string;
  }>;
}

export const MainSidebar = ({
  topStoriesArticles,
  topRankedArticles,
}: MainSidebarProps) => {
  return (
    <div className="md:w-[300px] border-l border-[#dfdfdf] pl-4">
      <TopStoriesSection articles={topStoriesArticles} />

      <Advertisement
        image="/sidebar-img05-jpg.png"
        className="w-full h-[236px] bg-cover bg-center mb-8"
      />

      <TopRankedSection articles={topRankedArticles} />
    </div>
  );
};
