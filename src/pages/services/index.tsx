
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, ShoppingCart, DollarSign, Users, Shield, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'credit',
      title: 'Credit Account',
      description: 'Access instant credit for your purchases with flexible repayment options and competitive interest rates.',
      icon: CreditCard,
      features: ['Instant approval', 'Flexible terms', 'Low interest rates', 'Credit building'],
      startingRate: '2.5%',
      link: '/services/credit',
      color: 'purple',
      popular: true
    },
    {
      id: 'hire-purchase',
      title: 'Hire Purchase',
      description: 'Buy now, pay later with our hire purchase plans. Perfect for electronics, furniture, and more.',
      icon: ShoppingCart,
      features: ['No upfront payment', '3-24 month terms', 'Partner merchants', 'Easy approval'],
      startingRate: '3.0%',
      link: '/services/hire-purchase',
      color: 'blue',
      popular: false
    },
    {
      id: 'payday-loan',
      title: 'Payday Loan',
      description: 'Quick cash advances for emergency expenses. Get money in your account within 30 minutes.',
      icon: DollarSign,
      features: ['30-minute approval', 'Emergency funds', 'No collateral', 'Quick disbursement'],
      startingRate: '5.0%',
      link: '/services/payday-loan',
      color: 'green',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Tailored financial solutions based on your membership tier and needs.'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Bank-level security with 256-bit encryption and fraud protection.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Quick approvals and fast disbursement for all financial services.'
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Financial Services"
        description="Comprehensive financial solutions designed to meet your needs and help you achieve your goals."
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Link to="/register">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
          <Link to="/about/contact">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Speak to Advisor
            </Button>
          </Link>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {services.map((service) => {
                const IconComponent = service.icon;
                const colorClasses = {
                  purple: 'from-purple-500 to-purple-700',
                  blue: 'from-blue-500 to-blue-700',
                  green: 'from-green-500 to-green-700'
                };

                return (
                  <Card key={service.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500">
                        Most Popular
                      </Badge>
                    )}
                    
                    <CardHeader>
                      <div className={`bg-gradient-to-br ${colorClasses[service.color]} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="text-center">
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      
                      <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-green-600">
                          From {service.startingRate}
                        </div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>

                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Link to={service.link} className="w-full">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose Our Financial Services?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We're committed to providing accessible, secure, and efficient financial solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                      <benefit.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Section */}
            <Card className="mb-16">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">General Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Active Club66 Global membership</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Valid government-issued ID</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Proof of income or employment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Minimum age of 18 years</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Additional Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Higher limits for Premium members</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Lower interest rates for VIP members</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Priority processing for all tiers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Dedicated customer support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join thousands of satisfied customers who trust Club66 Global for their financial needs.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                        Apply Now
                      </Button>
                    </Link>
                    <Link to="/about/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
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
