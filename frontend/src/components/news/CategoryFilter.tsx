import { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/services/categoryService";

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex gap-2 items-center justify-center mx-4">
      <h3 className="font-bold text-lg flex-shrink-0">Filter by Category: </h3>

      <Select
        onValueChange={(value) =>
          onCategoryChange(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-[160px] border rounded-md capitalize">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="capitalize">
            All
          </SelectItem>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.name} // Changed from category.attributes.name
              className="capitalize"
            >
              {category.name} {/* Changed from category.attributes.name */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
