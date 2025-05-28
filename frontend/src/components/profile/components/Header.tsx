import { PlusIcon } from "lucide-react";
import { AuthorResponse } from "@/components/profile/types";
interface UserAvatar {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

interface UserData {
  id: number;
  username: string;
  email: string;
  avatar?: UserAvatar;
}

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarPreview: string | null;
  authorData?: AuthorResponse | null;
  userData?: UserData | null;
  onAvatarChange: (file: File) => void;
}

export function ProfileHeader({
  name,
  email,
  avatarPreview,
  authorData,
  userData,
  onAvatarChange,
}: ProfileHeaderProps) {
  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;

    if (authorData?.data[0]?.avatar?.formats?.medium?.url) {
      return `http://localhost:1337${authorData.data[0].avatar.formats.medium.url}`;
    }

    if (userData?.avatar?.formats?.medium?.url) {
      return `http://localhost:1337${userData.avatar.formats.medium.url}`;
    }

    if (userData?.avatar?.formats?.small?.url) {
      return `http://localhost:1337${userData.avatar.formats.small.url}`;
    }

    if (authorData?.data[0]?.avatar?.url) {
      return `http://localhost:1337${authorData.data[0].avatar.url}`;
    }

    if (userData?.avatar?.url) {
      return `http://localhost:1337${userData.avatar.url}`;
    }

    return "/default-avatar.png";
  };

  return (
    <div className="mb-8">
      <div className="relative h-48 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={getAvatarUrl()}
                alt={name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                  console.error("Không thể tải avatar");
                }}
              />
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onAvatarChange(file);
                    }
                  }}
                />
                <PlusIcon className="w-4 h-4 text-gray-600" />
              </label>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-200">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
