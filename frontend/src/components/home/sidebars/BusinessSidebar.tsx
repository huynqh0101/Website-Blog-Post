"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessSection } from "../sections/BusinessSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NewsletterCard } from "./NewsletterCard";

interface BusinessSidebarProps {
  businessSidebarArticles: any[];
}

export const BusinessSidebar = ({
  businessSidebarArticles,
}: BusinessSidebarProps) => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <div
      className={`md:w-[300px] border-l pl-4 ${
        isDarkMode ? "border-gray-600" : "border-[#dfdfdf]"
      }`}
    >
      <NewsletterCard />
      <BusinessSection articles={businessSidebarArticles} />
    </div>
  );
};
