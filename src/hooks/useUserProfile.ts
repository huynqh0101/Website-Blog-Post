import { useState } from "react";
import { UserData, UserProfileData } from "@/components/profile/types";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserProfileData>({
    username: "",
    email: "",
    avatar: null,
  });
  const { user, logout } = useAuth();
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1337/api/users/${user?.id}?populate=avatar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
      setFormData({
        username: data.username,
        email: data.email,
        avatar: null,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Xử lý upload avatar trước nếu có
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

      // Cập nhật thông tin user
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
        throw new Error("Failed to update profile");
      }

      // Xử lý thay đổi email
      if (formData.email !== user?.email) {
        logout();
        toast.success("Email updated. Please login again");
        router.push("/login");
        return;
      }

      toast.success("Profile updated successfully!");
      await fetchUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
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
