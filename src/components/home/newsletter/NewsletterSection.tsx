import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsletterSection = () => {
  return (
    <div className="w-full bg-[#e8f1f1] py-16">
      <div className="container max-w-[1320px] px-4 md:px-6">
        <h2 className="text-[28px] font-bold text-[#183354] text-center mb-8">
          Get Subscribe To Our Latest News & Update
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Input
            className="md:w-[350px] h-[50px] bg-white rounded-md"
            placeholder="Name"
          />
          <Input
            className="md:w-[350px] h-[50px] bg-white rounded-md"
            placeholder="E-mail"
          />
          <Button className="md:w-[172px] h-[50px] bg-[#f4796c] hover:bg-[#f4796c]/90 text-white font-bold">
            Submit Now
          </Button>
        </div>
      </div>
    </div>
  );
};
