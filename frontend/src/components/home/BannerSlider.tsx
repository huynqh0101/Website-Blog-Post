"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Image from "next/image";

interface BannerSliderProps {
  banners?: string[];
  interval?: number;
  title?: string | null;
  copyright?: string | null;
  height?: string;
  width?: string;
  className?: string;
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
  height = "16rem",
  width = "100%",
  className = "",
}: BannerSliderProps) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  useEffect(() => {
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
          <div
            className={`absolute inset-0 ${
              isDarkMode ? "bg-black bg-opacity-30" : "bg-black bg-opacity-10"
            }`}
          ></div>
        </div>
      ))}

      {/* Copyright text và title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {title && (
          <h2
            className={`font-bold text-3xl mt-3 tracking-wide drop-shadow-lg transition-colors duration-300 ${
              isDarkMode ? "text-blue-100" : "text-white"
            }`}
          >
            {title}
          </h2>
        )}
        {copyright && (
          <div className="mt-4 flex items-center">
            <span
              className={`h-[1px] w-6 mr-3 ${
                isDarkMode ? "bg-blue-200/70" : "bg-white/60"
              }`}
            ></span>
            <p
              className={`text-xs font-light transition-colors duration-300 ${
                isDarkMode ? "text-blue-200/90" : "text-white/80"
              }`}
            >
              {copyright}
            </p>
            <span
              className={`h-[1px] w-6 ml-3 ${
                isDarkMode ? "bg-blue-200/70" : "bg-white/60"
              }`}
            ></span>
          </div>
        )}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
              index === currentBanner
                ? isDarkMode
                  ? "bg-blue-400"
                  : "bg-white"
                : isDarkMode
                ? "bg-blue-400/50"
                : "bg-white/50"
            } hover:scale-110`}
            onClick={() => setCurrentBanner(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
