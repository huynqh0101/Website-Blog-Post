import React from "react";

export default function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* Phần ảnh cover */}
      <div className="h-48 bg-gray-300"></div>

      <div className="p-4 md:p-6 space-y-3">
        {/* Avatar và thông tin tác giả */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Tiêu đề */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>

        {/* Ngày và tác giả */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Mô tả */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
