"use client";

import { ArticleDetail as ArticleDetailType } from "@/types/article-detail";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { CommentSection } from "@/components/comments/CommentSection";

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
          <div
            key={`rich-text-${block.id}`}
            className="prose prose-lg max-w-none"
          >
            <ReactMarkdown>{block.body}</ReactMarkdown>
          </div>
        );
      case "shared.quote":
        return (
          <blockquote
            key={`quote-${block.id}`}
            className="border-l-4 pl-4 my-4"
          >
            <p className="italic">{block.body}</p>
            {block.title && <cite>— {block.title}</cite>}
          </blockquote>
        );
      case "shared.media":
        return (
          <div key={`media-${block.id}`} className="my-8">
            <Image
              src={`${API_URL}${block.file.url}`}
              width={block.file.width}
              height={block.file.height}
              alt={block.file.alternativeText || ""}
              className="rounded-lg w-full h-auto"
            />
          </div>
        );
      case "shared.slider":
        return (
          <div key={`slider-${block.id}`} className="my-8">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full rounded-lg"
            >
              {/* Thêm kiểm tra block.files tồn tại và là mảng */}
              {block.files &&
              Array.isArray(block.files) &&
              block.files.length > 0 ? (
                block.files.map((file: any, index: number) => (
                  <SwiperSlide key={`slide-${block.id}-${index}`}>
                    <div className="aspect-video relative">
                      <Image
                        src={`${API_URL}${file.url}`}
                        alt={file.alternativeText || `Slide ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="aspect-video relative flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No images in this slider</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article className="container mx-auto px-4 py-8">
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
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
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
      {article.cover && (
        <div className="max-w-4xl mx-auto mb-8 relative aspect-video">
          <Image
            src={
              article.cover.formats?.medium?.url
                ? `${API_URL}${article.cover.formats.medium.url}`
                : article.cover.formats?.small?.url
                ? `${API_URL}${article.cover.formats.small.url}`
                : article.cover.formats?.thumbnail?.url
                ? `${API_URL}${article.cover.formats.thumbnail.url}`
                : article.cover.url
                ? `${API_URL}${article.cover.url}`
                : "/placeholder-image.png"
            }
            alt={
              article.cover.alternativeText || article.title || "Article cover"
            }
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* Content Blocks */}
      <div className="max-w-4xl mx-auto space-y-8">
        {article.blocks?.map((block) => renderBlock(block))}
      </div>

      {/* Comment Section */}
      <CommentSection articleId={article.documentId} />
    </article>
  );
}
