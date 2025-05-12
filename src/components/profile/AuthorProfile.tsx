"use client";

import { useAuth } from "@/context/authContext";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Loader2, Mail, BellIcon, SearchIcon, PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { EmailSection } from "./components/EmailSection";

interface AuthorProfileData {
  name: string;
  email: string;
  bio?: string;
  avatar?: File | null;
  gender?: string;
  nickname?: string;
  language?: string;
  country?: string;
  timezone?: string;
}

interface AuthorResponse {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar: {
      id: number;
      formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large: { url: string };
      };
      url: string;
    };
    articles?: Array<{
      id: number;
      documentId: string;
      title: string;
      description: string;
      slug: string;
    }>;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function AuthorProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [authorData, setAuthorData] = useState<AuthorResponse | null>(null);
  const [formData, setFormData] = useState<AuthorProfileData>({
    name: "",
    email: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        if (!user?.email) {
          throw new Error("No user email found");
        }

        const response = await fetch(
          `http://localhost:1337/api/authors?filters[email][$eq]=${encodeURIComponent(
            user.email
          )}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error(
            `Failed to fetch author data: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Received author data:", data);

        // Since the API returns an array, we take the first author
        if (data.data && data.data.length > 0) {
          const authorData = data.data[0];
          setAuthorData({
            data: [authorData],
            meta: {
              pagination: {
                page: 1,
                pageSize: 1,
                pageCount: 1,
                total: 1,
              },
            },
          });
          setFormData({
            name: authorData.name,
            email: authorData.email,
            bio: authorData.bio || "",
            avatar: null,
          });
        } else {
          throw new Error("No author found with this email");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch author data"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAuthorData();
  }, [user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== "avatar") {
          formDataToSend.append(`data[${key}]`, value);
        }
      });
      if (formData.avatar) {
        formDataToSend.append("files.avatar", formData.avatar);
      }

      const response = await fetch(
        `http://localhost:1337/api/authors/${user?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Author profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
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
        <div className="mb-8">
          <div className="relative h-48 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={
                      authorData?.data[0]?.avatar
                        ? `http://localhost:1337${authorData.data[0].avatar.formats.medium.url}`
                        : "/default-avatar.png"
                    }
                    alt={formData.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          avatar: e.target.files?.[0] || null,
                        })
                      }
                    />
                    <PlusIcon className="w-4 h-4 text-gray-600" />
                  </label>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{formData.name}</h1>
                  <p className="text-gray-200">{formData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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

            <EmailSection email={formData.email} lastUpdated="1 month ago" />
          </div>
        </div>
      </div>
    </div>
  );
}
