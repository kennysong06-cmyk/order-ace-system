import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import VIP from "./pages/VIP";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={user ? <Home /> : <Auth />} />
      <Route path="/menu" element={user ? <Index /> : <Auth />} />
      <Route path="/product/:id" element={user ? <ProductDetail /> : <Auth />} />
      <Route path="/vip" element={user ? <VIP /> : <Auth />} />
      <Route path="/profile" element={user ? <Profile /> : <Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
