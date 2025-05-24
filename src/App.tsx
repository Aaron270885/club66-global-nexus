
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateCard from "./pages/ActivateCard";
import AffiliateDashboard from "./pages/AffiliateDashboard";

// Main pages
import Cards from "./pages/Cards";
import AppPage from "./pages/App";
import Discounts from "./pages/Discounts";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import FAQ from "./pages/FAQ";

// Job Dashboard Pages
import EmployeeDashboard from "./pages/job-dashboard/EmployeeDashboard";
import EmployerDashboard from "./pages/job-dashboard/EmployerDashboard";

// Service Pages
import Services from "./pages/services/index";
import CreditAccount from "./pages/services/CreditAccount";
import HirePurchase from "./pages/services/HirePurchase";
import PaydayLoan from "./pages/services/PaydayLoan";

// Affiliate Pages
import Members from "./pages/affiliates/Members";
import Merchants from "./pages/affiliates/Merchants";
import Distributors from "./pages/affiliates/Distributors";

// About Pages
import ChangingLives from "./pages/about/ChangingLives";
import AssociationMembers from "./pages/about/AssociationMembers";
import Partners from "./pages/about/Partners";
import Projects from "./pages/about/Projects";
import News from "./pages/about/News";
import Terms from "./pages/about/Terms";
import Privacy from "./pages/about/Privacy";
import Contact from "./pages/about/Contact";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/activate-card" element={<ActivateCard />} />
          <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
          
          {/* Main navigation pages */}
          <Route path="/cards" element={<Cards />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/job-dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="/job-dashboard/employer" element={<EmployerDashboard />} />
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
          
          {/* About pages */}
          <Route path="/about" element={<About />} />
          <Route path="/about/changing-lives" element={<ChangingLives />} />
          <Route path="/about/association-members" element={<AssociationMembers />} />
          <Route path="/about/partners" element={<Partners />} />
          <Route path="/about/projects" element={<Projects />} />
          <Route path="/about/news" element={<News />} />
          <Route path="/about/terms" element={<Terms />} />
          <Route path="/about/privacy" element={<Privacy />} />
          <Route path="/about/contact" element={<Contact />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppComponent;
