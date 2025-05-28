import LoginForm from "@/components/auth/LoginForm";
import { Toaster } from "sonner";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
//update
