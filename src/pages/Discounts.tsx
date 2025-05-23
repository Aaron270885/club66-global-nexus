
import { Percent, Tag, ShoppingBag, ShieldCheck, MapPin, HeartPulse, Utensils, Plane, GraduationCap } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Discounts = () => {
  const [selectedSector, setSelectedSector] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showMapView, setShowMapView] = useState(false);
  
  const membershipTiers = [
    {
      name: "Essential",
      discount: "5%",
      price: "CFA 10,000 per year + CFA 1,000 per month",
      color: "bg-gray-100"
    },
    {
      name: "Premium",
      discount: "10%",
      price: "CFA 10,000 per year + CFA 2,000 per month",
      color: "gold-gradient"
    },
    {
      name: "Elite",
      discount: "20%",
      price: "CFA 10,000 per year + CFA 5,000 per month",
      color: "card-gradient text-white"
    }
  ];
  
  const sectors = [
    { id: "retail", name: "Retail", icon: ShoppingBag },
    { id: "food", name: "Food & Dining", icon: Utensils },
    { id: "health", name: "Health & Wellness", icon: HeartPulse },
    { id: "travel", name: "Travel & Transport", icon: Plane },
    { id: "education", name: "Education", icon: GraduationCap }
  ];
  
  const locations = [
    { id: "bamako", name: "Bamako" },
    { id: "kayes", name: "Kayes" },
    { id: "sikasso", name: "Sikasso" },
    { id: "segou", name: "Segou" }
  ];
  
  const partnerCategories = [
    {
      name: "Retail Shops",
      count: 24,
      icon: ShoppingBag
    },
    {
      name: "Restaurants & Cafés",
      count: 18,
      icon: Utensils
    },
    {
      name: "Health & Wellness",
      count: 12,
      icon: HeartPulse
    },
    {
      name: "Travel & Transport",
      count: 9,
      icon: Plane
    },
    {
      name: "Education",
      count: 7,
      icon: GraduationCap
    }
  ];
  
  const featuredPartners = [
    {
      name: "Mali Shopping Center",
      discount: "Up to 15% off",
      category: "Retail",
      location: "Bamako, Mali",
      logo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=100&h=100",
      description: "The largest shopping center in Bamako with over 100 stores.",
      sectorId: "retail",
      locationId: "bamako"
    },
    {
      name: "Café Touareg",
      discount: "10% off all meals",
      category: "Restaurant",
      location: "Bamako, Mali",
      logo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Traditional Malian cuisine with a modern twist.",
      sectorId: "food",
      locationId: "bamako"
    },
    {
      name: "Tech Haven",
      discount: "8% off electronics",
      category: "Electronics",
      location: "Bamako, Mali",
      logo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Premium electronics and gadgets for tech enthusiasts.",
      sectorId: "retail",
      locationId: "bamako"
    },
    {
      name: "Wellness Spa",
      discount: "15% off treatments",
      category: "Health",
      location: "Sikasso, Mali",
      logo: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Luxury spa treatments and wellness services.",
      sectorId: "health",
      locationId: "sikasso"
    },
    {
      name: "Fashion Hub",
      discount: "12% off clothing",
      category: "Retail",
      location: "Kayes, Mali",
      logo: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Latest fashion trends from local and international designers.",
      sectorId: "retail",
      locationId: "kayes"
    },
    {
      name: "Auto Service Plus",
      discount: "10% off services",
      category: "Automotive",
      location: "Segou, Mali",
      logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Complete auto service and repair center.",
      sectorId: "travel",
      locationId: "segou"
    },
    {
      name: "University Bookstore",
      discount: "15% off textbooks",
      category: "Education",
      location: "Bamako, Mali",
      logo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Academic books, supplies and resources for students.",
      sectorId: "education",
      locationId: "bamako"
    },
    {
      name: "Healthy Living Pharmacy",
      discount: "8% off all medicines",
      category: "Health",
      location: "Bamako, Mali",
      logo: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=100&h=100",
      description: "Quality pharmaceutical products and healthcare advice.",
      sectorId: "health",
      locationId: "bamako"
    }
  ];

  const filteredPartners = featuredPartners.filter(partner => {
    if (selectedSector !== "all" && partner.sectorId !== selectedSector) return false;
    if (locationFilter !== "all" && partner.locationId !== locationFilter) return false;
    return true;
  });
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Member Discounts</h1>
          <p className="text-center text-gray-600 mb-8">
            Enjoy exclusive discounts at Club66 Global owned businesses and partner merchants across Mali.
          </p>
          
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Membership Tiers & Discounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier, index) => (
                <Card key={index} className="overflow-hidden border shadow hover:shadow-md transition-shadow">
                  <CardHeader className={`${tier.color}`}>
                    <CardTitle className="flex justify-between items-center">
                      <span>{tier.name}</span>
                      <Badge variant="secondary" className="text-lg">
                        {tier.discount}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 text-center">
                      {tier.discount} discount at all Club66 Global owned businesses
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t pt-4">
                    <p className="text-sm text-gray-500">{tier.price}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4">
              All members receive exclusive discounts at our partner businesses, regardless of membership tier.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-600 text-xl">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Show Your Card</h3>
                <p className="text-gray-600">Present your digital or physical membership card at any participating business.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-600 text-xl">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Verification</h3>
                <p className="text-gray-600">The merchant scans your card's QR code to verify your membership tier.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-purple-600 text-xl">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Enjoy Savings</h3>
                <p className="text-gray-600">Your discount is automatically applied to your purchase.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Partner Businesses by Sector</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {partnerCategories.map((category, index) => (
                <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                  <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <category.icon className="h-8 w-8 text-club66-purple" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">{category.name}</h3>
                  <p className="text-gray-600 text-center">{category.count} partners</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link to="/about/partners">View All Partners</Link>
              </Button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Partner Offers</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="md:flex justify-between items-center mb-6">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h3 className="text-lg font-medium mb-2">Filter Discounts</h3>
                  <p className="text-sm text-gray-500">Find the best discounts by sector and location</p>
                </div>
                <div className="md:w-1/2 flex justify-end">
                  <div className="flex items-center">
                    <Checkbox 
                      id="map-view" 
                      checked={showMapView}
                      onCheckedChange={(checked) => setShowMapView(!!checked)} 
                    />
                    <label htmlFor="map-view" className="ml-2 text-sm font-medium">
                      Map View (Coming Soon)
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Filter by Sector</h4>
                  <RadioGroup 
                    value={selectedSector}
                    onValueChange={setSelectedSector}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="sector-all" />
                      <label htmlFor="sector-all" className="text-sm">All Sectors</label>
                    </div>
                    {sectors.map((sector) => (
                      <div key={sector.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={sector.id} id={`sector-${sector.id}`} />
                        <label htmlFor={`sector-${sector.id}`} className="text-sm">{sector.name}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Filter by Location</h4>
                  <RadioGroup 
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="location-all" />
                      <label htmlFor="location-all" className="text-sm">All Locations</label>
                    </div>
                    {locations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={location.id} id={`location-${location.id}`} />
                        <label htmlFor={`location-${location.id}`} className="text-sm">{location.name}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            {showMapView ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center mb-8">
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Map view coming soon</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners.length > 0 ? (
                  filteredPartners.map((partner, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div className="flex">
                            <img 
                              src={partner.logo} 
                              alt={partner.name} 
                              className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <div>
                              <CardTitle className="text-lg">{partner.name}</CardTitle>
                              <Badge variant="secondary" className="mt-1">{partner.category}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex items-center mb-2">
                          <Percent className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">{partner.discount}</span>
                        </div>
                        <p className="text-sm mb-3">{partner.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{partner.location}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full text-sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No discounts found matching your filters.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSelectedSector("all");
                        setLocationFilter("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
