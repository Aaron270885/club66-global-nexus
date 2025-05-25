
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Globe, Heart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <PremiumBanner
        title="About Club66 Global"
        description="Transforming membership benefits and financial access across Africa through innovation and technology."
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Link to="/about/changing-lives">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Our Impact
            </Button>
          </Link>
          <Link to="/about/contact">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Mission & Vision Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Target className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To democratize access to financial services and membership benefits across Africa, 
                    empowering individuals and communities through innovative technology solutions that 
                    bridge the gap between traditional banking and modern digital finance.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Lightbulb className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To become Africa's leading membership platform, creating a sustainable ecosystem 
                    where every individual has access to financial services, exclusive benefits, and 
                    opportunities for economic growth and social development.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The principles that guide everything we do at Club66 Global
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We operate with transparency, honesty, and ethical practices in all our interactions.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Community</h3>
                  <p className="text-gray-600">
                    We believe in building strong communities and fostering connections that create lasting value.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    We strive for excellence in every service we provide and continuously improve our offerings.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Club66 Global by the Numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
                      <div className="text-gray-600">Active Members</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
                      <div className="text-gray-600">Partner Merchants</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                      <div className="text-gray-600">Cities Covered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                      <div className="text-gray-600">Satisfaction Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leadership Team Preview */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet the visionary leaders driving Club66 Global's mission forward
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="text-center p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">CEO</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Chief Executive Officer</h3>
                    <p className="text-gray-600 text-sm">
                      Leading the vision and strategy for transforming Africa's financial landscape.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="text-center p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">CTO</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Chief Technology Officer</h3>
                    <p className="text-gray-600 text-sm">
                      Driving innovation and technology excellence across all platforms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="text-center p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">CFO</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Chief Financial Officer</h3>
                    <p className="text-gray-600 text-sm">
                      Ensuring financial sustainability and growth across all operations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-12">
                  <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
                  <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Be part of the transformation. Whether as a member, partner, or team member, 
                    help us build a better financial future for Africa.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                        Become a Member
                      </Button>
                    </Link>
                    <Link to="/jobs">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Join Our Team
                      </Button>
                    </Link>
                  </div>
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
