
import { lazy } from 'react';

import Home from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/about/Contact';
import Terms from '@/pages/about/Terms';
import Privacy from '@/pages/about/Privacy';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Services from '@/pages/services/index';
import CreditAccount from '@/pages/services/CreditAccount';
import CreditSystem from '@/pages/services/CreditSystem';
import HirePurchase from '@/pages/services/HirePurchase';
import PaydayLoan from '@/pages/services/PaydayLoan';
import MembershipPayment from '@/pages/MembershipPayment';
import Dashboard from '@/pages/Dashboard';
import JobDashboardEmployee from '@/pages/job-dashboard/EmployeeDashboard';
import JobDashboardEmployer from '@/pages/job-dashboard/EmployerDashboard';
import AffiliateDashboard from '@/pages/AffiliateDashboard';
import Debug from '@/pages/Debug';
import Jobs from '@/pages/Jobs';
import JobCenter from '@/pages/JobCenter';
import Discounts from '@/pages/Discounts';
import Competitions from '@/pages/Competitions';
import Affiliates from '@/pages/Affiliates';
import AffiliateProgram from '@/pages/AffiliateProgram';
import AffiliateMembers from '@/pages/affiliates/Members';
import AffiliateMerchants from '@/pages/affiliates/Merchants';
import AffiliateDistributors from '@/pages/affiliates/Distributors';

import OSecours from '@/pages/services/OSecours';
import PaydayAdvance from '@/pages/services/PaydayAdvance';
import Cards from '@/pages/Cards';

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
    path: '/services/o-secours',
    element: <OSecours />,
  },
  {
    path: '/services/payday-advance',
    element: <PaydayAdvance />,
  },
  {
    path: '/membership-payment',
    element: <MembershipPayment />,
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
    path: '/cards',
    element: <Cards />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/job-center',
    element: <JobCenter />,
  },
  {
    path: '/discounts',
    element: <Discounts />,
  },
  {
    path: '/competitions',
    element: <Competitions />,
  },
  {
    path: '/affiliates',
    element: <Affiliates />,
  },
  {
    path: '/affiliate-program',
    element: <AffiliateProgram />,
  },
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
];

export default routes;
