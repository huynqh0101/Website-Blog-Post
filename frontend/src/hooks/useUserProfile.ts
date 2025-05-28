import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useUserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: null as File | null,
  });

  // Track initial fetch attempt
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchUserData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view this page");
        router.push("/login");
        return;
      }

      if (!user || !user.id) {
        console.log("User information not ready yet");
        if (hasAttemptedFetch) {
          toast.error("Unable to retrieve user information");
        }
        return;
      }

      const response = await fetch(
        `http://localhost:1337/api/users/${user.id}?populate=avatar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        toast.error("Your session has expired, please login again");
        logout();
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to load user data");
      }

      const data = await response.json();
      setUserData(data);

      setFormData({
        username: data.username || "",
        email: data.email || "",
        avatar: null,
      });

      setHasAttemptedFetch(true);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // Only fetch when user and authentication are ready
  useEffect(() => {
    if (isAuthenticated && user && user.id) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Handle avatar upload if provided
      if (formData.avatar) {
        const avatarFormData = new FormData();
        avatarFormData.append("files", formData.avatar);
        avatarFormData.append("ref", "plugin::users-permissions.user");
        avatarFormData.append("refId", user!.id.toString());
        avatarFormData.append("field", "avatar");

        const uploadResponse = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: avatarFormData,
        });

        if (!uploadResponse.ok) {
          console.error(
            "Failed to upload avatar:",
            await uploadResponse.json()
          );
          throw new Error("Failed to upload avatar");
        }
      }

      // Update user information
      const response = await fetch(
        `http://localhost:1337/api/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");

      // Refresh user data after update
      fetchUserData();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    userData,
    formData,
    setFormData,
    handleSubmit,
    fetchUserData,
  };
};
