import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessSection } from "../sections/BusinessSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NewsletterCard } from "./NewsletterCard";
interface BusinessSidebarProps {
  businessSidebarArticles: any[];
}

export const BusinessSidebar = ({
  businessSidebarArticles,
}: BusinessSidebarProps) => {
  return (
    <div className="md:w-[300px] border-l border-[#dfdfdf] pl-4">
      <NewsletterCard />
      <BusinessSection articles={businessSidebarArticles} />
    </div>
  );
};
