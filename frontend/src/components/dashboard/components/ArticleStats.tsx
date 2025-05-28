interface ArticleStatsProps {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
}

export const ArticleStats = ({ 
  totalArticles, 
  publishedArticles, 
  draftArticles 
}: ArticleStatsProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-medium mb-4">Article Statistics</h2>
      <div className="flex justify-between mb-3">
        <span className="text-gray-500">Total Articles</span>
        <span className="font-medium">{totalArticles}</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-gray-500">Published</span>
        <span className="font-medium">{publishedArticles}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Draft</span>
        <span className="font-medium">{draftArticles}</span>
      </div>
    </div>
  );
};