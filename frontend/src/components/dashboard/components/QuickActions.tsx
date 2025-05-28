import Link from "next/link";
import { BarChart3Icon, CalendarIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <Link
          href="/dashboard/new-article"
          className="flex items-center p-3 bg-[#f6f8ff] rounded-lg hover:bg-[#eef2ff] transition-colors"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">Create New Article</p>
            <p className="text-xs text-gray-500">Start writing a new article</p>
          </div>
        </Link>
        <Link
          href="/dashboard/my-articles"
          className="flex items-center p-3 bg-[#f6f8ff] rounded-lg hover:bg-[#eef2ff] transition-colors"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">View All Articles</p>
            <p className="text-xs text-gray-500">Manage your articles</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
