import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const NewsletterCard = () => {
  return (
    <Card className="bg-[#183354] mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-[75px] h-[75px] mb-2">
            <img
              src="/icon-43.svg"
              alt="Newsletter Icon"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-xl font-extrabold text-white text-center mb-1">
            Daily Newsletter
          </h3>
          <p className="text-white text-base font-medium text-center">
            Get All The Top Stories From
            <br />
            blogs To Keep Track.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <Input
            className="bg-white h-[50px] rounded-[5px] text-center text-[#6d757f]"
            placeholder="Enter your e-mail"
          />
          <Button className="bg-[#f4796c] hover:bg-[#f4796c]/90 h-[50px] text-white font-bold">
            SUBSCRIBE NOW
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            className="bg-[#183354] border-[#436793] rounded-[3px] mt-1"
          />
          <label htmlFor="terms" className="text-[13px] text-[#7488a1]">
            I agree to the terms & conditions
          </label>
        </div>
      </CardContent>
    </Card>
  );
};