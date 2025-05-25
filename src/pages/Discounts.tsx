
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, MapPin, Clock, Star, Search, Filter, Tag, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const discounts = [
    {
      id: 1,
      merchant: 'TechWorld Electronics',
      category: 'Electronics',
      discount: '25%',
      description: 'Get 25% off on all smartphones, laptops, and accessories',
      location: 'Bamako Centre',
      rating: 4.8,
      image: '/placeholder.svg',
      validUntil: '2024-12-31',
      featured: true
    },
    {
      id: 2,
      merchant: 'Fashion Hub',
      category: 'Fashion',
      discount: '30%',
      description: 'Latest fashion trends with exclusive member discounts',
      location: 'Hippodrome',
      rating: 4.6,
      image: '/placeholder.svg',
      validUntil: '2024-11-30',
      featured: false
    },
    {
      id: 3,
      merchant: 'Golden Restaurant',
      category: 'Dining',
      discount: '20%',
      description: 'Fine dining experience with authentic African cuisine',
      location: 'ACI 2000',
      rating: 4.9,
      image: '/placeholder.svg',
      validUntil: '2024-12-15',
      featured: true
    },
    {
      id: 4,
      merchant: 'FitLife Gym',
      category: 'Health & Fitness',
      discount: '40%',
      description: 'Premium gym membership with personal training included',
      location: 'Badalabougou',
      rating: 4.7,
      image: '/placeholder.svg',
      validUntil: '2025-01-31',
      featured: false
    },
    {
      id: 5,
      merchant: 'BookStore Plus',
      category: 'Education',
      discount: '15%',
      description: 'Wide selection of books, stationery, and educational materials',
      location: 'Magnambougou',
      rating: 4.5,
      image: '/placeholder.svg',
      validUntil: '2024-12-31',
      featured: false
    },
    {
      id: 6,
      merchant: 'AutoCare Service',
      category: 'Automotive',
      discount: '35%',
      description: 'Professional car maintenance and repair services',
      location: 'Sogoniko',
      rating: 4.8,
      image: '/placeholder.svg',
      validUntil: '2024-11-25',
      featured: true
    }
  ];

  const categories = [...new Set(discounts.map(d => d.category))];
  const locations = [...new Set(discounts.map(d => d.location))];

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || discount.category === selectedCategory;
    const matchesLocation = !selectedLocation || discount.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <PremiumBanner
        title="Exclusive Member Discounts"
        description="Discover amazing deals and discounts from our partner merchants across Mali."
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search for merchants, categories, or deals..." 
            className="pl-10 h-12 text-black bg-white/95 border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="absolute right-1 top-1 bottom-1 px-6">
            Search
          </Button>
        </div>
      </PremiumBanner>

      <div className="py-12 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedLocation('');
                  setSearchTerm('');
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {/* Results Count */}
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Showing {filteredDiscounts.length} exclusive deals</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Percent className="h-4 w-4 mr-1" />
                  <span>Save up to 40% with Club66</span>
                </div>
              </div>
            </div>

            {/* Featured Deals */}
            {filteredDiscounts.some(d => d.featured) && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Featured Deals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDiscounts.filter(d => d.featured).map(discount => (
                    <Card key={discount.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-yellow-200">
                      <div className="relative">
                        <img 
                          src={discount.image} 
                          alt={discount.merchant}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-lg px-3 py-1">
                          {discount.discount} OFF
                        </Badge>
                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                          FEATURED
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{discount.merchant}</CardTitle>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="mr-2">{discount.category}</Badge>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                {discount.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">{discount.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {discount.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Valid until {new Date(discount.validUntil).toLocaleDateString()}
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button className="w-full">
                          <Tag className="h-4 w-4 mr-2" />
                          Claim Discount
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Deals */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Available Deals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiscounts.filter(d => !d.featured).map(discount => (
                  <Card key={discount.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={discount.image} 
                        alt={discount.merchant}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white text-lg px-3 py-1">
                        {discount.discount} OFF
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{discount.merchant}</CardTitle>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="mr-2">{discount.category}</Badge>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              {discount.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{discount.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {discount.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Valid until {new Date(discount.validUntil).toLocaleDateString()}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        <Tag className="h-4 w-4 mr-2" />
                        Claim Discount
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {filteredDiscounts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No deals found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters to find available discounts.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedLocation('');
                    setSearchTerm('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-12">
                  <ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4">Want to Partner With Us?</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join our growing network of merchants and reach thousands of Club66 members.
                  </p>
                  <Link to="/affiliates/merchants">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                      Become a Partner
                    </Button>
                  </Link>
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
