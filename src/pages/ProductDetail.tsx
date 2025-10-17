import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { MenuItemType } from "@/components/MenuItem";

// Import food images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/gourmet-burger.jpg";
import saladImage from "@/assets/caesar-salad.jpg";
import cakeImage from "@/assets/chocolate-lava-cake.jpg";

const menuItems: MenuItemType[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce on our signature wood-fired crust",
    price: 16.99,
    image: pizzaImage,
    category: "mains",
    popular: true
  },
  {
    id: "2", 
    name: "Gourmet Burger",
    description: "Angus beef patty with caramelized onions, aged cheddar, and our special sauce",
    price: 18.99,
    image: burgerImage,
    category: "mains",
    popular: true
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan, croutons, and grilled chicken",
    price: 12.99,
    image: saladImage,
    category: "appetizers"
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 8.99,
    image: cakeImage,
    category: "desserts",
    popular: true
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = menuItems.find(item => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-neutral mb-4">Product not found</h2>
          <Link to="/menu">
            <Button>Back to Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your order`,
    });
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Button>
        </div>
      </header>

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-xl shadow-warm"
              />
              {product.popular && (
                <Badge className="absolute top-4 right-4 bg-orange-primary text-primary-foreground border-0 shadow-warm">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-warm-neutral mb-4">
                  {product.name}
                </h1>
                
                <Badge className="mb-4 capitalize bg-card text-foreground border">
                  {product.category}
                </Badge>

                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                <div className="text-3xl font-bold text-orange-primary mb-8">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-warm-neutral">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold text-warm-neutral w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-primary text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
