"use client";

import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Mail, BellIcon, PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EmailSection } from "./components/EmailSection";
import { useAuthorProfile } from "@/hooks/useAuthorProfile";
import { useFetchAuthor } from "@/hooks/useFetchAuthor";
import { ProfileHeader } from "./components/Header";
import { ChangePassword } from "./components/ChangePassword";
export default function AuthorProfile() {
  const { user } = useAuth();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { initialLoading, authorData, formData, setFormData, setAuthorData } =
    useFetchAuthor(user?.email);

  // Use the custom hook
  const { loading, handleSubmit } = useAuthorProfile({
    authorData,
    setAuthorData,
    formData,
  });
  const handleAvatarChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setFormData({
      ...formData,
      avatar: file,
    });
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader
          name={formData.name}
          email={formData.email}
          avatarPreview={avatarPreview}
          authorData={authorData}
          onAvatarChange={handleAvatarChange}
        />
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Profile Information
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        rows={4}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-6"
                      onClick={() =>
                        setFormData({
                          name: authorData?.data[0]?.name || "",
                          email: authorData?.data[0]?.email || "",
                          avatar: null,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>Email verified</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <BellIcon className="w-5 h-5" />
                    <span>Notifications enabled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <ChangePassword />
            <EmailSection email={formData.email} lastUpdated="1 month ago" />
          </div>
        </div>
      </div>
    </div>
  );
}
