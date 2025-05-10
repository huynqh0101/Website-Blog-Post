import NewsList from "@/components/news/NewsList";

const Newspage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-24 sm:pt-20 pb-12">
          {/* Page Header */}
          <div className="mb-10 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/80">
              Latest News
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Stay updated with our latest articles and announcements
            </p>
          </div>

          {/* News List */}
          <div className="relative">
            <NewsList />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Newspage;
