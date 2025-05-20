
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import CountrySelector from './CountrySelector';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Our Cards', path: '/cards' },
    { name: 'Our App', path: '/app' },
    { name: 'Discounts', path: '/discounts' },
    { 
      name: 'Services & Products', 
      path: '#',
      dropdown: [
        { name: 'Credit Account', path: '/services/credit' },
        { name: 'Hire Purchase', path: '/services/hire-purchase' },
        { name: 'Payday Loan', path: '/services/payday-loan' },
      ] 
    },
    { 
      name: 'Our Affiliates', 
      path: '#',
      dropdown: [
        { name: 'Members', path: '/affiliates/members' },
        { name: 'Merchants', path: '/affiliates/merchants' },
        { name: 'Distributors', path: '/affiliates/distributors' },
      ] 
    },
    { name: 'About', path: '/about' },
    { name: 'Job Center', path: '/jobs' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-club66-purple">
              Club<span className="text-club66-gold">66</span> Global
            </span>
          </Link>

          {/* Country Selector - Desktop */}
          <div className="hidden md:flex items-center ml-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600"
              onClick={() => setShowCountrySelector(!showCountrySelector)}
            >
              <Globe className="h-4 w-4" />
              <span>Mali</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {showCountrySelector && (
              <div className="absolute mt-2 bg-white shadow-md rounded-md p-2" style={{ top: '60px', right: '20px' }}>
                <CountrySelector onClose={() => setShowCountrySelector(false)} />
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => 
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      {item.name} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {item.dropdown.map((dropdownItem) => (
                      <DropdownMenuItem key={dropdownItem.name} asChild>
                        <Link to={dropdownItem.path}>{dropdownItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild key={item.name} variant="ghost" size="sm">
                  <Link to={item.path}>{item.name}</Link>
                </Button>
              )
            )}
            <Button asChild size="sm" className="bg-club66-purple hover:bg-club66-darkpurple ml-2">
              <Link to="/register">Join Now</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-club66-purple text-club66-purple hover:bg-club66-purple/10">
              <Link to="/login">Login</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-club66-purple"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => 
                item.dropdown ? (
                  <div key={item.name} className="flex flex-col">
                    <Button variant="ghost" className="justify-start">
                      {item.name}
                    </Button>
                    <div className="pl-4">
                      {item.dropdown.map((dropdownItem) => (
                        <Button 
                          key={dropdownItem.name} 
                          variant="ghost" 
                          size="sm" 
                          className="justify-start"
                          asChild
                        >
                          <Link to={dropdownItem.path}>{dropdownItem.name}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </Button>
                )
              )}
            </div>
            <div className="mt-4 flex flex-col space-y-2">
              <Button asChild className="bg-club66-purple hover:bg-club66-darkpurple">
                <Link to="/register">Join Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-club66-purple text-club66-purple hover:bg-club66-purple/10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <div className="mt-4 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-600"
                onClick={() => setShowCountrySelector(!showCountrySelector)}
              >
                <Globe className="h-4 w-4" />
                <span>Mali</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              {showCountrySelector && (
                <div className="absolute mt-2 bg-white shadow-md rounded-md p-2">
                  <CountrySelector onClose={() => setShowCountrySelector(false)} />
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
