
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, ShoppingBag, Percent, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Discounts = () => {
  const discounts = [
    {
      id: 1,
      merchant: 'TechHub Electronics',
      discount: '25% OFF',
      category: 'Electronics',
      description: 'Get 25% off on all smartphones, laptops, and accessories',
      validUntil: '2024-02-29',
      location: 'Bamako, Mali',
      rating: 4.8,
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      merchant: 'Fashion Central',
      discount: '30% OFF',
      category: 'Fashion',
      description: 'Exclusive discount on designer clothing and accessories',
      validUntil: '2024-02-15',
      location: 'Dakar, Senegal',
      rating: 4.6,
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 3,
      merchant: 'Gourmet Restaurant',
      discount: '20% OFF',
      category: 'Food & Dining',
      description: 'Enjoy premium dining experience with exclusive member discount',
      validUntil: '2024-03-10',
      location: 'Abidjan, Côte d\'Ivoire',
      rating: 4.9,
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 4,
      merchant: 'AutoCare Services',
      discount: '15% OFF',
      category: 'Automotive',
      description: 'Professional car maintenance and repair services',
      validUntil: '2024-02-20',
      location: 'Accra, Ghana',
      rating: 4.5,
      image: '/placeholder.svg',
      featured: false
    }
  ];

  const categories = ['All', 'Electronics', 'Fashion', 'Food & Dining', 'Automotive', 'Healthcare', 'Travel'];

  return (
    <Layout>
      <PremiumBanner
        title="Exclusive Member Discounts"
        description="Unlock amazing savings with your Club66 membership. Enjoy exclusive discounts from top merchants across Africa."
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Link to="/register">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Join Club66
            </Button>
          </Link>
          <Link to="/cards">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Get Your Card
            </Button>
          </Link>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Categories Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? 'default' : 'outline'}
                    className={category === 'All' ? '' : 'bg-white hover:bg-purple-50'}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">Partner Merchants</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">25%</div>
                  <div className="text-sm text-gray-600">Average Savings</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
                  <div className="text-sm text-gray-600">Cities Covered</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-orange-600 mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Happy Members</div>
                </CardContent>
              </Card>
            </div>

            {/* Discounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discounts.map((discount) => (
                <Card key={discount.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {discount.featured && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-medium">
                      <Gift className="h-4 w-4 inline mr-1" />
                      Featured Deal
                    </div>
                  )}
                  
                  <div className="relative">
                    <img 
                      src={discount.image} 
                      alt={discount.merchant}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white text-lg font-bold px-3 py-1">
                        <Percent className="h-4 w-4 mr-1" />
                        {discount.discount}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{discount.merchant}</CardTitle>
                        <Badge variant="outline" className="mt-1 bg-purple-50">
                          {discount.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {discount.rating}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4">{discount.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {discount.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Valid until {discount.validUntil}
                      </div>
                    </div>

                    <Button className="w-full">
                      Claim Discount
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-12">
                  <ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4">Want More Exclusive Deals?</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Upgrade to Premium or VIP membership for access to even better discounts and exclusive merchant partnerships.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                        Upgrade Membership
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

export default Discounts;
