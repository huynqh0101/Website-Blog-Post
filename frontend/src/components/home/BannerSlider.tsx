"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface BannerSliderProps {
  banners?: string[];
  interval?: number;
  title?: string | null;
  copyright?: string | null;
  height?: string; // Chiều cao tùy chỉnh
  width?: string; // Chiều rộng tùy chỉnh
  className?: string; // Thêm class tùy chỉnh
}

const BannerSlider = ({
  banners = [
    "/banner/banner1.jpg",
    "/banner/banner2.jpg",
    "/banner/banner3.jpg",
    "/banner/banner4.jpg",
  ],
  interval = 3000,
  title = "STAY INFORMED",
  copyright = `© ${new Date().getFullYear()} DAILY INSIGHT`,
  height = "16rem", // 256px (h-64) mặc định
  width = "100%", // w-full mặc định
  className = "", // class tùy chỉnh
}: BannerSliderProps) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    // Tự động chuyển banner mỗi x giây
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [banners.length, interval]);

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height, width }}
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={banner}
            alt={`Banner ${index + 1}`}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
      ))}

      {/* Copyright text và title chỉ hiển thị khi được cung cấp */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {title && (
          <h2 className="text-white font-bold text-3xl mt-3 tracking-wide drop-shadow-lg">
            {title}
          </h2>
        )}
        {copyright && (
          <div className="mt-4 flex items-center">
            <span className="h-[1px] w-6 bg-white/60 mr-3"></span>
            <p className="text-white/80 text-xs font-light">{copyright}</p>
            <span className="h-[1px] w-6 bg-white/60 ml-3"></span>
          </div>
        )}
      </div>

      {/* Chỉ số banner (dots) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentBanner ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentBanner(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
