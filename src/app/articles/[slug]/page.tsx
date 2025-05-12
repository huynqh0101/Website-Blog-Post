import { Metadata } from "next";
import ArticleDetail from "@/components/articles/ArticleDetail";
import { StrapiResponse, StrapiArticle } from "@/types/strapi-response";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

async function getArticle(slug: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const response = await res.json();

    // Check if we got any data back
    if (!response.data || response.data.length === 0) {
      throw new Error("Article not found");
    }

    // Return the first matching article
    return response.data[0];
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch article");
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = await getArticle(params.slug);

    return {
      title: article.attributes.title,
      description: article.attributes.description,
    };
  } catch (error) {
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
  try {
    const article = await getArticle(params.slug);
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

// Optional: Generate static params for known articles
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${API_URL}/api/articles?populate[author][populate]=avatar&populate=cover&populate=category`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!res.ok) return [];

    const response = await res.json();

    return response.data.map((article: any) => ({
      slug: article.attributes.slug,
    }));
  } catch (error) {
    return [];
  }
}
