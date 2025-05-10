import { ArrowUpIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainByAnima } from "@/components/MainByAnima";

export default function Home() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-x-hidden w-full max-w-[1920px] relative">
        <MainByAnima />
      </div>

      {/* Scroll to top button */}
      <Button
        className="fixed w-9 h-9 bottom-[118px] right-[69px] bg-[#1b1128] rounded-[18px] p-0 shadow-[0px_6px_32px_-1px_#00000014] flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon size={14} className="text-white" />
      </Button>

      {/* Message button */}
      <Button
        className="fixed w-10 h-10 bottom-[40px] right-[70px] bg-[#f4796c] rounded-md p-0 flex items-center justify-center"
        aria-label="Message"
      >
        <MessageSquareIcon size={16} className="text-white" />
        <div className="absolute w-9 h-2.5 top-10 left-0.5 [background:radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0)_80%)]" />
      </Button>
    </div>
  );
}
