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
      throw new Error("Token không tồn tại");
    }
    if (!authorData?.data || authorData.data.length === 0) {
      throw new Error("Không tìm thấy thông tin tác giả");
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
        throw new Error("Email không hợp lệ");
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
        throw new Error("Không thể tìm thấy thông tin user");
      }

      const users = await findUserResponse.json();
      console.log("Found users:", users); // Debug log

      if (!users || users.length === 0) {
        throw new Error("Không tìm thấy user với email này");
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
          `Không thể cập nhật email của user: ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const updatedUser = await updateUserResponse.json();
      console.log("User updated successfully:", updatedUser);
      logout();
      toast.success("Cập nhật email thành công! Vui lòng đăng nhập lại.", {
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
      console.error("Lỗi cập nhật:", errorData);
      throw new Error(
        errorData.error?.message || "Không thể cập nhật thông tin"
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
      throw new Error("Không thể lấy thông tin mới nhất");
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
      console.error("Lỗi upload avatar:", await avatarResponse.json());
      toast.error(
        "Cập nhật thông tin thành công nhưng không thể upload avatar"
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

      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi cập nhật thông tin"
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
