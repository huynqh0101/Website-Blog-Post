import Banner from "@/components/Banner";
import NewsCard from "@/components/NewsCard";
import NewsLetter from "@/components/NewsLetter";
import { NewsItem } from "@/types/news";

export default function Home() {
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Banner />
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-8">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-between">
            {/* Your homepage content */}
          </div>
        </div>
        <NewsLetter />
      </div>
    </main>
  );
}
