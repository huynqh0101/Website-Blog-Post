"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  PlayIcon,
  UserIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface FeaturedArticleProps {
  article: {
    category: string;
    title: string;
    author: string;
    date: string;
    readTime: string;
    description: string;
    images: string[];
    hasPlayButton?: boolean;
  };
}

export const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    // Chỉ auto-rotate khi có nhiều hơn một ảnh
    if (article.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % article.images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [article.images.length]);

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % article.images.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? article.images.length - 1 : prevIndex - 1
    );
  };

  // Kiểm tra số lượng ảnh hợp lệ
  const hasMultipleImages = article.images && article.images.length > 1;

  // Tránh lỗi nếu không có ảnh nào
  const currentImage =
    article.images && article.images.length > 0
      ? article.images[currentImageIndex]
      : "";

  return (
    <Card
      className={`border-0 rounded-none ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <CardContent className="p-0">
        <div className="relative w-full h-[428px]">
          {/* Sử dụng ảnh đơn với object-fit thay vì carousel khi chỉ có 1 ảnh */}
          {!hasMultipleImages ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${currentImage})` }}
            >
              {article.hasPlayButton && (
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <PlayIcon
                    className={`w-4 h-[18px] group-hover:scale-110 transition-transform duration-300 ${
                      isDarkMode ? "text-blue-400" : "text-[#22408a]"
                    }`}
                  />
                </div>
              )}
            </div>
          ) : (
            // Sử dụng carousel chỉ khi có nhiều ảnh
            <>
              {/* Sử dụng Next/Image để tối ưu hiển thị ảnh */}
              <Image
                src={currentImage}
                alt={`Featured image for ${article.title}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />

              {article.hasPlayButton && (
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <PlayIcon
                    className={`w-4 h-[18px] group-hover:scale-110 transition-transform duration-300 ${
                      isDarkMode ? "text-blue-400" : "text-[#22408a]"
                    }`}
                  />
                </div>
              )}

              {/* Navigation buttons */}
              <button
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800/80 hover:bg-gray-700"
                    : "bg-white/80 hover:bg-white"
                }`}
                onClick={goToPrevImage}
                aria-label="Previous image"
              >
                <ChevronLeftIcon
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-blue-400" : "text-[#183354]"
                  }`}
                />
              </button>
              <button
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800/80 hover:bg-gray-700"
                    : "bg-white/80 hover:bg-white"
                }`}
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <ChevronRightIcon
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-blue-400" : "text-[#183354]"
                  }`}
                />
              </button>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {article.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? isDarkMode
                          ? "bg-blue-400"
                          : "bg-white"
                        : isDarkMode
                        ? "bg-blue-400/50"
                        : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center mt-8 px-4 md:px-8">
          <h2
            className={`text-[28px] font-extrabold text-center leading-tight mb-5 hover:underline transition-colors cursor-pointer ${
              isDarkMode
                ? "text-white hover:text-blue-400"
                : "text-[#183354] hover:text-[#22408a]"
            }`}
          >
            {article.title}
          </h2>
          <Badge
            className={`rounded-sm border-none mb-4 px-4 py-1.5 font-medium uppercase text-xs tracking-wider cursor-pointer transition-colors ${
              isDarkMode
                ? "text-blue-400 bg-gray-700 hover:bg-gray-600 hover:text-blue-300"
                : "text-[#22408a] bg-[#f0f3f8] hover:bg-[#e0e5f0] hover:text-[#183354]"
            }`}
          >
            {article.category}
          </Badge>
          <div className="flex flex-wrap items-center justify-center gap-10 mb-6">
            <div className="flex items-center gap-2 group">
              <UserIcon
                className={`w-[17px] h-4 group-hover:text-blue-400 transition-colors ${
                  isDarkMode
                    ? "text-gray-400"
                    : "text-[#6d757f] group-hover:text-[#22408a]"
                }`}
              />
              <span
                className={`text-[13px] tracking-[0.52px] text-center font-medium ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              >
                BY
              </span>
              <span
                className={`text-[13px] tracking-[0.52px] text-center hover:underline transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-[#6d757f] hover:text-[#22408a]"
                }`}
              >
                {article.author}
              </span>
            </div>

            <div className="flex items-center gap-2 group">
              <CalendarIcon
                className={`w-[17px] h-4 transition-colors ${
                  isDarkMode
                    ? "text-gray-400 group-hover:text-blue-400"
                    : "text-[#6d757f] group-hover:text-[#22408a]"
                }`}
              />
              <span
                className={`text-[13px] tracking-[0.52px] text-center ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              >
                {article.date}
              </span>
            </div>

            <div className="flex items-center gap-2 group">
              <ClockIcon
                className={`w-[17px] h-4 transition-colors ${
                  isDarkMode
                    ? "text-gray-400 group-hover:text-blue-400"
                    : "text-[#6d757f] group-hover:text-[#22408a]"
                }`}
              />
              <span
                className={`text-[13px] tracking-[0.52px] text-center ${
                  isDarkMode ? "text-gray-400" : "text-[#6d757f]"
                }`}
              >
                {article.readTime}
              </span>
            </div>
          </div>

          <p
            className={`text-base text-center leading-7 max-w-3xl mx-auto mb-2 transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:text-gray-200"
                : "text-[#545e69] hover:text-[#383f48]"
            }`}
          >
            {article.description}
          </p>

          <div
            className={`w-16 h-1 mt-6 mb-4 rounded-full ${
              isDarkMode ? "bg-blue-400" : "bg-[#22408a]"
            }`}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};
