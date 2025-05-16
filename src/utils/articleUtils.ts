import { useRouter } from "next/navigation";

export function useArticleActions() {
  const router = useRouter();

  const navigateToEdit = (articleId: string) => {
    router.push(`/dashbroad/edit-article/${articleId}`);
  };

  return {
    navigateToEdit,
  };
}
