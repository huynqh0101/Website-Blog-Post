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
          <div className="relative md:w-[350px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <Input
              className="h-[50px] bg-white rounded-md pl-10 w-full"
              placeholder="Name"
            />
          </div>
          <div className="relative md:w-[350px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <Input
              className="h-[50px] bg-white rounded-md pl-10 w-full"
              placeholder="E-mail"
              type="email"
            />
          </div>
          <Button className="md:w-[172px] h-[50px] bg-[#f4796c] hover:bg-[#f4796c]/90 text-white font-bold flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h2v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            Submit Now
          </Button>
        </div>
      </div>
    </div>
  );
};
