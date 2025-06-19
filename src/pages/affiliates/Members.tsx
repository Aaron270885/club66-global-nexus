
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Star, TrendingUp, Gift } from 'lucide-react';

const Members = () => {
  return (
    <Layout>
      <PremiumBanner
        title="Member Affiliates"
        description="Join our exclusive member affiliate program and earn rewards by referring new members to Club66 Global."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />
      
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Become a Member Affiliate</h2>
              <p className="text-lg text-gray-600">
                Earn commissions and exclusive rewards by introducing new members to our premium platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Refer Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Share your unique referral code with friends and family.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Earn Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Get 10% commission for every successful referral.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Exclusive Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Access special bonuses and member-only benefits.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Join Affiliate Program
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
