import FloatingActionButtons from "@/components/ui/FloatingActionButtons";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {children}
        <FloatingActionButtons />
      </div>
    </div>
  );
}
