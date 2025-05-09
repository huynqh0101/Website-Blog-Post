import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <FaNewspaper className="h-6 w-6 text-primary transition-colors duration-300" />
      <span className="text-xl font-bold tracking-wide whitespace-nowrap font-sans bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:tracking-wider transition-all duration-300">
        Daily News
      </span>
    </Link>
  );
};
