"use client";
import { useState } from "react";

export const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "politics", name: "Politics" },
    { id: "business", name: "Business" },
    { id: "tech", name: "Technology" },
    { id: "sport", name: "Sports" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <select className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md text-sm p-2">
        <option>Latest</option>
        <option>Popular</option>
        <option>Trending</option>
      </select>
    </div>
  );
};
