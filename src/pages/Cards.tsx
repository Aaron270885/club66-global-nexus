
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cards = () => {
  const cardTiers = [
    {
      id: 'essential',
      name: 'Essential',
      subtitle: 'ZENIKA Essential Card',
      price: '10,000',
      monthly: '2,500',
      color: 'from-blue-500 to-blue-700',
      icon: <Check className="h-6 w-6" />,
      popular: false,
      features: [
        '5% discount at partner merchants',
        'Basic customer support',
        'Digital membership card',
        'Access to competitions',
        'Monthly newsletter',
        'Valid for 1 year (renewable)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: 'ZENIKA Premium Card',
      price: '25,000',
      monthly: '5,000',
      color: 'from-purple-500 to-purple-700',
      icon: <Star className="h-6 w-6" />,
      popular: true,
      features: [
        '10% discount at partner merchants',
        'Priority customer support',
        'Digital + Physical membership card',
        'Priority access to competitions',
        'Exclusive member events',
        'Job portal access',
        'Affiliate program eligibility',
        'Valid for 1 year (renewable)'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      subtitle: 'ZENIKA Elite Card',
      price: '50,000',
      monthly: '10,000',
      color: 'from-yellow-500 to-yellow-700',
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      features: [
        '20% discount at partner merchants',
        'VIP customer support',
        'Premium physical card with NFC',
        'Exclusive competitions access',
        'VIP member events',
        'Premium job portal features',
        'Advanced affiliate benefits',
        'Personal account manager',
        'Airport lounge access',
        'Valid for 1 year (renewable)'
      ]
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="ZENIKA Membership Cards"
        description="Choose your membership tier and unlock exclusive benefits. All cards are valid for 1 year and renewable."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Gem className="h-8 w-8 text-purple-600 mr-2" />
              <h1 className="text-4xl font-bold text-gray-900">ZENIKA Cards</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium membership cards designed for the African market. Each tier offers unique benefits 
              and exclusive access to our growing network of partners and services.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              All memberships are valid for 1 year from activation date and can be renewed annually.
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cardTiers.map((tier) => (
              <Card 
                key={tier.id}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  tier.popular ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`bg-gradient-to-br ${tier.color} text-white ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {tier.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                    <p className="text-sm opacity-90">{tier.subtitle}</p>
                    <div className="mt-4">
                      <div className="text-3xl font-bold">CFA {tier.price}</div>
                      <div className="text-sm opacity-90">+ CFA {tier.monthly}/month</div>
                      <div className="text-xs opacity-75 mt-1">Valid for 1 year</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white`}
                  >
                    <Link to={`/membership-payment?plan=${tier.id}`}>
                      Get {tier.name} Card
                    </Link>
                  </Button>

                  <div className="mt-3 text-center">
                    <Link 
                      to="/about/terms" 
                      className="text-xs text-gray-500 hover:text-gray-700 underline"
                    >
                      Terms & Conditions Apply
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">1 Year</div>
                <p className="text-sm text-gray-600">Membership Duration</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-sm text-gray-600">Partner Merchants</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-sm text-gray-600">Customer Support</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">Satisfaction Guarantee</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you select the perfect membership tier for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/about/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
