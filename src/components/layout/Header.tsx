
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, Users, Bell, Settings, LogOut, CreditCard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CountrySelector from './CountrySelector';

// For demo purposes, we'll simulate a logged-in user
const isLoggedIn = false; // Change to true to see the logged-in state
const user = {
  name: 'Ahmed Traore',
  email: 'ahmed.traore@example.com',
  membershipTier: 'Elite'
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAffiliatesOpen, setIsAffiliatesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdowns when closing mobile menu
    if (isMobileMenuOpen) {
      setIsServicesOpen(false);
      setIsAffiliatesOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-club66-purple">
            Club66 Global
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Link to="/cards" className="text-gray-700 hover:text-club66-purple">Cards</Link>
            <Link to="/app" className="text-gray-700 hover:text-club66-purple">App</Link>
            <Link to="/discounts" className="text-gray-700 hover:text-club66-purple">Discounts</Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-club66-purple"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link 
                      to="/services" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      All Services
                    </Link>
                    <Link 
                      to="/services/credit" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Credit Account
                    </Link>
                    <Link 
                      to="/services/hire-purchase" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Hire Purchase
                    </Link>
                    <Link 
                      to="/services/payday-loan" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Payday Loan
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Affiliates Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-club66-purple"
                onClick={() => setIsAffiliatesOpen(!isAffiliatesOpen)}
              >
                Affiliates <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isAffiliatesOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link 
                      to="/affiliates/members" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAffiliatesOpen(false)}
                    >
                      Members
                    </Link>
                    <Link 
                      to="/affiliates/merchants" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAffiliatesOpen(false)}
                    >
                      Merchants
                    </Link>
                    <Link 
                      to="/affiliates/distributors" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAffiliatesOpen(false)}
                    >
                      Distributors
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/about" className="text-gray-700 hover:text-club66-purple">About</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-club66-purple">Jobs</Link>
            <Link to="/faq" className="text-gray-700 hover:text-club66-purple">FAQ</Link>
            <CountrySelector />
          </nav>

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
              
              <Link to="/cards" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">Cards</Link>
              <Link to="/app" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">App</Link>
              <Link to="/discounts" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">Discounts</Link>
              
              {/* Services Dropdown - Mobile */}
              <div>
                <button 
                  className="flex items-center justify-between w-full text-gray-700 py-1"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span>Services</span> 
                  <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="pl-4 mt-1 space-y-2 border-l-2 border-gray-200">
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
                  onClick={() => setIsAffiliatesOpen(!isAffiliatesOpen)}
                >
                  <span>Affiliates</span> 
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAffiliatesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAffiliatesOpen && (
                  <div className="pl-4 mt-1 space-y-2 border-l-2 border-gray-200">
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
              
              <Link to="/about" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">About</Link>
              <Link to="/jobs" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">Jobs</Link>
              <Link to="/faq" onClick={toggleMobileMenu} className="text-gray-700 hover:text-club66-purple">FAQ</Link>
              <CountrySelector />
              
              {isLoggedIn && (
                <>
                  <Link to="/affiliate-dashboard" className="text-gray-700 hover:text-club66-purple">
                    <Users className="h-4 w-4 mr-2 inline" />
                    Affiliate Dashboard
                  </Link>
                  <Link to="/settings" className="text-gray-700 hover:text-club66-purple">
                    <Settings className="h-4 w-4 mr-2 inline" />
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
