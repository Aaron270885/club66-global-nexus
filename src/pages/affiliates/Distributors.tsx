
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Globe, DollarSign, Award } from 'lucide-react';

const Distributors = () => {
  return (
    <Layout>
      <PremiumBanner
        title="Distributor Network"
        description="Join our exclusive distributor network and help us expand Club66 Global across Africa."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />
      
      <div className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Become a Distributor</h2>
              <p className="text-lg text-gray-600">
                Partner with us to distribute Club66 Global memberships in your region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Regional Expansion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Help us expand into new markets and regions across Africa.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>High Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Earn attractive commissions on every membership sold.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Truck className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Full Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Get comprehensive training and ongoing support.</p>
                </CardContent>
      </Card>

              <Card>
                <CardHeader>
                  <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle>Exclusive Territory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Secure exclusive distribution rights in your area.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Apply as Distributor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Distributors;
