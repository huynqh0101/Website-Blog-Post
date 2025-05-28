import { useState, useEffect } from 'react';
import { AuthorProfileData, AuthorResponse } from '@/components/profile/types';
import { toast } from 'sonner';

interface UseFetchAuthorResult {
  initialLoading: boolean;
  authorData: AuthorResponse | null;
  formData: AuthorProfileData;
  setFormData: (data: AuthorProfileData) => void;
  setAuthorData: (data: AuthorResponse | null) => void;
}

export const useFetchAuthor = (userEmail: string | undefined): UseFetchAuthorResult => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [authorData, setAuthorData] = useState<AuthorResponse | null>(null);
  const [formData, setFormData] = useState<AuthorProfileData>({
    name: "",
    email: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        if (!userEmail) {
          throw new Error("No user email found");
        }

        const response = await fetch(
          `http://localhost:1337/api/authors?filters[email][$eq]=${encodeURIComponent(
            userEmail
          )}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error(`Failed to fetch author data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Received author data:", data);

        if (data.data && data.data.length > 0) {
          const authorData = data.data[0];
          setAuthorData({
            data: [authorData],
            meta: {
              pagination: {
                page: 1,
                pageSize: 1,
                pageCount: 1,
                total: 1,
              },
            },
          });
          setFormData({
            name: authorData.name,
            email: authorData.email,
            bio: authorData.bio || "",
            avatar: null,
          });
        } else {
          throw new Error("No author found with this email");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch author data"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAuthorData();
  }, [userEmail]);

  return {
    initialLoading,
    authorData,
    formData,
    setFormData,
    setAuthorData,
  };
};