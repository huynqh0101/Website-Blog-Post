import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { authService } from "@/services/authService";
import { LoginCredentials } from "@/types/auth";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    identifier: "",
    password: "",
  });

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Submit login form
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        // 1. Login attempt
        const loginData = await authService.login(formData);

        // 2. Check if user is an author
        const authorData = await authService.checkAuthorStatus(
          formData.identifier,
          loginData.jwt
        );

        // Determine user role
        const userRole =
          authorData.data && authorData.data.length > 0 ? "author" : "user";

        // Save author data if applicable
        if (
          userRole === "author" &&
          authorData.data &&
          authorData.data.length > 0
        ) {
          authService.saveAuthorData(authorData.data[0].documentId);
        }

        // Update auth context
        login(loginData.jwt, {
          ...loginData.user,
          role: userRole,
        });

        // Show success message
        toast.success(`Login successful as ${userRole}!`);

        // Redirect to home page
        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error instanceof Error ? error.message : "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [formData, login, router]
  );

  return {
    formData,
    loading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
