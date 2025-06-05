import { Metadata } from "next";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { StrapiArticle } from "@/types/strapi-response";
import { articleService } from "@/services/articleService";
import { Advertisement } from "@/components/home/advertisements/Advertisement";
import BannerSlider from "@/components/home/BannerSlider";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Await the params object
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const article = await articleService.getArticleBySlug(slug);
    return {
      title: article.title,
      description: article.description,
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const article = await articleService.getArticleBySlug(slug);

    return (
      <>
        <div className="w-full pt-4 pb-2 mt-[90px]">
          <BannerSlider
            banners={["/banner/banner10.jpg", "/banner/banner9.jpg"]}
            className="w-full h-[100px] sm:h-[120px] rounded-none shadow-lg"
            interval={5000}
            title={null}
            copyright={null}
          />
        </div>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-5xl ml-0 mr-auto pl-8 pr-4 sm:pr-6 py-6 flex flex-col xl:flex-row gap-4 xl:gap-6">
            {/* Main content with improved styling - expanded to use left sidebar space */}
            <main className="flex-1 w-full">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 md:p-8 lg:p-10">
                <div className="w-[880px] max-w-full">
                  <ArticleDetail article={article as StrapiArticle} />
                </div>

                {/* In-article ad - mobile and tablet only */}
                <div className="xl:hidden my-8 rounded-xl overflow-hidden">
                  <Advertisement
                    image="/images/advertisement/advm.jpg"
                    effect="slide"
                    borderEffect={true}
                    className="w-full h-[180px] rounded-xl shadow-inner"
                  />
                </div>
              </div>

              {/* Bottom banner inside content area */}
              <div className="mt-8 max-w-[calc(100%-20px)] xl:max-w-full ml-[10px] xl:ml-0">
                <Advertisement
                  image="/advertisement15-jpg.png"
                  effect="fade"
                  shineEffect={true}
                  className="w-full h-[100px] rounded-xl shadow-md"
                />
              </div>
            </main>

            {/* Right sidebar - visible on large screens - made wider */}
            <aside className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Advertisement
                  image="/images/advertisement/advm5.jpg"
                  effect="fade"
                  shineEffect={true}
                  className="w-full h-[720px] rounded-xl shadow-lg transition-transform hover:scale-[1.01] duration-300"
                />
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  } catch {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-red-500 mt-4">
            Article Not Found
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We couldn&#39;t locate the article you&#39;re looking for. It may
            have been moved or deleted.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
}
