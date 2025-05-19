"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, BellIcon } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProfileHeader } from "./components/Header";
import { ChangePassword } from "./components/ChangePassword";
export default function UserProfile() {
  const {
    loading,
    userData,
    formData,
    setFormData,
    handleSubmit,
    fetchUserData,
  } = useUserProfile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAvatarChange = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setFormData({
      ...formData,
      avatar: file as any,
    });
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProfileHeader
          name={formData.username}
          email={formData.email}
          avatarPreview={avatarPreview}
          userData={userData}
          onAvatarChange={handleAvatarChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                        Username
                      </label>
                      <Input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          username: (userData as any)?.username || "",
                          email: (userData as any)?.email || "",
                          avatar: null,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading && (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
