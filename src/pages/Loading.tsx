import { UtensilsCrossed } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <UtensilsCrossed className="h-16 w-16 text-orange-600 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Delicious Bites</h1>
        <p className="text-gray-600 mb-8">Preparing your dining experience...</p>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;