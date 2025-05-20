
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import CountrySelector from './CountrySelector';

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
          <div className="hidden md:flex items-center space-x-2">
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

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
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
            </div>
            
            {/* Auth Buttons - Mobile */}
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
