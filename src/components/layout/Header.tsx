
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, CreditCard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import CountrySelector from './CountrySelector';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'Our Cards (ZENIKA)', href: '/cards' },
    { title: 'Our App', href: '/app' },
    { title: 'Discounts', href: '/discounts' },
    { title: 'Services & Products', href: '/services' },
    { title: 'Job Center Portal', href: '/job-center' },
    { title: 'FAQ', href: '/faq' },
  ];

  const affiliateItems = [
    { title: 'Members', href: '/affiliates/members' },
    { title: 'Merchants', href: '/affiliates/merchants' },
    { title: 'Distributors', href: '/affiliates/distributors' },
  ];

  const aboutItems = [
    { title: 'Who is behind C66?', href: '/about' },
    { title: 'Changing Lives!', href: '/about/changing-lives' },
    { title: 'Association Members', href: '/about/association-members' },
    { title: 'Partners & Endorsements', href: '/about/partners' },
    { title: 'Projects', href: '/about/projects' },
    { title: 'News & Press', href: '/about/news' },
    { title: 'Contact Us', href: '/about/contact' },
    { title: 'Terms of Use', href: '/about/terms' },
    { title: 'Privacy Policy', href: '/about/privacy' },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-club66-purple text-white px-3 py-1 rounded-md font-bold text-xl">
              66
            </div>
            <span className="font-bold text-xl text-gray-900">Club66 Global</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/cards" className="text-gray-700 hover:text-club66-purple font-medium">
              Our Cards
            </Link>
            <Link to="/app" className="text-gray-700 hover:text-club66-purple font-medium">
              Our App
            </Link>
            <Link to="/discounts" className="text-gray-700 hover:text-club66-purple font-medium">
              Discounts
            </Link>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-club66-purple font-medium">
                Services <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/services">All Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/credit-system">Credit System</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/credit-account">Credit Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/payday-loan">Payday Loan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/hire-purchase">Hire Purchase</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Affiliates Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-club66-purple font-medium">
                Our Affiliates <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/affiliates/members">Members</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affiliates/merchants">Merchants</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/affiliates/distributors">Distributors</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-club66-purple font-medium">
                About <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/partners">Partners</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/news">News</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/association-members">Association Members</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/changing-lives">Changing Lives</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/jobs" className="text-gray-700 hover:text-club66-purple font-medium">
              Jobs
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-club66-purple font-medium">
              FAQ
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <CountrySelector />
            
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Account</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center">
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/cards" className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          My Cards
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline">
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-club66-purple hover:bg-club66-darkpurple">
                      <Link to="/register">Join Now</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/cards" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Cards
              </Link>
              <Link 
                to="/app" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our App
              </Link>
              <Link 
                to="/discounts" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Discounts
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/jobs" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-club66-purple font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-club66-purple font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/cards" 
                    className="text-gray-700 hover:text-club66-purple font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Cards
                  </Link>
                  <button 
                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                    className="text-left text-gray-700 hover:text-club66-purple font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-club66-purple hover:bg-club66-darkpurple" onClick={() => setIsMenuOpen(false)}>
                    <Link to="/register">Join Now</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
