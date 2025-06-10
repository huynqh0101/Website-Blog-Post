"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import newsData from "@/constants/newsData";
import { NewsletterSection } from "./NewsletterSection";
import { EditorsPicksSection } from "./sections/EditorsPicksSection";
import { Advertisement } from "./Advertisement";
import { PoliticsSection } from "./sections/PoliticsSection";
import { SportsSection } from "./sections/SportsSection";
import { TodaysHotSpotSection } from "./sections/TodaysHotSpotSection";
import { WorldTopNewsSection } from "./sections/WorldTopNewsSection";
import { BusinessSidebar } from "./sidebars/BusinessSidebar";
import { MainSidebar } from "./sidebars/MainSidebar";
import { ArticleCard } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";
import BannerSlider from "./BannerSlider";

const {
  businessArticle,
  techArticle,
  featuredArticle,
  politicsArticles,
  todayHotSpotArticles,
  topStoriesArticles,
  topRankedArticles,
  editorsPicksArticles,
  worldTopNewsArticles,
  sportsArticles,
  businessSidebarArticles,
} = newsData;

export const MainByAnima = () => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`w-full mt-[80px] flex flex-col items-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="w-full max-w-[1320px] px-4 md:px-6 mb-8">
        <BannerSlider
          className="rounded-xl shadow-md"
          height="16rem"
          width="100%"
        />
      </div>
      <div
        className={`container max-w-[1320px] flex flex-col md:flex-row gap-8 px-4 md:px-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {/* Main Content */}
        <div className="flex-1 max-w-[990px]">
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div
              className={`md:hidden absolute h-full w-px left-1/3 top-0 ${
                isDarkMode ? "bg-gray-700" : "bg-[#dfdfdf]"
              }`}
            />

            {/* Left Column */}
            <div className="flex flex-col gap-6 md:w-[289px]">
              {/* Business Article */}
              <ArticleCard
                slug={businessArticle.slug}
                category={businessArticle.category}
                title={businessArticle.title}
                author={businessArticle.author}
                date={businessArticle.date}
                image={businessArticle.image}
                className={`border-b pb-4 ${
                  isDarkMode ? "border-gray-700" : "border-[#d8d8d8]"
                }`}
              />
              {/* Tech Article */}
              <ArticleCard
                slug={businessArticle.slug}
                category={techArticle.category}
                title={techArticle.title}
                author={techArticle.author}
                date={techArticle.date}
                image={techArticle.image}
              />
            </div>

            {/* Featured Article */}
            <div className="md:w-[631px]">
              <FeaturedArticle article={featuredArticle} />
            </div>
          </div>

          {/* Advertisement */}
          <Advertisement
            image="/advertisement13-jpg.png"
            effect="fade"
            shineEffect={true}
            borderEffect={true}
            className="w-full max-w-[956px] h-[120px] my-8 mx-auto"
          />

          {/* Politics Section */}
          <PoliticsSection articles={politicsArticles} />

          {/* Today's Hot Spot Section */}
          <TodaysHotSpotSection articles={todayHotSpotArticles} />
        </div>

        {/* Sidebar */}
        <MainSidebar
          topStoriesArticles={topStoriesArticles}
          topRankedArticles={topRankedArticles}
        />
      </div>

      {/* Advertisement */}
      <Advertisement
        image="/advertisement14-jpg.png"
        effect="fade"
        shineEffect={true}
        borderEffect={true}
        className="w-full max-w-[956px] h-[120px] my-8 mx-auto"
      />

      {/* Editors' Picks Section */}
      <EditorsPicksSection articles={editorsPicksArticles} />

      {/* World Top News Section */}
      <div
        className={`container max-w-[1320px] px-4 md:px-6 my-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 max-w-[990px]">
            <WorldTopNewsSection worldTopNewsArticles={worldTopNewsArticles} />
            {/* Advertisement */}
            <Advertisement
              image="/advertisement15-jpg.png"
              effect="fade"
              shineEffect={true}
              borderEffect={true}
              className="w-full max-w-[956px] h-[120px] my-8 mx-auto"
            />
            {/* Sports Section */}
            <SportsSection sportsData={sportsArticles} />
            <Advertisement
              image="/advertisement13-jpg.png"
              effect="fade"
              shineEffect={true}
              borderEffect={true}
              className="w-full max-w-[956px] h-[120px] my-8 mx-auto object-contain"
            />
          </div>

          {/* Right Sidebar */}
          <BusinessSidebar businessSidebarArticles={businessSidebarArticles} />
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};
