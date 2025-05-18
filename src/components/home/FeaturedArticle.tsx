"use client";
import { useState, useEffect } from "react";
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
import Image from "next/image"; // Thêm import này

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
    <Card className="border-0 rounded-none">
      <CardContent className="p-0">
        <div className="relative w-full h-[428px]">
          {/* Sử dụng ảnh đơn với object-fit thay vì carousel khi chỉ có 1 ảnh */}
          {!hasMultipleImages ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${currentImage})` }}
            >
              {article.hasPlayButton && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 cursor-pointer">
                  <PlayIcon className="w-4 h-[18px] text-[#22408a] group-hover:scale-110 transition-transform duration-300" />
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 cursor-pointer">
                  <PlayIcon className="w-4 h-[18px] text-[#22408a] group-hover:scale-110 transition-transform duration-300" />
                </div>
              )}

              {/* Navigation buttons */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white z-10"
                onClick={goToPrevImage}
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6 text-[#183354]" />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white z-10"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6 text-[#183354]" />
              </button>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {article.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
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
          <h2 className="text-[28px] font-extrabold text-[#183354] text-center leading-tight mb-5 hover:text-[#22408a] hover:underline transition-colors cursor-pointer">
            {article.title}
          </h2>
          <Badge className="rounded-sm text-[#22408a] bg-[#f0f3f8] border-none mb-4 px-4 py-1.5 font-medium uppercase text-xs tracking-wider hover:bg-[#e0e5f0] cursor-pointer transition-colors hover:text-[#183354]">
            {article.category}
          </Badge>
          <div className="flex flex-wrap items-center justify-center gap-10 mb-6">
            <div className="flex items-center gap-2 group">
              <UserIcon className="w-[17px] h-4 text-[#6d757f] group-hover:text-[#22408a] transition-colors" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center font-medium">
                BY
              </span>
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center hover:text-[#22408a] hover:underline transition-colors cursor-pointer">
                {article.author}
              </span>
            </div>

            <div className="flex items-center gap-2 group">
              <CalendarIcon className="w-[17px] h-4 text-[#6d757f] group-hover:text-[#22408a] transition-colors" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                {article.date}
              </span>
            </div>

            <div className="flex items-center gap-2 group">
              <ClockIcon className="w-[17px] h-4 text-[#6d757f] group-hover:text-[#22408a] transition-colors" />
              <span className="text-[13px] text-[#6d757f] tracking-[0.52px] text-center">
                {article.readTime}
              </span>
            </div>
          </div>

          <p className="text-[#545e69] text-base text-center leading-7 max-w-3xl mx-auto mb-2 hover:text-[#383f48] transition-colors">
            {article.description}
          </p>

          <div className="w-16 h-1 bg-[#22408a] mt-6 mb-4 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  );
};
