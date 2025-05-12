import { Button } from "@/components/ui/button";
import { Mail, PlusIcon } from "lucide-react";

interface EmailSectionProps {
  email: string;
  lastUpdated: string;
}

export function EmailSection({ email, lastUpdated }: EmailSectionProps) {
  return (
    <div className="col-span-2 mt-8">
      <h3 className="text-lg font-medium mb-4">My Email Address</h3>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#4182f9]/10 rounded-full flex items-center justify-center">
          <Mail className="text-[#4182f9]" />
        </div>
        <div>
          <p>{email}</p>
          <p className="text-sm text-gray-500">{lastUpdated}</p>
        </div>
      </div>
      <Button type="button" variant="outline" className="mt-4 text-[#4182f9]">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Email Address
      </Button>
    </div>
  );
}
