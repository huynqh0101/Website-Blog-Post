import BlogList from "@/components/blogs/BlogList";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate at most once per hour

export default function BlogsPage() {
  return (
    <main className="py-20">
      <Suspense
        fallback={
          <div className="container p-4 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gray-300 w-32 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 h-64 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        }
      >
        <BlogList />
      </Suspense>
    </main>
  );
}
