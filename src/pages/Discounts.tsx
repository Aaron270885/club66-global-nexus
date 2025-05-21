
import { Percent, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Discounts = () => {
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
  
  const partnerCategories = [
    {
      name: "Retail Shops",
      count: 24,
      icon: ShoppingBag
    },
    {
      name: "Restaurants & Cafés",
      count: 18,
      icon: Tag
    },
    {
      name: "Health & Wellness",
      count: 12,
      icon: ShieldCheck
    }
  ];
  
  const featuredPartners = [
    {
      name: "Mali Shopping Center",
      discount: "Up to 15% off",
      category: "Retail",
      location: "Bamako, Mali"
    },
    {
      name: "Café Touareg",
      discount: "10% off all meals",
      category: "Restaurant",
      location: "Bamako, Mali"
    },
    {
      name: "Tech Haven",
      discount: "8% off electronics",
      category: "Electronics",
      location: "Bamako, Mali"
    },
    {
      name: "Wellness Spa",
      discount: "15% off treatments",
      category: "Health",
      location: "Bamako, Mali"
    },
    {
      name: "Fashion Hub",
      discount: "12% off clothing",
      category: "Retail",
      location: "Bamako, Mali"
    },
    {
      name: "Auto Service Plus",
      discount: "10% off services",
      category: "Automotive",
      location: "Bamako, Mali"
    }
  ];
  
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
            <h2 className="text-2xl font-bold mb-6 text-center">Partner Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {partnerCategories.map((category, index) => (
                <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                    <category.icon className="h-8 w-8 text-club66-purple" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} partners</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline">View All Partners</Button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Partner Offers</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Partners</TabsTrigger>
                <TabsTrigger value="retail">Retail</TabsTrigger>
                <TabsTrigger value="food">Food & Dining</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPartners.map((partner, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <Percent className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">{partner.discount}</span>
                        </div>
                        <p className="text-xs text-gray-500">{partner.location}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full text-sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="retail" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPartners.filter(p => p.category === "Retail").map((partner, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <Percent className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">{partner.discount}</span>
                        </div>
                        <p className="text-xs text-gray-500">{partner.location}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full text-sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="food" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPartners.filter(p => p.category === "Restaurant").map((partner, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <Badge variant="secondary">{partner.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-2">
                          <Percent className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">{partner.discount}</span>
                        </div>
                        <p className="text-xs text-gray-500">{partner.location}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full text-sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
