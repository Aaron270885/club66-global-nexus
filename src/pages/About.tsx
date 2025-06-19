
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Heart, Globe } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <PremiumBanner
        title="Who is behind Club66 Global?"
        description="Learn about our mission, vision, and the passionate team building the future of premium membership in Africa."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />
      
      <div className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-gray-600">
                Club66 Global was founded with a vision to create a premium membership platform that connects people, businesses, and opportunities across Africa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">To empower individuals and businesses through exclusive benefits, networking opportunities, and premium services.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">To become Africa's leading premium membership platform, fostering growth and prosperity across the continent.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Excellence, integrity, innovation, and community empowerment guide everything we do.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-yellow-600" />
                  </div>
                  <CardTitle>Our Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">A diverse network of professionals, entrepreneurs, and visionaries working together for success.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
