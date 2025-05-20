
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Basic pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Main pages
import Cards from "./pages/Cards";
import AppPage from "./pages/App";
import Discounts from "./pages/Discounts";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import FAQ from "./pages/FAQ";

// Service Pages
import Services from "./pages/services/index";
import CreditAccount from "./pages/services/CreditAccount";
import HirePurchase from "./pages/services/HirePurchase";
import PaydayLoan from "./pages/services/PaydayLoan";

// Affiliate Pages
import Members from "./pages/affiliates/Members";
import Merchants from "./pages/affiliates/Merchants";
import Distributors from "./pages/affiliates/Distributors";

// Add custom styles for card flipping
import "./styles/card.css";

const queryClient = new QueryClient();

const AppComponent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Main navigation pages */}
          <Route path="/cards" element={<Cards />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Service pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/credit" element={<CreditAccount />} />
          <Route path="/services/hire-purchase" element={<HirePurchase />} />
          <Route path="/services/payday-loan" element={<PaydayLoan />} />
          
          {/* Affiliate pages */}
          <Route path="/affiliates/members" element={<Members />} />
          <Route path="/affiliates/merchants" element={<Merchants />} />
          <Route path="/affiliates/distributors" element={<Distributors />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppComponent;
