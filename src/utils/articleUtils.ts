import { useRouter } from "next/navigation";

export function useArticleActions() {
  const router = useRouter();

  const navigateToEdit = (articleId: string) => {
    router.push(`/dashboard/edit-article/${articleId}`);
  };

  return {
    navigateToEdit,
  };
}
