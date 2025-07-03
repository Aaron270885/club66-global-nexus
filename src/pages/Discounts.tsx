
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Store, Percent, Star } from 'lucide-react';

const Discounts = () => {
  const sectors = [
    "Real Estate Services",
    "Financial Services", 
    "Travel Agencies",
    "Hotels and Accommodation",
    "Textiles",
    "Clothing",
    "Cosmetics and Beauty Spots",
    "Cars",
    "Footwears",
    "Motorbikes",
    "Mobile Phones",
    "Electronic Equipment",
    "Furniture",
    "Other Services"
  ];

  const featuredDiscounts = [
    {
      merchant: "African Fashion House",
      sector: "Clothing",
      discount: "20%",
      location: "Dakar, Senegal",
      description: "Premium African fashion and traditional wear",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8
    },
    {
      merchant: "TechHub Electronics",
      sector: "Electronic Equipment",
      discount: "15%",
      location: "Lagos, Nigeria",
      description: "Latest electronics and gadgets",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6
    },
    {
      merchant: "Sahara Beauty Spa",
      sector: "Cosmetics and Beauty Spots",
      discount: "25%",
      location: "Accra, Ghana",
      description: "Premium beauty treatments and cosmetics",
      image: "https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9
    },
    {
      merchant: "Luxury Hotels Africa",
      sector: "Hotels and Accommodation",
      discount: "30%",
      location: "Nairobi, Kenya",
      description: "Premium accommodation across Africa",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7
    },
    {
      merchant: "African Motors",
      sector: "Cars",
      discount: "12%",
      location: "Abidjan, Ivory Coast",
      description: "Quality vehicles and automotive services",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5
    },
    {
      merchant: "Continental Furniture",
      sector: "Furniture",
      discount: "18%",
      location: "Bamako, Mali",
      description: "Modern and traditional African furniture",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.4
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Member Discounts"
        description="Unlock exclusive savings across Africa with Club66 Global membership benefits"
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filter Section */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search merchants..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="senegal">Senegal</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="ivory-coast">Ivory Coast</SelectItem>
                      <SelectItem value="mali">Mali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Partner Merchants</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                <div className="text-gray-600">African Countries</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">5-30%</div>
                <div className="text-gray-600">Average Savings</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">2M+</div>
                <div className="text-gray-600">Happy Members</div>
              </Card>
            </div>

            {/* Sectors Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Discount Sectors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {sectors.map((sector, index) => (
                  <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Store className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-tight">{sector}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Discounts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Featured Discounts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDiscounts.map((discount, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={discount.image} 
                        alt={discount.merchant}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                          {discount.discount} OFF
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{discount.merchant}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{discount.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-3">{discount.sector}</Badge>
                      <p className="text-gray-600 mb-4">{discount.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {discount.location}
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Percent className="h-4 w-4 mr-2" />
                        Claim Discount
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Start Saving Today!</h2>
                <p className="text-xl mb-8 opacity-90">
                  Join millions of Club66 Global members and unlock exclusive discounts across Africa
                </p>
                <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
                  Become a Member
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
