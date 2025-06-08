
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, CreditCard, Smartphone, Percent, Briefcase, Users, Info, Globe, HelpCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Our Cards', href: '/cards', icon: CreditCard },
    { name: 'Our App', href: '/app', icon: Smartphone },
    { name: 'Discounts', href: '/discounts', icon: Percent },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Affiliates', href: '/affiliates/members', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              66
            </div>
            <span className="text-xl font-bold text-gray-900">Club66 Global</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="flex items-center ml-4 space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <select className="text-sm border-0 bg-transparent text-gray-700 focus:outline-none">
                <option>Global</option>
                <option>Mali</option>
                <option>RCI (Soon)</option>
                <option>Guinea (Soon)</option>
              </select>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/register">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center px-3 py-2">
                <Globe className="h-5 w-5 mr-3 text-gray-500" />
                <select className="text-base border-0 bg-transparent text-gray-700 focus:outline-none">
                  <option>Global</option>
                  <option>Mali</option>
                  <option>RCI (Soon)</option>
                  <option>Guinea (Soon)</option>
                </select>
              </div>
              
              <div className="px-3 space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                  <Link to="/register">Join Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
