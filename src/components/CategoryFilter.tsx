import { Button } from "@/components/ui/button";

export const categories = [
  { id: "all", name: "All Items", icon: "🍽️" },
  { id: "appetizers", name: "Appetizers", icon: "🥗" },
  { id: "mains", name: "Main Courses", icon: "🍕" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "drinks", name: "Drinks", icon: "🥤" }
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          className={`
            px-6 py-3 rounded-full transition-all duration-300 font-semibold
            ${activeCategory === category.id 
              ? "bg-gradient-primary border-0 shadow-warm" 
              : "border-orange-primary/20 hover:bg-orange-primary/10 hover:border-orange-primary/40"
            }
          `}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  );
};