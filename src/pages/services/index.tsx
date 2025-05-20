
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CreditCard, ShoppingBag, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Credit Account',
      description: 'Shop now, pay later with the Club66 Global Credit Account. Flexible payment options at our network of partner businesses.',
      icon: CreditCard,
      link: '/services/credit'
    },
    {
      title: 'Hire Purchase',
      description: 'Acquire equipment, electronics, furniture, and vehicles with our flexible Hire Purchase program with competitive rates.',
      icon: ShoppingBag,
      link: '/services/hire-purchase'
    },
    {
      title: 'Payday Loan',
      description: 'Quick access to funds before your next paycheck with our competitive Payday Loan service for Club66 Global members.',
      icon: DollarSign,
      link: '/services/payday-loan'
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-gray-600">
              Club66 Global offers a range of financial services exclusively for our members.
              From credit accounts to payday loans, we've got you covered with flexible options to suit your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-club66-purple" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <Button asChild className="w-full mt-4 bg-club66-purple hover:bg-club66-darkpurple">
                    <Link to={service.link} className="flex items-center justify-center">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Need Financial Assistance?</h2>
                <p className="text-gray-600">
                  Club66 Global members have access to a range of financial services designed to help you manage your finances
                  and make large purchases more accessible. Explore our options and find the one that suits your needs.
                </p>
              </div>
              <div>
                <Button asChild className="bg-club66-purple hover:bg-club66-darkpurple">
                  <Link to="/register">
                    Become a Member
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Custom Solutions</h2>
            <p className="text-gray-600 mb-6">
              Need a financial solution not listed here? As a Club66 Global member, you can
              request custom financial assistance tailored to your specific needs.
            </p>
            <Button variant="outline" className="border-club66-purple text-club66-purple hover:bg-club66-purple/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
