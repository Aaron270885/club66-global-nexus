
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Percent, 
  Store, 
  Star,
  Home,
  DollarSign,
  Plane,
  Hotel,
  Shirt,
  Sparkles,
  Car,
  Footprints,
  Bike,
  Smartphone,
  Monitor,
  Sofa,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const discountSectors = [
    { name: 'Real Estate Services', icon: Home, color: 'bg-blue-500' },
    { name: 'Financial Services', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Travel Agencies', icon: Plane, color: 'bg-purple-500' },
    { name: 'Hotels and Accommodation', icon: Hotel, color: 'bg-orange-500' },
    { name: 'Textiles', icon: Shirt, color: 'bg-pink-500' },
    { name: 'Clothing', icon: Shirt, color: 'bg-indigo-500' },
    { name: 'Cosmetics and Beauty Spots', icon: Sparkles, color: 'bg-rose-500' },
    { name: 'Cars', icon: Car, color: 'bg-red-500' },
    { name: 'Footwears', icon: Footprints, color: 'bg-yellow-500' },
    { name: 'Motorbikes', icon: Bike, color: 'bg-gray-500' },
    { name: 'Mobile Phones', icon: Smartphone, color: 'bg-blue-600' },
    { name: 'Electronic Equipments', icon: Monitor, color: 'bg-cyan-500' },
    { name: 'Furniture', icon: Sofa, color: 'bg-amber-500' },
    { name: 'Other Services', icon: MoreHorizontal, color: 'bg-slate-500' }
  ];

  const sampleDiscounts = [
    {
      id: 1,
      merchant: 'TechMart Electronics',
      sector: 'Electronic Equipments',
      discount: '25%',
      description: 'Latest smartphones, laptops, and accessories',
      location: 'Bamako, Mali',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      merchant: 'Fashion Forward',
      sector: 'Clothing',
      discount: '30%',
      description: 'Trendy clothing for men and women',
      location: 'Dakar, Senegal',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      merchant: 'BeautyGlow Spa',
      sector: 'Cosmetics and Beauty Spots',
      discount: '40%',
      description: 'Premium beauty treatments and cosmetics',
      location: 'Abidjan, Ivory Coast',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      merchant: 'AutoDeals Mali',
      sector: 'Cars',
      discount: '15%',
      description: 'New and used cars, financing available',
      location: 'Bamako, Mali',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      merchant: 'Paradise Hotels',
      sector: 'Hotels and Accommodation',
      discount: '35%',
      description: 'Luxury hotels and resorts across Africa',
      location: 'Multiple Locations',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 6,
      merchant: 'Home Comfort',
      sector: 'Furniture',
      discount: '20%',
      description: 'Quality furniture for your home and office',
      location: 'Ouagadougou, Burkina Faso',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const filteredDiscounts = sampleDiscounts.filter(discount => {
    const matchesSearch = discount.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || discount.sector === selectedSector;
    const matchesLocation = !selectedLocation || discount.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesSector && matchesLocation;
  });

  return (
    <Layout>
      <PremiumBanner
        title="Exclusive Member Discounts"
        description="Unlock amazing savings with your Club66 membership across thousands of partner merchants"
        backgroundImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search merchants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sectors</SelectItem>
                      {discountSectors.map((sector, index) => (
                        <SelectItem key={index} value={sector.name}>{sector.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Location..."
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount Sectors */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Discount Sectors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {discountSectors.map((sector, index) => {
                  const Icon = sector.icon;
                  return (
                    <Card 
                      key={index} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedSector(sector.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 ${sector.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm">{sector.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Featured Discounts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">
                {filteredDiscounts.length} Discount{filteredDiscounts.length !== 1 ? 's' : ''} Available
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiscounts.map((discount) => (
                <Card key={discount.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={discount.image} 
                      alt={discount.merchant}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white text-lg font-bold">
                        {discount.discount} OFF
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{discount.merchant}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{discount.rating}</span>
                      </div>
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <Store className="h-4 w-4 mr-1" />
                      {discount.sector}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{discount.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {discount.location}
                      </div>
                      <div className="flex items-center text-lg font-bold text-green-600">
                        <Percent className="h-5 w-5 mr-1" />
                        {discount.discount}
                      </div>
                    </div>
                    <Button className="w-full">
                      Claim Discount
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDiscounts.length === 0 && (
              <div className="text-center py-12">
                <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No discounts found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold mb-4">Unlock More Discounts</h2>
                  <p className="text-xl mb-8 opacity-90">
                    Upgrade your membership to access even more exclusive discounts and benefits
                  </p>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Upgrade Membership
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

export default Discounts;
