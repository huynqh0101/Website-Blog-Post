import { useState } from "react";
import { AuthorProfileData, AuthorResponse } from "@/components/profile/types";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface UseAuthorProfileProps {
  authorData: AuthorResponse | null;
  setAuthorData: (data: AuthorResponse | null) => void;
  formData: AuthorProfileData;
}

export const useAuthorProfile = ({
  authorData,
  setAuthorData,
  formData,
}: UseAuthorProfileProps) => {
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const router = useRouter();
  // Validate data
  const validateData = (token: string | null) => {
    if (!token) {
      throw new Error("Token does not exist.");
    }
    if (!authorData?.data || authorData.data.length === 0) {
      throw new Error("Author information not found.");
    }
  };

  // Add email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const updateUserEmail = async (
    token: string,
    oldEmail: string,
    newEmail: string
  ) => {
    try {
      // Validate new email format
      if (!isValidEmail(newEmail)) {
        throw new Error("The email address is invalid.");
      }

      // Find user with correct filter syntax
      const findUserResponse = await fetch(
        `http://localhost:1337/api/users?filters[email][$eq]=${encodeURIComponent(
          oldEmail
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!findUserResponse.ok) {
        const errorData = await findUserResponse.json();
        console.error("User find error:", errorData);
        throw new Error("User information could not be found.");
      }

      const users = await findUserResponse.json();
      console.log("Found users:", users); // Debug log

      if (!users || users.length === 0) {
        throw new Error("No user found with this email.");
      }

      const userId = users[0].id;

      // Update user email
      const updateUserResponse = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: newEmail.trim().toLowerCase(),
            username: users[0].username, // Include username to maintain data consistency
          }),
        }
      );

      if (!updateUserResponse.ok) {
        const errorData = await updateUserResponse.json();
        console.error("User update error:", errorData);
        throw new Error(
          `Unable to update user's email: ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const updatedUser = await updateUserResponse.json();
      console.log("User updated successfully:", updatedUser);
      logout();
      toast.success("Email updated successfully! Please log in again.", {
        duration: 5000,
      });
      router.push("/login");
    } catch (error) {
      console.error("Error in updateUserEmail:", error);
      throw error;
    }
  };

  // Modify updateBasicInfo to handle email update first
  const updateBasicInfo = async (token: string) => {
    // If email has changed, update user first
    if (formData.email !== authorData?.data[0].email) {
      await updateUserEmail(token, authorData!.data[0].email, formData.email);
    }

    const requestData = {
      data: {
        name: formData.name,
        email: formData.email,
        bio: formData.bio || "",
      },
    };

    const response = await fetch(
      `http://localhost:1337/api/authors/${authorData!.data[0].documentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update error:", errorData);
      throw new Error(
        errorData.error?.message || "Unable to update information."
      );
    }
  };

  // Refresh data after update
  const refreshAuthorData = async (token: string) => {
    const refreshResponse = await fetch(
      `http://localhost:1337/api/authors/${
        authorData!.data[0].documentId
      }?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!refreshResponse.ok) {
      throw new Error("Unable to retrieve the latest information.");
    }

    const refreshedData = await refreshResponse.json();
    setAuthorData({
      ...authorData!,
      data: [refreshedData.data],
    });
  };

  // Upload avatar
  const uploadAvatar = async (token: string) => {
    if (!formData.avatar) return;

    const avatarFormData = new FormData();
    avatarFormData.append("files", formData.avatar);
    avatarFormData.append("ref", "api::author.author");
    avatarFormData.append("refId", authorData!.data[0].id.toString());
    avatarFormData.append("field", "avatar");

    const avatarResponse = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: avatarFormData,
    });

    if (!avatarResponse.ok) {
      console.error("Avatar upload error:", await avatarResponse.json());
      toast.error(
        "Information updated successfully, but avatar upload failed."
      );
    }
  };

  // Main submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      validateData(token);

      await updateBasicInfo(token!);
      await refreshAuthorData(token!);
      await uploadAvatar(token!);

      toast.success("Information updated successfully!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error occurred during information update."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
