
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, ChevronDown, User, Users, Bell, Settings, 
  LogOut, CreditCard, Home, CreditCard as CardIcon, 
  Smartphone, Percent, ShoppingBag, UsersRound, 
  Info, Briefcase, HelpCircle, Globe 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CountrySelector from './CountrySelector';
import { cn } from '@/lib/utils';

// For demo purposes, we'll simulate a logged-in user
const isLoggedIn = false; // Change to true to see the logged-in state
const user = {
  name: 'Ahmed Traore',
  email: 'ahmed.traore@example.com',
  membershipTier: 'Elite'
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for mobile menu dropdowns
  const [mobileDropdowns, setMobileDropdowns] = useState({
    services: false,
    affiliates: false,
    about: false,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdowns when closing mobile menu
    if (isMobileMenuOpen) {
      setMobileDropdowns({
        services: false,
        affiliates: false,
        about: false,
      });
    }
  };

  const toggleMobileDropdown = (dropdown: keyof typeof mobileDropdowns) => {
    setMobileDropdowns({
      ...mobileDropdowns,
      [dropdown]: !mobileDropdowns[dropdown],
    });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-club66-purple flex items-center">
            <span className="mr-2">Club66</span>
            <CountrySelector />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Cards */}
              <NavigationMenuItem>
                <Link to="/cards">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <CardIcon className="h-4 w-4 mr-1" />
                    Our Cards
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* App */}
              <NavigationMenuItem>
                <Link to="/app">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Smartphone className="h-4 w-4 mr-1" />
                    Our App
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Discounts */}
              <NavigationMenuItem>
                <Link to="/discounts">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Percent className="h-4 w-4 mr-1" />
                    Discounts
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Services & Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/services" className="block p-2 hover:bg-muted rounded-md">
                          All Services
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/services/credit" className="block p-2 hover:bg-muted rounded-md">
                          Credit Account
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/services/hire-purchase" className="block p-2 hover:bg-muted rounded-md">
                          Hire Purchase
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/services/payday-loan" className="block p-2 hover:bg-muted rounded-md">
                          Payday Loan
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Affiliates */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <UsersRound className="h-4 w-4 mr-1" />
                  Our Affiliates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/affiliates/members" className="block p-2 hover:bg-muted rounded-md">
                          Members
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/affiliates/merchants" className="block p-2 hover:bg-muted rounded-md">
                          Merchants
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/affiliates/distributors" className="block p-2 hover:bg-muted rounded-md">
                          Distributors
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Info className="h-4 w-4 mr-1" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 w-[400px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block p-2 hover:bg-muted rounded-md">
                          Who is behind C66?
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/changing-lives" className="block p-2 hover:bg-muted rounded-md">
                          Changing Lives!
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/association-members" className="block p-2 hover:bg-muted rounded-md">
                          Association Members
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/partners" className="block p-2 hover:bg-muted rounded-md">
                          Partners & Endorsements
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/projects" className="block p-2 hover:bg-muted rounded-md">
                          Projects
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/news" className="block p-2 hover:bg-muted rounded-md">
                          News & Press
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/terms" className="block p-2 hover:bg-muted rounded-md">
                          Terms of Use
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/privacy" className="block p-2 hover:bg-muted rounded-md">
                          Privacy Policy
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about/contact" className="block p-2 hover:bg-muted rounded-md">
                          Contact Us
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Jobs */}
              <NavigationMenuItem>
                <Link to="/jobs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Briefcase className="h-4 w-4 mr-1" />
                    Job Center
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* FAQ */}
              <NavigationMenuItem>
                <Link to="/faq">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <HelpCircle className="h-4 w-4 mr-1" />
                    FAQ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start">
                      <p className="font-medium">Welcome to Club66 Global</p>
                      <p className="text-xs text-gray-500">Your account has been activated</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start">
                      <p className="font-medium">Payment Received</p>
                      <p className="text-xs text-gray-500">Your membership fee has been processed</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center">
                      <Link to="/notifications" className="text-club66-purple text-sm">View all</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Card */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <CreditCard className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium">Your Membership Card</p>
                      <div className="mt-2 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs opacity-75">Club66 Global</p>
                          <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs font-bold">66</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-xs opacity-75">ID: C66-ML-21058</p>
                          <p className="text-xs opacity-75">Expires: 01/28</p>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="w-full cursor-pointer">View full card</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div className="h-8 w-8 rounded-full bg-club66-purple flex items-center justify-center text-white">
                        {user.name.charAt(0)}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <div className="mt-1 inline-flex items-center bg-club66-purple/10 text-club66-purple px-2 py-0.5 rounded-full text-xs">
                          {user.membershipTier} Member
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/affiliate-dashboard" className="cursor-pointer">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Affiliate Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" className="text-club66-purple border-club66-purple hover:bg-club66-purple/10" asChild>
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
                <Button className="bg-club66-purple hover:bg-club66-darkpurple" asChild>
                  <Link to="/register">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {isLoggedIn && (
                <div className="flex items-center p-2 mb-2 bg-gray-50 rounded-md">
                  <div className="h-10 w-10 rounded-full bg-club66-purple flex items-center justify-center text-white mr-3">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="inline-flex items-center bg-club66-purple/10 text-club66-purple px-2 py-0.5 rounded-full text-xs">
                      {user.membershipTier} Member
                    </div>
                  </div>
                </div>
              )}
              
              {isLoggedIn && (
                <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-club66-purple">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              )}
              
              <Link to="/" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              
              <Link to="/cards" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <CardIcon className="h-4 w-4 mr-2" />
                Our Cards
              </Link>
              
              <Link to="/app" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <Smartphone className="h-4 w-4 mr-2" />
                Our App
              </Link>
              
              <Link to="/discounts" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <Percent className="h-4 w-4 mr-2" />
                Discounts
              </Link>
              
              {/* Services Dropdown - Mobile */}
              <div>
                <button 
                  className="flex items-center justify-between w-full text-gray-700 py-1"
                  onClick={() => toggleMobileDropdown('services')}
                >
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span>Services & Products</span> 
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.services ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileDropdowns.services && (
                  <div className="pl-6 mt-1 space-y-2 border-l-2 border-gray-200">
                    <Link 
                      to="/services" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      All Services
                    </Link>
                    <Link 
                      to="/services/credit" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Credit Account
                    </Link>
                    <Link 
                      to="/services/hire-purchase" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Hire Purchase
                    </Link>
                    <Link 
                      to="/services/payday-loan" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Payday Loan
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Affiliates Dropdown - Mobile */}
              <div>
                <button 
                  className="flex items-center justify-between w-full text-gray-700 py-1"
                  onClick={() => toggleMobileDropdown('affiliates')}
                >
                  <div className="flex items-center">
                    <UsersRound className="h-4 w-4 mr-2" />
                    <span>Our Affiliates</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.affiliates ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileDropdowns.affiliates && (
                  <div className="pl-6 mt-1 space-y-2 border-l-2 border-gray-200">
                    <Link 
                      to="/affiliates/members" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Members
                    </Link>
                    <Link 
                      to="/affiliates/merchants" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Merchants
                    </Link>
                    <Link 
                      to="/affiliates/distributors" 
                      onClick={toggleMobileMenu}
                      className="block text-sm text-gray-700"
                    >
                      Distributors
                    </Link>
                  </div>
                )}
              </div>
              
              {/* About Dropdown - Mobile */}
              <div>
                <button 
                  className="flex items-center justify-between w-full text-gray-700 py-1"
                  onClick={() => toggleMobileDropdown('about')}
                >
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    <span>About</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdowns.about ? 'rotate-180' : ''}`} />
                </button>
                
                {mobileDropdowns.about && (
                  <div className="pl-6 mt-1 space-y-2 border-l-2 border-gray-200">
                    <Link to="/about" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Who is behind C66?
                    </Link>
                    <Link to="/about/changing-lives" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Changing Lives!
                    </Link>
                    <Link to="/about/association-members" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Association Members
                    </Link>
                    <Link to="/about/partners" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Partners & Endorsements
                    </Link>
                    <Link to="/about/projects" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Projects
                    </Link>
                    <Link to="/about/news" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      News & Press
                    </Link>
                    <Link to="/about/terms" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Terms of Use
                    </Link>
                    <Link to="/about/privacy" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Privacy Policy
                    </Link>
                    <Link to="/about/contact" onClick={toggleMobileMenu} className="block text-sm text-gray-700">
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/jobs" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <Briefcase className="h-4 w-4 mr-2" />
                Job Center
              </Link>
              
              <Link to="/faq" onClick={toggleMobileMenu} className="flex items-center text-gray-700 hover:text-club66-purple">
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </Link>
              
              {isLoggedIn && (
                <>
                  <Link to="/affiliate-dashboard" className="text-gray-700 hover:text-club66-purple flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Affiliate Dashboard
                  </Link>
                  <Link to="/settings" className="text-gray-700 hover:text-club66-purple flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <Button variant="outline" size="sm" className="flex items-center justify-center mt-2">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
            
            {/* Auth Buttons - Mobile */}
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" className="text-club66-purple border-club66-purple hover:bg-club66-purple/10" asChild>
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
                <Button className="bg-club66-purple hover:bg-club66-darkpurple" asChild>
                  <Link to="/register">
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
