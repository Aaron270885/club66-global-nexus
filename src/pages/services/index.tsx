
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  DollarSign, 
  ShoppingCart, 
  PiggyBank,
  Shield,
  AlertTriangle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Credit Account',
      description: 'Access flexible credit solutions for your financial needs',
      icon: CreditCard,
      path: '/services/credit-account',
      color: 'bg-blue-500'
    },
    {
      title: 'Credit System',
      description: 'Comprehensive credit management and tracking system',
      icon: DollarSign,
      path: '/services/credit-system',
      color: 'bg-green-500'
    },
    {
      title: 'Hire Purchase',
      description: 'Buy now, pay later with our hire purchase options',
      icon: ShoppingCart,
      path: '/services/hire-purchase',
      color: 'bg-purple-500'
    },
    {
      title: 'Payday Loan',
      description: 'Quick cash advances for your immediate needs',
      icon: PiggyBank,
      path: '/services/payday-loan',
      color: 'bg-orange-500'
    },
    {
      title: 'Ô Secours',
      description: 'Emergency assistance through token-based subscriptions',
      icon: AlertTriangle,
      path: '/services/o-secours',
      color: 'bg-red-500'
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Club66 Financial Services"
        description="Comprehensive financial solutions designed to meet your diverse needs"
        backgroundImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-gray-600">
                Explore our range of financial services designed to support your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to={service.path}>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Our financial experts are here to help you choose the right service for your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild size="lg">
                    <Link to="/about/contact">
                      Contact Our Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
