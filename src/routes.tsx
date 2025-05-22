
import { createBrowserRouter } from 'react-router-dom';
import App from '@/pages/App';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Dashboard from '@/pages/Dashboard';
import ActivateCard from '@/pages/ActivateCard';
import Cards from '@/pages/Cards';
import Discounts from '@/pages/Discounts';
import Jobs from '@/pages/Jobs';
import NotFound from '@/pages/NotFound';
import FAQ from '@/pages/FAQ';
import AffiliateDashboard from '@/pages/AffiliateDashboard';

// Services
import ServicesIndex from '@/pages/services/index';
import PaydayLoan from '@/pages/services/PaydayLoan';
import HirePurchase from '@/pages/services/HirePurchase';
import CreditAccount from '@/pages/services/CreditAccount';
import CreditSystem from '@/pages/services/CreditSystem';

// Affiliates
import Merchants from '@/pages/affiliates/Merchants';
import Members from '@/pages/affiliates/Members';
import Distributors from '@/pages/affiliates/Distributors';

// Admin
import AdminDashboard from '@/pages/admin/Dashboard';
import AgentPanel from '@/pages/admin/AgentPanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/about',
        element: <About />,
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
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/activate-card',
        element: <ActivateCard />,
      },
      {
        path: '/cards',
        element: <Cards />,
      },
      {
        path: '/discounts',
        element: <Discounts />,
      },
      {
        path: '/jobs',
        element: <Jobs />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      },
      {
        path: '/affiliate-dashboard',
        element: <AffiliateDashboard />,
      },
      {
        path: '/services',
        element: <ServicesIndex />,
      },
      {
        path: '/services/payday-loan',
        element: <PaydayLoan />,
      },
      {
        path: '/services/hire-purchase',
        element: <HirePurchase />,
      },
      {
        path: '/services/credit-account',
        element: <CreditAccount />,
      },
      {
        path: '/services/credit-system',
        element: <CreditSystem />,
      },
      {
        path: '/affiliates/merchants',
        element: <Merchants />,
      },
      {
        path: '/affiliates/members',
        element: <Members />,
      },
      {
        path: '/affiliates/distributors',
        element: <Distributors />,
      },
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/agents',
        element: <AgentPanel />,
      },
    ],
  },
]);

export default router;
