"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { MainByAnima } from "@/components/layout/Home";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";

export default function Home() {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`flex flex-row justify-center w-full ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`overflow-x-hidden w-full max-w-[1920px] relative ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <MainByAnima />
      </div>

      <FloatingActionButtons />
    </div>
  );
}
