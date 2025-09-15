import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Market from "./pages/Market";
import Crops from "./pages/Crops";
import Weather from "./pages/Weather";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Predict from "./pages/predict";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
          

<Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/market" element={<Market />} />
  <Route path="/crops" element={<Crops />} />
  <Route path="/weather" element={<Weather />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/predict" element={<Predict />} /> 
  <Route path="*" element={<NotFound />} />
</Routes>

          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
