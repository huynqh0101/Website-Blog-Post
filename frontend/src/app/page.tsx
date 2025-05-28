"use client";
import { MainByAnima } from "@/components/layout/Home";
import FloatingActionButtons from "@/components/ui/FloatingActionButtons";

export default function Home() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-x-hidden w-full max-w-[1920px] relative">
        <MainByAnima />
      </div>

      <FloatingActionButtons />
    </div>
  );
}
