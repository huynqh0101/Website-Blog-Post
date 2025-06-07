"use client";
import { Suspense, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import ArticleList from "@/components/articles/ArticleList";
import { Advertisement } from "@/components/home/advertisements/Advertisement";
import { ArticleHighlightSection } from "@/components/articles/ArticleHighlightSection";
import { CategoryFilter } from "@/components/articles/CategoryFilter";
import { TrendingTagsBar } from "@/components/articles/TrendingTagsBar";
import { ArticlesSidebar } from "@/components/articles/ArticlesSidebar";
import { FeaturedArticlesCarousel } from "@/components/articles/FeaturedArticlesCarousel";
import { NewsletterSection } from "@/components/home/newsletter/NewsletterSection";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";

export default function ArticlesPage() {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <main
      className={`py-10 mt-10 m-10 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Featured Articles Carousel */}
      <div className="w-full max-w-[1320px] px-4 md:px-6 mb-10 mx-auto">
        <Suspense
          fallback={
            <div
              className={`h-60 rounded animate-pulse ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          }
        >
          <FeaturedArticlesCarousel />
        </Suspense>
      </div>

      {/* Trending Tags */}
      <div className="w-full max-w-[1320px] px-4 md:px-6 mb-8 mx-auto">
        <Suspense
          fallback={
            <div
              className={`h-10 rounded animate-pulse ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          }
        >
          <TrendingTagsBar />
        </Suspense>
      </div>

      {/* Main Content with Sidebar */}
      <div className="w-full max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <Suspense
              fallback={
                <div
                  className={`h-12 rounded mb-6 animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              }
            >
              <CategoryFilter />
            </Suspense>

            {/* Article Highlight Section */}
            <Suspense
              fallback={
                <div
                  className={`h-96 rounded mb-10 animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              }
            >
              <ArticleHighlightSection />
            </Suspense>

            {/* Advertisement */}
            <Advertisement
              image="/advertisement14-jpg.png"
              effect="fade"
              shineEffect={true}
              borderEffect={true}
              className="w-full h-[120px] my-8"
            />

            {/* Original Article List */}
            <div className="mt-8">
              <h2
                className={`text-2xl font-bold mb-6 pb-2 border-b transition-colors ${
                  isDarkMode
                    ? "text-white border-gray-700"
                    : "text-gray-900 border-gray-200"
                }`}
              >
                Latest Articles
              </h2>
              <Suspense
                fallback={
                  <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <div
                        className={`h-8 w-32 rounded animate-pulse ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-64 rounded animate-pulse ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                }
              >
                <ArticleList />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[330px]">
            <Suspense
              fallback={
                <div
                  className={`h-[600px] rounded animate-pulse ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
              }
            >
              <ArticlesSidebar />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterSection />
      </div>
      <FloatingActionButtons />
    </main>
  );
}
