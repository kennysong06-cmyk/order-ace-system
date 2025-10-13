import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Gift, Zap, Truck, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VIP = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Silver",
      icon: Star,
      price: "$9.99",
      color: "from-gray-400 to-gray-600",
      benefits: [
        "5% discount on all orders",
        "Free delivery over $30",
        "Birthday special gift",
        "Early access to new menu items",
      ],
    },
    {
      name: "Gold",
      icon: Crown,
      price: "$19.99",
      color: "from-yellow-400 to-yellow-600",
      popular: true,
      benefits: [
        "10% discount on all orders",
        "Free delivery on all orders",
        "Priority customer support",
        "Monthly surprise gift",
        "Exclusive VIP-only dishes",
        "Double loyalty points",
      ],
    },
    {
      name: "Platinum",
      icon: Zap,
      price: "$29.99",
      color: "from-purple-400 to-purple-600",
      benefits: [
        "15% discount on all orders",
        "Free delivery on all orders",
        "24/7 VIP concierge service",
        "Weekly premium gifts",
        "Chef's special menu access",
        "Triple loyalty points",
        "Private dining reservations",
        "Complimentary drinks with meals",
      ],
    },
  ];

  const features = [
    {
      icon: Percent,
      title: "Exclusive Discounts",
      description: "Save more on every order with VIP-only pricing",
    },
    {
      icon: Truck,
      title: "Priority Delivery",
      description: "Get your food faster with VIP delivery priority",
    },
    {
      icon: Gift,
      title: "Special Rewards",
      description: "Receive monthly gifts and birthday surprises",
    },
    {
      icon: Star,
      title: "Premium Access",
      description: "Try new dishes before anyone else",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">VIP Membership</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our VIP Club
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock exclusive benefits, special discounts, and premium perks designed just for our most valued members
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Tier</h2>
            <p className="text-lg text-muted-foreground">
              Select the perfect membership level for your dining lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary">Most Popular</Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                    <tier.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground mt-2">
                    {tier.price}<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Star className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Join {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of VIP members enjoying exclusive benefits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/menu")}>
              Browse Menu
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VIP;
