import { lazy } from 'react';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Pricing from '@/pages/Pricing';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import Services from '@/pages/services';
import CreditAccount from '@/pages/services/CreditAccount';
import CreditSystem from '@/pages/services/CreditSystem';
import HirePurchase from '@/pages/services/HirePurchase';
import PaydayLoan from '@/pages/services/PaydayLoan';
import MembershipPayment from '@/pages/MembershipPayment';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import JobDashboardEmployee from '@/pages/job-dashboard/employee';
import JobDashboardEmployer from '@/pages/job-dashboard/employer';
import AffiliateDashboard from '@/pages/affiliate-dashboard';
import Debug from '@/pages/Debug';

import OSecours from '@/pages/services/OSecours';

// Add the new route to the existing routes array
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/about/contact',
    element: <Contact />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/services',
    element: <Services />,
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
    path: '/services/hire-purchase',
    element: <HirePurchase />,
  },
  {
    path: '/services/payday-loan',
    element: <PaydayLoan />,
  },
  {
    path: '/membership-payment',
    element: <MembershipPayment />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/job-dashboard/employee',
    element: <JobDashboardEmployee />,
  },
  {
    path: '/job-dashboard/employer',
    element: <JobDashboardEmployer />,
  },
  {
    path: '/affiliate-dashboard',
    element: <AffiliateDashboard />,
  },
  {
    path: '/debug',
    element: <Debug />,
  },
  {
    path: '/services/o-secours',
    element: <OSecours />,
  },
];

export default routes;
