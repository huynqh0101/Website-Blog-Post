import ArticleList from "@/components/articles/ArticleList";

export default function ArticlesPage() {
  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        Bài viết mới nhất
      </h1>
      <ArticleList />
    </main>
  );
}
