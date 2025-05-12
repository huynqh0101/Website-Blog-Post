import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
  avatar?: string;
  onAvatarChange: (file: File | null) => void;
  loading?: boolean;
}

export function ProfileCard({
  name,
  email,
  avatar,
  onAvatarChange,
  loading,
}: ProfileCardProps) {
  return (
    <div className="relative px-8 pt-16">
      <div className="absolute -top-10 left-8">
        <input
          type="file"
          id="avatar"
          className="hidden"
          accept="image/*"
          onChange={(e) => onAvatarChange(e.target.files?.[0] || null)}
        />
        <label htmlFor="avatar">
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full cursor-pointer object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 cursor-pointer" />
          )}
        </label>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-medium">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#4182f9] hover:bg-[#3672e0]"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
