import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { authService } from "@/services/authService";

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "author" | "user";
}

export const useSignup = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      if (formData.role === "user") {
        // 1. Register the user
        const userData = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        // 2. Set default avatar
        await authService.setUserAvatar(userData.user.id, userData.jwt);

        // 3. Update auth context
        login(userData.jwt, {
          id: userData.user.id,
          username: userData.user.username,
          email: userData.user.email,
          role: "user",
        });
      } else {
        // 1. Create author profile
        const authorData = await authService.createAuthor({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          avatar: 13, // Default avatar ID
        });

        // 2. Register the user
        const userData = await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        // 3. Update auth context
        login(userData.jwt, {
          id: authorData.data.id, // ID của author entry
          username: formData.username,
          email: formData.email,
          role: "author",
        });
      }

      toast.success(`Registration successful as ${formData.role}!`);
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
  };
};
