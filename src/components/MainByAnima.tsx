import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
  UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// Data for articles
const businessArticle = {
  category: "BUSINESS",
  title: "A Pragmatist's Guide To Theire lean User Research",
  author: "ADMIN",
  date: "27 AUGUST, 2025",
  image: "/nw-banner-post01-jpg.png",
};

const techArticle = {
  category: "TECH",
  title: "Five Data-loading Patterns To boost Web Performance",
  author: "ADMIN",
  date: "27 AUGUST, 2025",
  image: "/nw-banner-post02-jpg.png",
};

const featuredArticle = {
  category: "POLITICS",
  title: "Beyond Algorithms Skills Of Designers That Ai can't Replicate",
  author: "ADMIN",
  date: "27 AUGUST, 2025",
  readTime: "20 MINS",
  description:
    "Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edgend Software centers And Melty Little Puddles Of Chocolate First Favorite.",
  image: "/nw-banner-post03-jpg.png",
  hasPlayButton: false, // Added property
};

const politicsArticles = [
  {
    category: "POLITICS",
    title: "Warns Financial Institutions to Be On Watch For Russian",
    author: "ADMIN",
    date: "27 AUGUST, 2025",
    description:
      "Browned Butter Browa Melly Ness crispy Edgend Software Centers puddles Of Chocolate.",
    image: "/politics-post01-jpg.png",
  },
  {
    title: "Ux Checklists For Interface designers",
    date: "27 AUGUST, 2025",
  },
  {
    title: "The Realities And Myths Of contrast And Color",
    date: "27 AUGUST, 2025",
  },
  {
    title: "Designing Better Error messages UX",
    date: "27 AUGUST, 2025",
  },
];

const todayHotSpotArticles = [
  {
    category: "SPORTS",
    title: "Designing Better Error Messages UX",
    author: "ADMIN",
    date: "27 AUGUST, 2025",
    image: "/today-post01-jpg.png",
  },
  {
    category: "TECH",
    title: "Implementing A Reset Password feature With Dynamic Routes",
    author: "ADMIN",
    date: "27 AUGUST, 2025",
    image: "/today-post02-jpg.png",
    hasPlayButton: true,
  },
  {
    category: "POLITICS",
    title: "An Introduction To Context propagation In Javascript",
    author: "ADMIN",
    date: "27 AUGUST, 2025",
    image: "/nw-banner-post01-jpg-1.png",
  },
];

const topStoriesArticles = [
  {
    category: "POLITICS",
    title: "Lessons Learned As A designer-founder",
    date: "27 AUGUST, 2025",
    image: "/stories-post01-jpg.png",
  },
  {
    category: "MODERN",
    title: "A Complete Guide To live Validation Ux",
    date: "27 AUGUST, 2025",
    image: "/stories-post02-jpg.png",
  },
  {
    category: "SPORTS",
    title: "Building A Retro draggable Web",
    date: "27 AUGUST, 2025",
    image: "/stories-post03-jpg.png",
  },
  {
    category: "FASHION",
    title: "Rethinking Star ratings For Readers",
    date: "27 AUGUST, 2025",
    image: "/stories-post04-jpg.png",
  },
];

const topRankedArticles = [
  {
    number: "1.",
    title: "Awersing Instagram Tawo promote Your",
    date: "27 AUGUST, 2025",
  },
  {
    number: "2.",
    title: "Rethinking Star Ratings for Readers",
    date: "27 AUGUST, 2025",
  },
  {
    number: "3.",
    title: "Headless In Times Of accessibility",
    date: "27 AUGUST, 2025",
  },
  {
    number: "4.",
    title: "Making S Wai-aria A comprehensive Guide",
    date: "27 AUGUST, 2025",
  },
  {
    number: "5.",
    title: "Ux Checklists For interface Designers",
    date: "27 AUGUST, 2025",
  },
];

const editorsPicksArticles = [
  {
    category: "SPORTS",
    title: "Everything Developers Must know About Figma",
    date: "27 AUGUST, 2025",
    readTime: "20 MINS",
    image: "/nw-editor-post01-jpg.png",
    hasPlayButton: true,
  },
  {
    category: "TECH",
    title: "Phone Numbers For Web designers",
    date: "27 AUGUST, 2025",
    readTime: "20 MINS",
    image: "/nw-editor-post02-jpg.png",
  },
  {
    category: "FOOD",
    title: "How To Create Dynamic Donut tailwind React",
    date: "27 AUGUST, 2025",
    readTime: "20 MINS",
    image: "/nw-editor-post03-jpg.png",
    hasPlayButton: true,
  },
  {
    category: "NEWS",
    title: "An Introduction To Context propagation In Javascript",
    date: "27 AUGUST, 2025",
    readTime: "20 MINS",
    image: "/nw-editor-post04-jpg.png",
  },
];

const worldTopNewsArticles = {
  featured: {
    category: "SPORTS",
    title: "How To Protect Your App With Threat model Based On Jsondiff",
    date: "27 AUGUST, 2025",
    readTime: "20 MINS",
    description:
      "Browned Butter And Brown Sugar Caramelly Oodness Crispy edgesthick And Soft Centers And Melty Little Puddles Of chocolate Y First Favorite.browned Butter Brown Sugar caramelly Oodness.",
    image: "/top-news-post01-jpg.png",
    hasPlayButton: true,
  },
  smallArticles: [
    {
      category: "POLITICS",
      title: "Using Instagram Tawo promote Your",
      date: "27 AUGUST, 2025",
      image: "/top-news-post02-jpg.png",
    },
    {
      category: "TECH",
      title: "Everything Developers must Know About",
      date: "27 AUGUST, 2025",
      image: "/top-news-post03-jpg.png",
    },
    {
      category: "MODERN",
      title: "Implementing Okta authentication In",
      date: "27 AUGUST, 2025",
      image: "/top-news-post04-jpg.png",
    },
  ],
};

const sportsArticles = {
  featured: {
    category: "SWIMMING",
    title:
      "How To Protect Your App With Threat Model Based On w To Protect Your App With Based",
    date: "27 AUGUST, 2025",
    image: "/sports-post01-jpg.png",
  },
  smallArticles: [
    {
      category: "BASKET BALL",
      title: "Using Instagram Tawo promote Your",
      date: "27 AUGUST, 2025",
      image: "/sports-post02-jpg.png",
    },
    {
      category: "BOXING",
      title: "Implementing Okta authentication",
      date: "27 AUGUST, 2025",
      image: "/sports-post03-jpg.png",
    },
    {
      category: "FOOTBALL",
      title: "Core Web Vitals Tools to Boost Your",
      date: "27 AUGUST, 2025",
      image: "/sports-post04-jpg.png",
    },
    {
      category: "POLITICS",
      title: "Migration From Jquery to Next.js: A Guide",
      date: "27 AUGUST, 2025",
      image: "/sports-post05-jpg.png",
    },
  ],
};

const businessSidebarArticles = [
  {
    category: "AUDIT",
    title: "Take A Look Back At The Moseret gala Red Carpet Ever",
    date: "27 AUGUST, 2025",
    image: "/nw-banner-post01-jpg-2.png",
  },
  {
    category: "MARKETING",
    title: "Take A Look Back At The Moseret gala Red Carpet Ever",
    date: "27 AUGUST, 2025",
  },
  {
    category: "MARKETING",
    title: "Take A Look Back At The Moseret gala Red Carpet Ever",
    date: "27 AUGUST, 2025",
  },
];

export const MainByAnima = (): JSX.Element => {
  return (
    <div className="w-full mt-[80px] flex flex-col items-center">
      <div className="container max-w-[1320px] flex flex-col md:flex-row gap-8 px-4 md:px-6">
        {/* Main Content */}
        <div className="flex-1 max-w-[990px]">
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="md:hidden absolute h-full w-px bg-[#dfdfdf] left-1/3 top-0" />

            {/* Left Column */}
            <div className="flex flex-col gap-6 md:w-[289px]">
              {/* Business Article */}
              <Card className="border-0 border-b border-[#d8d8d8] rounded-none pb-4">
                <CardContent className="p-0">
                  <div
                    className="w-full h-[180px] bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(${businessArticle.image})` }}
                  />
                  <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                    {businessArticle.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#183354] mb-3">
                    {businessArticle.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        BY
                      </span>
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {businessArticle.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {businessArticle.date}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Article */}
              <Card className="border-0 rounded-none">
                <CardContent className="p-0">
                  <div
                    className="w-full h-[180px] bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(${techArticle.image})` }}
                  />
                  <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                    {techArticle.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#183354] mb-3">
                    {techArticle.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        BY
                      </span>
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {techArticle.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {techArticle.date}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Article */}
            <div className="md:w-[631px]">
              <Card className="border-0 rounded-none">
                <CardContent className="p-0">
                  <div
                    className="relative w-full h-[428px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredArticle.image})` }}
                  >
                    {featuredArticle.hasPlayButton && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                        <PlayIcon className="w-4 h-[18px] text-[#f4796c]" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center mt-6">
                    <Badge className="rounded-[3px] text-[#6d757f] bg-transparent border-[#b8c1cd] mb-4">
                      {featuredArticle.category}
                    </Badge>
                    <h2 className="text-[28px] font-extrabold text-[#183354] text-center leading-tight mb-4">
                      {featuredArticle.title}
                    </h2>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                          BY
                        </span>
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                          {featuredArticle.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                          {featuredArticle.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                          {featuredArticle.readTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#545e69] text-base text-center leading-7">
                      {featuredArticle.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advertisement */}
          <div
            className="w-full h-[120px] bg-cover bg-center my-8"
            style={{ backgroundImage: "url(/advertisement13-jpg.png)" }}
          />

          {/* Politics Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-[22px] font-bold text-[#183354]">Politics</h2>
              <div className="flex-1 ml-4 border-t border-b border-[#dfdfdf] h-[5px] relative">
                <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
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
                  <div
                    className="w-full md:w-[330px] h-[295px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${politicsArticles[0].image})`,
                    }}
                  />
                  <div className="flex flex-col">
                    <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                      {politicsArticles[0].category}
                    </div>
                    <h3 className="text-xl font-extrabold text-[#183354] mb-4">
                      {politicsArticles[0].title}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          BY
                        </span>
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          {politicsArticles[0].author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          {politicsArticles[0].date}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#545e69] text-base leading-7 mb-4">
                      {politicsArticles[0].description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-[138px] h-9 rounded border border-[#cfcfcf] flex items-center gap-2"
                    >
                      <span className="text-sm font-medium text-[#183354]">
                        READ MORE
                      </span>
                      <ChevronRightIcon className="w-2.5 h-2.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:w-[267px] border-l border-[#dfdfdf] pl-6">
                <div className="flex flex-col gap-4">
                  {politicsArticles.slice(1).map((article, index) => (
                    <div
                      key={index}
                      className={`pb-4 ${
                        index < politicsArticles.slice(1).length - 1
                          ? "border-b border-[#dfdfdf]"
                          : ""
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-[#183354] mb-2">
                        {article.title}
                      </h3>
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

          {/* Today's Hot Spot Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-[22px] font-bold text-[#183354]">
                Today's Hot Spot
              </h2>
              <div className="flex-1 ml-4 border-t border-b border-[#dfdfdf] h-[5px] relative">
                <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
                <img
                  className="absolute top-0 left-9 w-2.5 h-1.5"
                  alt="Mask group"
                  src="/mask-group-9.svg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {todayHotSpotArticles.map((article, index) => (
                <Card key={index} className="border-0 rounded-none">
                  <CardContent className="p-0">
                    <div
                      className="relative w-full h-[200px] bg-cover bg-center mb-3"
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
                    <h3 className="text-lg font-bold text-[#183354] mb-3">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          BY
                        </span>
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          {article.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-[17px] h-4" />
                        <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                          {article.date}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-[300px] border-l border-[#dfdfdf] pl-4">
          <div className="mb-8">
            <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-4">
              <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
              <img
                className="absolute top-0 left-9 w-2.5 h-1.5"
                alt="Mask group"
                src="/mask-group-1.svg"
              />
            </div>
            <h2 className="text-[22px] font-bold text-[#183354] mb-6">
              Top Stories
            </h2>

            {topStoriesArticles.map((article, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 pb-6 ${
                  index < topStoriesArticles.length - 1
                    ? "border-b border-[#dfdfdf] mb-6"
                    : ""
                }`}
              >
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
                <div
                  className="w-[90px] h-[90px] rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              </div>
            ))}
          </div>

          <div
            className="w-full h-[236px] bg-cover bg-center mb-8"
            style={{ backgroundImage: "url(/sidebar-img05-jpg.png)" }}
          />

          <div className="mb-8">
            <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-4">
              <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
              <img
                className="absolute top-0 left-9 w-2.5 h-1.5"
                alt="Mask group"
                src="/mask-group-2.svg"
              />
            </div>
            <h2 className="text-[22px] font-bold text-[#183354] mb-6">
              Top Stories
            </h2>

            {topRankedArticles.map((article, index) => (
              <div key={index} className="bg-[#f9f9f7] p-4 mb-3">
                <div className="flex gap-4">
                  <span className="text-[26px] font-semibold text-[#c2c2c2]">
                    {article.number}
                  </span>
                  <div>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advertisement */}
      <div
        className="w-full max-w-[956px] h-[120px] bg-cover bg-center my-8 mx-auto"
        style={{ backgroundImage: "url(/advertisement14-jpg.png)" }}
      />

      {/* Editors' Picks Section */}
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
            {editorsPicksArticles.map((article, index) => (
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

      {/* World Top News Section */}
      <div className="container max-w-[1320px] px-4 md:px-6 my-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 max-w-[990px]">
            <div className="mb-8">
              <h2 className="text-[22px] font-bold text-[#183354] mb-4">
                World Top News
              </h2>
              <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-8">
                <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
                <img
                  className="absolute top-0 left-9 w-2.5 h-1.5"
                  alt="Mask group"
                  src="/mask-group-11.svg"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div
                  className="relative md:w-[460px] h-80 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${worldTopNewsArticles.featured.image})`,
                  }}
                >
                  {worldTopNewsArticles.featured.hasPlayButton && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                      <PlayIcon className="w-4 h-[18px] text-[#f4796c]" />
                    </div>
                  )}
                </div>
                <div className="md:w-[460px]">
                  <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                    {worldTopNewsArticles.featured.category}
                  </div>
                  <h2 className="text-2xl font-bold text-[#183354] mb-4">
                    {worldTopNewsArticles.featured.title}
                  </h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {worldTopNewsArticles.featured.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {worldTopNewsArticles.featured.readTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#545e69] text-base leading-7 mb-4">
                    {worldTopNewsArticles.featured.description}
                  </p>
                  <Button
                    variant="outline"
                    className="rounded border border-[#cfcfcf] flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-[#183354]">
                      READ MORE
                    </span>
                    <ChevronRightIcon className="w-2.5 h-2.5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {worldTopNewsArticles.smallArticles.map((article, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1">
                      <div className="text-[13px] text-[#6d757f] font-normal mb-2">
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
                    <div
                      className="w-[100px] h-[100px] bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                  </div>
                ))}
              </div>

              {/* Advertisement */}
              <div
                className="w-full h-[120px] bg-cover bg-center mb-12"
                style={{ backgroundImage: "url(/advertisement15-jpg.png)" }}
              />

              {/* Sports Section */}
              <div>
                <h2 className="text-[22px] font-bold text-[#183354] mb-4">
                  Sports
                </h2>
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
                        backgroundImage: `url(${sportsArticles.featured.image})`,
                      }}
                    />
                    <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                      {sportsArticles.featured.category}
                    </div>
                    <h2 className="text-2xl font-bold text-[#183354] mb-4">
                      {sportsArticles.featured.title}
                    </h2>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-[17px] h-4" />
                      <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                        {sportsArticles.featured.date}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-[300px]">
                    <div className="flex flex-col gap-6">
                      {sportsArticles.smallArticles.map((article, index) => (
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
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:w-[300px] border-l border-[#dfdfdf] pl-4">
            <Card className="bg-[#183354] mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-[75px] h-[75px] mb-2">
                    <img
                      src="/icon-43.svg"
                      alt="Newsletter Icon"
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-white text-center mb-1">
                    Daily Newsletter
                  </h3>
                  <p className="text-white text-base font-medium text-center">
                    Get All The Top Stories From
                    <br />
                    blogs To Keep Track.
                  </p>
                </div>
                <div className="flex flex-col gap-4 mb-4">
                  <Input
                    className="bg-white h-[50px] rounded-[5px] text-center text-[#6d757f]"
                    placeholder="Enter your e-mail"
                  />
                  <Button className="bg-[#f4796c] hover:bg-[#f4796c]/90 h-[50px] text-white font-bold">
                    SUBSCRIBE NOW
                  </Button>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    className="bg-[#183354] border-[#436793] rounded-[3px] mt-1"
                  />
                  <label htmlFor="terms" className="text-[13px] text-[#7488a1]">
                    I agree to the terms & conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <div className="border-t border-b border-[#dfdfdf] h-[5px] relative mb-4">
                <div className="absolute top-0 left-0 w-10 h-[5px] bg-[#f4796c]"></div>
                <img
                  className="absolute top-0 left-9 w-2.5 h-1.5"
                  alt="Mask group"
                  src="/mask-group-3.svg"
                />
              </div>
              <h2 className="text-[22px] font-bold text-[#183354] mb-6">
                Business
              </h2>

              <div className="mb-6">
                <div
                  className="w-full h-[220px] bg-cover bg-center mb-4"
                  style={{
                    backgroundImage: `url(${businessSidebarArticles[0].image})`,
                  }}
                />
                <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                  {businessSidebarArticles[0].category}
                </div>
                <h3 className="text-lg font-bold text-[#183354] mb-2">
                  {businessSidebarArticles[0].title}
                </h3>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-[17px] h-4" />
                  <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                    {businessSidebarArticles[0].date}
                  </span>
                </div>
              </div>

              {businessSidebarArticles.slice(1).map((article, index) => (
                <div
                  key={index}
                  className="pb-6 mb-6 border-b border-[#dfdfdf]"
                >
                  <div className="text-[13px] text-[#6d757f] font-normal mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#183354] mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-[17px] h-4" />
                    <span className="text-[13px] text-[#6d757f] tracking-[0.52px]">
                      {article.date}
                    </span>
                  </div>
                </div>
              ))}

              <div
                className="w-full h-[238px] bg-cover bg-center rounded-[5px]"
                style={{ backgroundImage: "url(/sidebar-img06-jpg.png)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full bg-[#e8f1f1] py-16">
        <div className="container max-w-[1320px] px-4 md:px-6">
          <h2 className="text-[28px] font-bold text-[#183354] text-center mb-8">
            Get Subscribe To Our Latest News & Update
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Input
              className="md:w-[350px] h-[50px] bg-white rounded-md"
              placeholder="Name"
            />
            <Input
              className="md:w-[350px] h-[50px] bg-white rounded-md"
              placeholder="E-mail"
            />
            <Button className="md:w-[172px] h-[50px] bg-[#f4796c] hover:bg-[#f4796c]/90 text-white font-bold">
              Submit Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
