/* eslint-disable @next/next/no-img-element */
import BlogList from "@/components/blogs/BlogList";
import { Suspense } from "react";
import { TrendingTagsBar } from "@/components/articles/TrendingTagsBar";
import { Advertisement } from "@/components/home/advertisements/Advertisement";
import { NewsletterSection } from "@/components/home/newsletter/NewsletterSection";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";
import Link from "next/link";

export const revalidate = 3600; // Revalidate at most once per hour

export default function BlogsPage() {
  return (
    <main className="pt-8 pb-20">
      {/* Hero Banner3333 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 py-16 mb-12">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 21a6 6 0 100-12 6 6 0 000 12z" opacity=".1" fill="%23ffffff" fill-rule="evenodd"/%3E%3C/svg%3E\')',
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Blog
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8">
              Discover insights, stories, and expert perspectives
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#featured"
                className="bg-white text-blue-700 hover:bg-blue-50 transition px-6 py-3 rounded-lg font-medium shadow-md"
              >
                Featured
              </Link>
              <Link
                href="#latest"
                className="bg-blue-700 text-white hover:bg-blue-800 transition px-6 py-3 rounded-lg font-medium shadow-md border border-blue-400"
              >
                Latest Posts
              </Link>
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,26.7C1120,21,1280,43,1360,53.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Trending Tags */}
      <div className="w-full max-w-[1320px] px-4 md:px-6 mb-8 mx-auto">
        <Suspense
          fallback={
            <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
          }
        >
          <TrendingTagsBar />
        </Suspense>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1" id="latest">
            {/* Filter Bar */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="font-medium text-gray-700">Filter by:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "All",
                  "Technology",
                  "Business",
                  "Creative",
                  "Lifestyle",
                  "News",
                ].map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      category === "All"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Blog List */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white animate-pulse"
                    >
                      <div className="h-48 bg-gray-300"></div>
                      <div className="p-4 flex flex-col gap-3">
                        <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
                        <div className="h-6 bg-gray-300 w-5/6 rounded"></div>
                        <div className="h-4 bg-gray-300 w-full rounded"></div>
                        <div className="h-4 bg-gray-300 w-4/5 rounded"></div>
                        <div className="flex gap-2 mt-2">
                          <div className="h-8 bg-gray-300 w-8 rounded-full"></div>
                          <div className="h-4 bg-gray-300 w-24 rounded self-center"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <BlogList />
            </Suspense>

            {/* Advertisement */}
            <div className="my-12">
              <Advertisement
                image="/advertisement14-jpg.png"
                effect="fade"
                shineEffect={true}
                borderEffect={true}
                className="w-full h-[120px]"
              />
            </div>

            {/* Featured Posts Section */}
            <div id="featured" className="my-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Posts</h2>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* post 1 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-purple-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm px-3 py-1.5 border border-white/30 rounded-lg backdrop-blur-sm">
                        Read Article
                      </span>
                    </div>
                    <img
                      src={`/images/team/back1.jpg`}
                      alt="Featured post"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1.5">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        Technology
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        5 days ago
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1.5">
                      The Future of Web Development in 2024
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Exploring the latest trends and technologies shaping the
                      future of web development and what developers need to
                      know.
                    </p>
                    <div className="flex items-center">
                      <img
                        src={`/images/team/back1.jpg`}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-gray-500">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* post 2 */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-purple-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm px-3 py-1.5 border border-white/30 rounded-lg backdrop-blur-sm">
                        Read Article
                      </span>
                    </div>
                    <img
                      src={`/images/team/back2.jpg`}
                      alt="Featured post"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1.5">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Design
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        3 days ago
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1.5">
                      UI/UX Design Principles for Modern Applications
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Learn how to create intuitive and engaging user
                      experiences that delight your application users.
                    </p>
                    <div className="flex items-center">
                      <img
                        src={`/images/team/digital.jpg`}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium text-sm">Jane Smith</p>
                        <p className="text-xs text-gray-500">UX Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[330px] space-y-8">
            {/* Popular Categories */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-lg">Popular Categories</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {[
                    "Technology",
                    "Business",
                    "Design",
                    "Marketing",
                    "Lifestyle",
                  ].map((category) => (
                    <li key={category}>
                      <Link
                        href="#"
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md group"
                      >
                        <span className="text-gray-700 group-hover:text-blue-600">
                          {category}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600">
                          {Math.floor(Math.random() * 50) + 10}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-blue-100 mb-4">
                Get the latest blog posts and updates directly to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-lg">Popular Posts</h3>
              </div>
              <div>
                <Link
                  href="#"
                  className="flex p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <img
                    src={`sports-post04-jpg.png`}
                    alt="Popular post"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800 line-clamp-2">
                      How to Improve Your Productivity with Simple Techniques
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">May {10}, 2024</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <img
                    src={`sports-post01-jpg.png`}
                    alt="Popular post"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800 line-clamp-2">
                      How to Improve Your Productivity with Simple Techniques
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">May {10}, 2024</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <img
                    src={`sports-post02-jpg.png`}
                    alt="Popular post"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800 line-clamp-2">
                      How to Improve Your Productivity with Simple Techniques
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">May {10}, 2024</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <img
                    src={`sports-post03-jpg.png`}
                    alt="Popular post"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800 line-clamp-2">
                      How to Improve Your Productivity with Simple Techniques
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">May {10}, 2024</p>
                  </div>
                </Link>
              </div>
            </div>
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
