
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import PremiumMemberCard from '@/components/dashboard/PremiumMemberCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Link, Navigate } from 'react-router-dom';
import { CreditCard, Smartphone, Shield, Globe } from 'lucide-react';

const Cards = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useUserProfile();

  // Mock membership data - in real app, this would come from API
  const memberData = {
    memberName: profile?.full_name || user?.email?.split('@')[0] || "Club Member",
    memberID: "C66-ML-21058",
    expiryDate: "01/28",
    membershipTier: "Premium" as const,
    profileImage: profile?.profile_image_url,
    phoneNumber: profile?.phone || "+223 XX XX XX XX",
    email: user?.email || "member@club66.com"
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <PremiumBanner
        title="Your Club66 Global Cards"
        description="Manage your digital and physical membership cards, access QR codes, and enjoy exclusive benefits."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        variant="compact"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Card Display */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Your Digital Membership Card</h2>
                <PremiumMemberCard {...memberData} />
              </div>

              {/* Card Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Card Features</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                      Digital & Physical Cards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Access your membership card digitally on any device, or request a physical card for in-person verification.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
                      QR Code Technology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Instant verification at partner locations with secure QR code scanning for discounts and benefits.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-purple-600" />
                      Secure & Verified
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Your membership card contains encrypted data to prevent fraud and ensure secure transactions.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-purple-600" />
                      Global Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Use your card at any Club66 partner location across Africa and access international benefits.
                    </CardDescription>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link to="/activate-card">Activate New Card</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
