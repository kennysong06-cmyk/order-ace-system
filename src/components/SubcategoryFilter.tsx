import { Button } from "@/components/ui/button";

interface SubcategoryFilterProps {
  subcategories: string[];
  activeSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}

const subcategoryIcons: Record<string, string> = {
  pizza: "🍕",
  burger: "🍔",
  pasta: "🍝",
  salad: "🥗",
  soup: "🍲",
  cake: "🍰",
  ice_cream: "🍨",
  pastry: "🥐",
};

export const SubcategoryFilter = ({
  subcategories,
  activeSubcategory,
  onSubcategoryChange,
}: SubcategoryFilterProps) => {
  if (subcategories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6 animate-fade-in">
      <Button
        variant={activeSubcategory === "all" ? "default" : "outline"}
        size="sm"
        className={`
          rounded-full transition-all duration-300
          ${activeSubcategory === "all"
            ? "bg-orange-primary/90 text-primary-foreground shadow-warm"
            : "border-orange-primary/20 hover:bg-orange-primary/10"
          }
        `}
        onClick={() => onSubcategoryChange("all")}
      >
        All
      </Button>
      {subcategories.map((subcategory) => (
        <Button
          key={subcategory}
          variant={activeSubcategory === subcategory ? "default" : "outline"}
          size="sm"
          className={`
            rounded-full transition-all duration-300 capitalize
            ${activeSubcategory === subcategory
              ? "bg-orange-primary/90 text-primary-foreground shadow-warm"
              : "border-orange-primary/20 hover:bg-orange-primary/10"
            }
          `}
          onClick={() => onSubcategoryChange(subcategory)}
        >
          <span className="mr-1.5">{subcategoryIcons[subcategory] || "📦"}</span>
          {subcategory.replace("_", " ")}
        </Button>
      ))}
    </div>
  );
};
