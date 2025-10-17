import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

export const MenuItem = ({ item, onAddToCart }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-gradient-food border-0 overflow-hidden">
      <Link to={`/product/${item.id}`}>
        <div className="relative cursor-pointer">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {item.popular && (
            <Badge className="absolute top-3 left-3 bg-gradient-primary border-0 text-primary-foreground shadow-warm">
              Popular
            </Badge>
          )}
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <Link to={`/product/${item.id}`} className="block">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-warm-neutral group-hover:text-orange-primary transition-colors">
              {item.name}
            </CardTitle>
            <span className="text-xl font-bold text-orange-primary">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {item.description}
          </CardDescription>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-orange-primary/20 hover:bg-orange-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => handleQuantityChange(-1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg min-w-[2rem] text-center text-warm-neutral">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-orange-primary/20 hover:bg-orange-primary hover:text-primary-foreground transition-all duration-200"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            className="bg-gradient-primary hover:shadow-warm transition-all duration-300 hover:scale-105 border-0 font-semibold px-6"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};