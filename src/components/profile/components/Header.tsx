import { BellIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  avatarUrl?: string;
}

export function Header({ userName, avatarUrl }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-medium text-[#3e435d]">
          Welcome, {userName}
        </h1>
        <p className="text-[#ada7a7] text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input className="pl-10 w-[300px]" placeholder="Search" />
        </div>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        {avatarUrl && (
          <img src={avatarUrl} alt="Profile" className="w-10 h-10 rounded-full" />
        )}
      </div>
    </div>
  );
}
