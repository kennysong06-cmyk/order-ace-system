import { useState } from "react";
import { MenuItem, MenuItemType } from "@/components/MenuItem";
import { Cart, CartItem } from "@/components/Cart";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PaymentModal } from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Clock, Star, MapPin, LogOut, User as UserIcon } from "lucide-react";

// Import food images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/gourmet-burger.jpg";
import saladImage from "@/assets/caesar-salad.jpg";
import cakeImage from "@/assets/chocolate-lava-cake.jpg";

const restaurantInfo = {
  name: "Bella Vista Restaurant",
  rating: 4.8,
  deliveryTime: "25-35 min",
  location: "Downtown, City Center"
};

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

const Index = () => {
  const { user, signOut } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItemType, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });

    toast({
      title: "Added to cart!",
      description: `${quantity}x ${item.name} added to your order`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find(cartItem => cartItem.id === id);
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== id));
    
    if (item) {
      toast({
        title: "Removed from cart",
        description: `${item.name} removed from your order`,
      });
    }
  };

  const handleCheckout = () => {
    if (!user || cartItems.length === 0) return;
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmed = async (paymentMethod: string) => {
    if (!user || cartItems.length === 0) return;

    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const tax = totalAmount * 0.08;
      const finalTotal = totalAmount + tax;

      // Get user's address from profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("address")
        .eq("user_id", user.id)
        .maybeSingle();

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: "pending",
          delivery_address: profileData?.address || "Address not set",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: orderData.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Order placed!",
        description: `Payment via ${paymentMethod} successful. Your meal is being prepared!`,
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Auth Header */}
      <div className="bg-card/60 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-warm-neutral mb-2">
                {restaurantInfo.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{restaurantInfo.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-orange-primary" />
                  <span>{restaurantInfo.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-red-accent" />
                  <span>{restaurantInfo.location}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-primary border-0 text-primary-foreground px-4 py-2 text-sm font-semibold shadow-warm">
              Free Delivery
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart */}
      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        totalAmount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.08}
        onConfirmPayment={handlePaymentConfirmed}
      />
    </div>
  );
};

export default Index;