"use client";

import { ArticleDetail as ArticleDetailType } from "@/types/article-detail";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

type AuthorData = {
  id: number;
  name: string;
  avatar: string | null;
};

export default function ArticleDetail({
  article,
}: {
  article: ArticleDetailType;
}) {
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);

  useEffect(() => {
    const savedAuthor = localStorage.getItem("currentAuthor");
    if (savedAuthor) {
      setAuthorData(JSON.parse(savedAuthor));
    }
  }, []);
  const renderBlock = (block: any) => {
    switch (block.__component) {
      case "shared.rich-text":
        return (
          <div key={block.id} className="prose prose-lg max-w-none">
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>
        );
      case "shared.quote":
        return (
          <blockquote key={block.id} className="border-l-4 pl-4 my-4">
            <p className="italic">{block.body}</p>
            {block.title && <cite>— {block.title}</cite>}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <article className="container mx-auto px-4 py-8 pt-20">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        {/* Author and Date info */}
        <div className="flex items-center gap-4 mb-6">
          {authorData?.avatar && (
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src={authorData.avatar}
                alt={authorData.name || "Author"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-medium">{article.author?.name}</p>
            <time className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Category */}
        {article.category && (
          <Link
            href={`/categories/${article.category.slug}`}
            className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            {article.category.name}
          </Link>
        )}
      </header>

      {/* Cover Image */}
      {article.cover?.formats?.medium?.url && (
        <div className="max-w-4xl mx-auto mb-8 relative aspect-video">
          <Image
            src={`${API_URL}${article.cover.formats.medium.url}`}
            alt={article.cover.alternativeText || article.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* Content Blocks */}
      <div className="max-w-4xl mx-auto space-y-8">
        {article.blocks?.map((block) => renderBlock(block))}
      </div>
    </article>
  );
}
