
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Handshake, BarChart, Target } from 'lucide-react';

const Merchants = () => {
  return (
    <Layout>
      <PremiumBanner
        title="Merchant Partners"
        description="Partner with Club66 Global to reach thousands of premium members and grow your business."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />
      
      <div className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Become a Merchant Partner</h2>
              <p className="text-lg text-gray-600">
                Join our network of premium merchants and offer exclusive discounts to our members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Store className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Expand Your Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Connect with thousands of premium members across Africa.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Increase Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Boost your revenue with our targeted member base.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Handshake className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Partnership Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Enjoy marketing support and promotional opportunities.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle>Targeted Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Reach your ideal customers through our platform.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Merchants;
