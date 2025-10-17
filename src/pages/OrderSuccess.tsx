import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, MapPin, Clock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  created_at: string;
  items: OrderItem[];
}

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate("/menu");
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        // Fetch order
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (orderError) throw orderError;

        // Fetch order items
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", orderId);

        if (itemsError) throw itemsError;

        setOrderDetails({
          ...orderData,
          items: itemsData || [],
        });
      } catch (error) {
        console.error("Error fetching order details:", error);
        navigate("/menu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return null;
  }

  const estimatedDelivery = new Date(orderDetails.created_at);
  estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 35);

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b">
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Success Message */}
          <Card className="border-0 shadow-warm bg-gradient-food text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-warm-neutral mb-2">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground">
                Your order has been confirmed and is being prepared
              </p>
              <Badge className="mt-4 bg-gradient-primary border-0 text-primary-foreground">
                Order #{orderDetails.id.slice(0, 8)}
              </Badge>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="border-0 shadow-card bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warm-neutral">
                <Package className="h-5 w-5 text-orange-primary" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-primary mt-1" />
                <div>
                  <p className="font-medium text-warm-neutral">Delivery Address</p>
                  <p className="text-muted-foreground">{orderDetails.delivery_address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-primary mt-1" />
                <div>
                  <p className="font-medium text-warm-neutral">Estimated Delivery</p>
                  <p className="text-muted-foreground">
                    {estimatedDelivery.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-primary/10 text-orange-primary border-orange-primary/20">
                  {orderDetails.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-card bg-card/50">
            <CardHeader>
              <CardTitle className="text-warm-neutral">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-warm-neutral">{item.item_name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-orange-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${(orderDetails.total_amount / 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${(orderDetails.total_amount - orderDetails.total_amount / 1.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg text-warm-neutral">
                  <span>Total</span>
                  <span className="text-orange-primary">${orderDetails.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/menu")}
              variant="outline"
              className="flex-1"
            >
              Order More
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              className="flex-1 bg-gradient-primary"
            >
              View Order History
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
