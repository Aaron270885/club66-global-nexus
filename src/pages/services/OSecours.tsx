
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import SecoursSubscriptions from '@/components/secours/SecoursSubscriptions';
import TokenPurchase from '@/components/secours/TokenPurchase';
import RescueRequest from '@/components/secours/RescueRequest';
import SecoursStats from '@/components/secours/SecoursStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Coins, SOS, BarChart3 } from 'lucide-react';

const OSecours = () => {
  const [activeTab, setActiveTab] = useState('subscriptions');

  return (
    <Layout>
      <PremiumBanner
        title="Ô Secours - Emergency Assistance"
        description="Token-based subscription system for emergency bailout services. Get help when you need it most."
        backgroundImage="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        variant="compact"
      />

      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Subscriptions
                </TabsTrigger>
                <TabsTrigger value="tokens" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  Buy Tokens
                </TabsTrigger>
                <TabsTrigger value="rescue" className="flex items-center gap-2">
                  <SOS className="h-4 w-4" />
                  Request Rescue
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  My Stats
                </TabsTrigger>
              </TabsList>

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
