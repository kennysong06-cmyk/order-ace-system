import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin, ChefHat, Award, Heart, LogOut, User, Flame, TrendingUp, ShoppingCart, Crown } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

// Import food images
import pizzaImage from "@/assets/pizza-margherita.jpg";
import burgerImage from "@/assets/gourmet-burger.jpg";
import saladImage from "@/assets/caesar-salad.jpg";
import cakeImage from "@/assets/chocolate-lava-cake.jpg";

const hotSaleItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce",
    price: 16.99,
    originalPrice: 19.99,
    image: pizzaImage,
    discount: "15% OFF"
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center",
    price: 8.99,
    originalPrice: 11.99,
    image: cakeImage,
    discount: "25% OFF"
  }
];

const bestSellingItems = [
  {
    id: "2",
    name: "Gourmet Burger",
    description: "Angus beef patty with caramelized onions",
    price: 18.99,
    image: burgerImage,
    rating: 4.9,
    orders: "500+ orders"
  },
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce",
    price: 16.99,
    image: pizzaImage,
    rating: 4.8,
    orders: "450+ orders"
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan",
    price: 12.99,
    image: saladImage,
    rating: 4.7,
    orders: "300+ orders"
  }
];

const Home = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Auth Header */}
      {user && (
        <div className="bg-card/60 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/vip">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2 border-orange-primary/20 hover:bg-orange-primary/10">
                    <Crown className="h-4 w-4 text-orange-primary" />
                    <span>VIP</span>
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
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={restaurantHero} 
            alt="Bella Vista Restaurant Interior" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-gradient-primary border-0 text-primary-foreground px-4 py-2 text-sm font-semibold shadow-warm mb-6">
            ⭐ Top Rated Restaurant
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-warm-neutral mb-6 leading-tight">
            Bella Vista
            <span className="block text-orange-primary">Restaurant</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience exquisite flavors crafted with passion. From wood-fired pizzas to gourmet burgers, 
            every dish tells a story of culinary excellence.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold">4.8 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-primary" />
              <span>25-35 min delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-accent" />
              <span>Downtown, City Center</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-primary border-0 shadow-warm px-8 py-4 text-lg font-semibold hover:shadow-lg transition-all duration-300">
                Order Now
              </Button>
            </Link>
            <Link to="/vip">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-orange-primary/20 hover:bg-orange-primary/10">
                VIP Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Sale Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-red-500 text-white px-4 py-2 text-sm font-semibold mb-4">
              <Flame className="h-4 w-4 mr-2" />
              Hot Sale
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-warm-neutral mb-4">
              Limited Time Offers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these amazing deals. Fresh flavors at unbeatable prices!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hotSaleItems.map((item, index) => (
              <Card key={item.id} className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">
                      {item.discount}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-warm-neutral mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-primary">${item.price}</span>
                        <span className="text-lg text-muted-foreground line-through">${item.originalPrice}</span>
                      </div>
                      <Button className="bg-gradient-primary border-0 shadow-warm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-primary border-0 text-primary-foreground px-4 py-2 text-sm font-semibold mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Best Sellers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-warm-neutral mb-4">
              Customer Favorites
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most loved dishes that keep customers coming back for more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellingItems.map((item, index) => (
              <Card key={item.id} className="group overflow-hidden border-0 shadow-card hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-orange-primary text-white border-0">
                      #{index + 1} Bestseller
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-warm-neutral mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-sm">{item.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.orders}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-primary">${item.price}</span>
                      <Button variant="outline" className="border-orange-primary/20 hover:bg-orange-primary/10">
                        Order Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-warm-neutral mb-2">Expert Chefs</h3>
              <p className="text-muted-foreground">Our master chefs create culinary masterpieces using the finest ingredients</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-warm-neutral mb-2">Award Winning</h3>
              <p className="text-muted-foreground">Recognized for excellence in taste, service, and dining experience</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm shadow-card">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-warm-neutral mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Every dish is prepared with passion and attention to detail</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-card p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-neutral mb-4">
              Ready to Taste Excellence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made Bella Vista their favorite dining destination.
            </p>
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-primary border-0 shadow-warm px-8 py-4 text-lg font-semibold">
                Start Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;