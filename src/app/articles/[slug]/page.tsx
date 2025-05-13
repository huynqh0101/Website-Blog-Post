import { Metadata } from "next";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { StrapiArticle } from "@/types/strapi-response";
import { articleService } from "@/services/articleService";

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
  } catch (error) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }
}

// Update the page component as well
export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const article = await articleService.getArticleBySlug(slug);
    return <ArticleDetail article={article as StrapiArticle} />;
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">Article not found</h1>
        <p className="mt-4 text-gray-600">
          The requested article could not be found.
        </p>
      </div>
    );
  }
}

export async function generateStaticParams() {
  return await articleService.getAllArticleSlugs();
}
