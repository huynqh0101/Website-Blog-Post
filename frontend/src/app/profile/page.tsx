"use client";

import { useAuth } from "@/context/authContext";
import UserProfile from "@/components/profile/UserProfile";
import AuthorProfile from "@/components/profile/AuthorProfile";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {user?.role === "author" ? <AuthorProfile /> : <UserProfile />}
    </div>
  );
}
