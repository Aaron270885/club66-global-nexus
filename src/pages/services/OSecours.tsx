
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import SecoursSubscriptions from '@/components/secours/SecoursSubscriptions';
import TokenPurchase from '@/components/secours/TokenPurchase';
import RescueRequest from '@/components/secours/RescueRequest';
import SecoursStats from '@/components/secours/SecoursStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Coins, AlertTriangle, BarChart3, School, Bike, Phone, Car, Plus } from 'lucide-react';

const OSecours = () => {
  const [activeTab, setActiveTab] = useState('services');

  const secoursServices = [
    {
      id: 'school',
      title: 'School Fees',
      subtitle: 'Education Support',
      caption: 'Your Safety Net, Always Ready!',
      description: 'Emergency financial support for school fees and educational expenses',
      image: '/lovable-uploads/e0b192e3-08ff-4a1a-b992-4e1316700df7.png',
      icon: School,
      color: 'bg-blue-500'
    },
    {
      id: 'motorbike',
      title: 'Motorbikes',
      subtitle: 'Transportation Relief',
      caption: 'Quick Relief, Zero Stress!',
      description: 'Emergency assistance for motorbike repairs and maintenance',
      image: '/lovable-uploads/09b313a9-ea08-4b34-919c-23a479a101c2.png',
      icon: Bike,
      color: 'bg-orange-500'
    },
    {
      id: 'phone',
      title: 'Mobile Phones',
      subtitle: 'Communication Support',
      caption: 'Emergency Relief at Your Fingertips!',
      description: 'Urgent support for phone repairs and communication needs',
      image: '/lovable-uploads/9094ce70-83db-4543-98a3-75637c3a6a2e.png',
      icon: Phone,
      color: 'bg-green-500'
    },
    {
      id: 'auto',
      title: 'Auto Services',
      subtitle: 'Vehicle Emergency',
      caption: 'Get the Help You Need, When You Need It!',
      description: 'Emergency roadside assistance and vehicle repair support',
      image: '/lovable-uploads/c2e4b64b-3780-4e20-a92b-84db52090e1c.png',
      icon: Car,
      color: 'bg-red-500'
    },
    {
      id: 'first-aid',
      title: 'First Aid',
      subtitle: 'Medical Emergency',
      caption: 'Life\'s Unpredictable, Ô Secour\'s Not!',
      description: 'Immediate medical assistance and first aid support',
      image: '/lovable-uploads/4bc99b8b-f87c-4687-a2f1-ae0d6225e388.png',
      icon: Plus,
      color: 'bg-purple-500'
    },
    {
      id: 'cata-catani',
      title: 'Cata-Catani',
      subtitle: 'Transportation Hub',
      caption: 'Ô Secour: Your Partner in Times of Need!',
      description: 'Emergency transport and logistics support services',
      image: '/lovable-uploads/8fb30b79-e677-4dec-9867-2d610961a19f.png',
      icon: Car,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Ô Secours - Emergency Assistance"
        description="Token-based subscription system for emergency bailout services. Get help when you need it most."
        backgroundImage="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        variant="compact"
      />

      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Subscriptions
                </TabsTrigger>
                <TabsTrigger value="tokens" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Buy Tokens
                </TabsTrigger>
                <TabsTrigger value="rescue" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Request Rescue
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  My Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="services">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Emergency Support, Simplified!</h2>
                  <p className="text-xl text-gray-600 mb-8">Be Prepared, Stay Secured with Ô Secour!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoursServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Card key={service.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                        <div className="relative">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <p className="text-sm text-gray-500">{service.subtitle}</p>
                          <p className="text-lg font-semibold text-purple-600 italic">"{service.caption}"</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 mb-4">{service.description}</p>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Request Emergency Support
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Additional Service Features */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4">Ô Secour: Your Solution for a Brighter Tomorrow!</h3>
                      <p className="text-lg opacity-90 mb-6">
                        Our token-based emergency assistance system ensures you're never alone in times of need.
                      </p>
                      <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4">Secour Got You Covered!</h3>
                      <p className="text-lg opacity-90 mb-6">
                        From medical emergencies to transportation breakdowns, we provide instant relief.
                      </p>
                      <Button variant="outline" className="bg-white text-orange-600 hover:bg-gray-100">
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="subscriptions">
                <SecoursSubscriptions />
              </TabsContent>

              <TabsContent value="tokens">
                <TokenPurchase />
              </TabsContent>

              <TabsContent value="rescue">
                <RescueRequest />
              </TabsContent>

              <TabsContent value="stats">
                <SecoursStats />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OSecours;
