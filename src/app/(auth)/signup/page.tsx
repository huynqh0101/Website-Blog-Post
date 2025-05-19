import SignupForm from "@/components/auth/SignupForm";
import { Toaster } from "sonner";
export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
