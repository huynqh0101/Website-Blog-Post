"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const NewsletterCard = () => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <Card
      className={`mb-8 ${
        isDarkMode ? "bg-gray-800 border-gray-600" : "bg-[#183354]"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-[75px] h-[75px] mb-2">
            <img
              src="/icon-43.svg"
              alt="Newsletter Icon"
              className="w-full h-full"
            />
          </div>
          <h3
            className={`text-xl font-extrabold text-center mb-1 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Daily Newsletter
          </h3>
          <p
            className={`text-base font-medium text-center ${
              isDarkMode ? "text-gray-300" : "text-white"
            }`}
          >
            Get All The Top Stories From
            <br />
            blogs To Keep Track.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Input
            className={`h-[50px] rounded-[5px] text-center ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                : "bg-white text-[#6d757f]"
            }`}
            placeholder="Enter your e-mail"
          />
          <Button className="bg-[#f4796c] hover:bg-[#f4796c]/90 h-[50px] text-white font-bold">
            SUBSCRIBE NOW
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            className={`rounded-[3px] mt-1 ${
              isDarkMode
                ? "bg-gray-700 border-gray-500"
                : "bg-[#183354] border-[#436793]"
            }`}
          />
          <label
            htmlFor="terms"
            className={`text-[13px] ${
              isDarkMode ? "text-gray-400" : "text-[#7488a1]"
            }`}
          >
            I agree to the terms & conditions
          </label>
        </div>
      </CardContent>
    </Card>
  );
};
