import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin, ChefHat, Award, Heart, LogOut, User } from "lucide-react";
import restaurantHero from "@/assets/restaurant-hero.jpg";

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
              <Button variant="outline" size="sm" onClick={signOut} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
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
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-orange-primary/20 hover:bg-orange-primary/10">
              View Menu
            </Button>
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