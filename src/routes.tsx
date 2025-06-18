
import { createBrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Discounts from '@/pages/Discounts';
import Competitions from '@/pages/Competitions';
import Agents from '@/pages/Agents';
import AppPage from '@/pages/App';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import JobCenter from '@/pages/JobCenter';
import MembershipPayment from '@/pages/MembershipPayment';
import ActivateCard from '@/pages/ActivateCard';
import Cards from '@/pages/Cards';
import ResetPassword from '@/pages/ResetPassword';
import ForgotPassword from '@/pages/ForgotPassword';
import NotFound from '@/pages/NotFound';
import ProjectRequests from '@/pages/ProjectRequests';

// About sub-pages
import Contact from '@/pages/about/Contact';
import Projects from '@/pages/about/Projects';
import Partners from '@/pages/about/Partners';
import News from '@/pages/about/News';
import AssociationMembers from '@/pages/about/AssociationMembers';
import ChangingLives from '@/pages/about/ChangingLives';
import Terms from '@/pages/about/Terms';
import Privacy from '@/pages/about/Privacy';

// Services pages
import ServicesIndex from '@/pages/services/index';
import CreditSystem from '@/pages/services/CreditSystem';
import CreditAccount from '@/pages/services/CreditAccount';
import PaydayLoan from '@/pages/services/PaydayLoan';
import HirePurchase from '@/pages/services/HirePurchase';

// Admin pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AgentPanel from '@/pages/admin/AgentPanel';

// Affiliate pages
import AffiliateMembers from '@/pages/affiliates/Members';
import AffiliateMerchants from '@/pages/affiliates/Merchants';
import AffiliateDistributors from '@/pages/affiliates/Distributors';
import AffiliateDashboard from '@/pages/AffiliateDashboard';

// Job dashboard pages
import EmployeeDashboard from '@/pages/job-dashboard/EmployeeDashboard';
import EmployerDashboard from '@/pages/job-dashboard/EmployerDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  // Our Cards (ZENIKA)
  {
    path: '/cards',
    element: <Cards />,
  },
  // Our App
  {
    path: '/app',
    element: <AppPage />,
  },
  // Discounts
  {
    path: '/discounts',
    element: <Discounts />,
  },
  // Services & Products
  {
    path: '/services',
    element: <ServicesIndex />,
  },
  {
    path: '/services/credit-system',
    element: <CreditSystem />,
  },
  {
    path: '/services/credit-account',
    element: <CreditAccount />,
  },
  {
    path: '/services/payday-loan',
    element: <PaydayLoan />,
  },
  {
    path: '/services/hire-purchase',
    element: <HirePurchase />,
  },
  // Our Affiliates
  {
    path: '/affiliates/members',
    element: <AffiliateMembers />,
  },
  {
    path: '/affiliates/merchants',
    element: <AffiliateMerchants />,
  },
  {
    path: '/affiliates/distributors',
    element: <AffiliateDistributors />,
  },
  {
    path: '/affiliate-dashboard',
    element: <AffiliateDashboard />,
  },
  // About section
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/about/contact',
    element: <Contact />,
  },
  {
    path: '/about/projects',
    element: <Projects />,
  },
  {
    path: '/about/partners',
    element: <Partners />,
  },
  {
    path: '/about/news',
    element: <News />,
  },
  {
    path: '/about/association-members',
    element: <AssociationMembers />,
  },
  {
    path: '/about/changing-lives',
    element: <ChangingLives />,
  },
  {
    path: '/about/terms',
    element: <Terms />,
  },
  {
    path: '/about/privacy',
    element: <Privacy />,
  },
  // Job Center Portal
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetail />,
  },
  {
    path: '/job-center',
    element: <JobCenter />,
  },
  {
    path: '/job-dashboard/employee',
    element: <EmployeeDashboard />,
  },
  {
    path: '/job-dashboard/employer',
    element: <EmployerDashboard />,
  },
  // Project Requests
  {
    path: '/project-requests',
    element: <ProjectRequests />,
  },
  // FAQ
  {
    path: '/faq',
    element: <FAQ />,
  },
  // Other pages
  {
    path: '/competitions',
    element: <Competitions />,
  },
  {
    path: '/agents',
    element: <Agents />,
  },
  {
    path: '/membership-payment',
    element: <MembershipPayment />,
  },
  {
    path: '/activate-card',
    element: <ActivateCard />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/agents',
    element: <AgentPanel />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
