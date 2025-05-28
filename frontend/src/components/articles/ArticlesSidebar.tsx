"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import newsData from "@/constants/newsData";
import BannerSlider from "../home/BannerSlider";

export const ArticlesSidebar = () => {
  // Sử dụng topStoriesArticles thay vì topRankedArticles cho phần Popular
  // vì topStoriesArticles có trường image
  const { topRankedArticles, topStoriesArticles, articlesNews } = newsData;

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-slate-700"
          />
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Popular</h3>
        <div className="space-y-4">
          {/* Sử dụng topStoriesArticles vì chúng có trường image */}
          {articlesNews.slice(0, 4).map((article) => (
            <div key={article.id} className="flex gap-4 group">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar size={12} className="mr-1" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Ranked (Text Only) */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Top Ranked</h3>
        <div className="space-y-3">
          {topRankedArticles.slice(0, 5).map((article) => (
            <div key={article.id} className="flex gap-3 group">
              <div className="flex-shrink-0 w-6">
                <span className="font-bold text-lg text-gray-400">
                  {article.number}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </h4>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar size={12} className="mr-1" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories - Không thay đổi */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Categories content stays the same */}
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <div className="space-y-2">
          {[
            { name: "Politics", count: 24 },
            { name: "Business", count: 18 },
            { name: "Technology", count: 15 },
            { name: "Entertainment", count: 12 },
            { name: "Sports", count: 20 },
            { name: "Health", count: 8 },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/articles?category=${category.name.toLowerCase()}`}
              className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-slate-700 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-sm">{category.name}</span>
              <span className="text-xs bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Advertisement - Không thay đổi */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Advertisement</h3>
        <div className="relative overflow-hidden rounded">
          <BannerSlider
            banners={[
              "/images/advertisement/advm.jpg",
              "/images/advertisement/advm2.jpg",
              "/images/advertisement/advm3.jpg",
              "/images/advertisement/advm4.png",
            ]}
            interval={5000}
            height="240px"
            width="100%"
            title={null}
            copyright={null}
            className="rounded"
          />
        </div>
      </div>

      {/* Newsletter Mini - Không thay đổi */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Subscribe to our newsletter to get the latest updates.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-slate-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
