"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AdvertisementProps {
  image: string;
  className?: string;
  effect?: "zoom" | "fade" | "slide" | "pulse" | "none";
  hoverEffect?: boolean;
  borderEffect?: boolean;
  shineEffect?: boolean;
}

export const Advertisement = ({
  image,
  className = "w-full h-[120px]",
  effect = "fade",
  hoverEffect = true,
  borderEffect = false,
  shineEffect = false,
}: AdvertisementProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay để tạo hiệu ứng staggered khi nhiều quảng cáo xuất hiện
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Cấu hình animation dựa trên effect được chọn
  const variants = {
    hidden: {
      opacity: effect !== "none" ? 0 : 1,
      y: effect === "slide" ? 20 : 0,
      scale: effect === "zoom" ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Hiệu ứng pulse
  const pulseAnimation =
    effect === "pulse"
      ? {
          animate: {
            scale: [1, 1.02, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" as const,
            },
          },
        }
      : {};

  // Hiệu ứng hover
  const hoverStyles = hoverEffect
    ? {
        whileHover: {
          scale: 1.02,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 },
        },
      }
    : {};

  return (
    <motion.div
      className={`${className} bg-cover bg-center cursor-pointer relative overflow-hidden ${
        borderEffect ? "border-2 border-transparent hover:border-blue-300" : ""
      }`}
      style={{ backgroundImage: `url(${image})` }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      {...pulseAnimation}
      {...hoverStyles}
    >
      {borderEffect && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-300 opacity-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
      )}

      {/* Shine Effect */}
      {shineEffect && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -inset-[100%] rotate-[30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full"
            style={{
              animation: "shine 3s infinite",
            }}
          ></div>
        </div>
      )}

      {/* Add inline keyframes */}
      <style jsx global>{`
        @keyframes shine {
          100% {
            transform: translateX(100%) rotate(30deg);
          }
        }
      `}</style>
    </motion.div>
  );
};
