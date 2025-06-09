
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import CountrySelector from './CountrySelector';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'Our Cards', href: '/cards' },
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
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C66</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Club66 Global</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link 
                        to={item.href}
                        className="px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Affiliates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      {affiliateItems.map((item) => (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      {aboutItems.map((item) => (
                        <NavigationMenuLink asChild key={item.href}>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Country Selector and Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <CountrySelector />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/register">Join Club66</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-lg font-medium hover:text-purple-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900 mb-2">Our Affiliates</p>
                    {affiliateItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900 mb-2">About</p>
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <CountrySelector />
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {user ? (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="w-full" asChild>
                          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                        </Button>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                          <Link to="/register" onClick={() => setIsOpen(false)}>Join Club66</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
