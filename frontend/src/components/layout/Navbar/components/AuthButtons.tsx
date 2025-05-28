import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import UserAvatarDropdown from "@/components/UserAvatarDropdown";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  user: any;
  isDarkMode: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
  onLogout: () => void;
}

export const AuthButtons = ({
  isAuthenticated,
  user,
  isDarkMode,
  onSignIn,
  onSignUp,
  onLogout,
}: AuthButtonsProps) => {
  return (
    <div className="flex items-center space-x-3">
      {isAuthenticated ? (
        <UserAvatarDropdown
          username={user?.username || "User"}
          userRole={user.role}
          onLogout={onLogout}
          isDarkMode={isDarkMode}
        />
      ) : (
        <>
          <Button
            variant="ghost"
            onClick={onSignIn}
            className={`group flex items-center justify-center space-x-2 font-medium w-[120px] overflow-hidden
            tracking-normal hover:tracking-wider transition-all duration-300 ${
              isDarkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-600 hover:text-primary hover:bg-slate-100"
            }`}
          >
            <User
              className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                isDarkMode
                  ? "group-hover:text-white"
                  : "group-hover:text-primary"
              }`}
            />
            <span className="text-center">Sign in</span>
          </Button>
          <Button
            variant="default"
            onClick={onSignUp}
            className={`font-medium w-[120px] overflow-hidden text-center
            tracking-normal hover:tracking-wider transition-all duration-300 ${
              isDarkMode
                ? "bg-white text-slate-900 hover:bg-slate-200 hover:shadow-white/10"
                : "bg-primary text-white hover:bg-primary/90"
            } shadow-sm hover:shadow-md`}
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};
