
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Award, MapPin, Building } from 'lucide-react';

const AssociationMembers = () => {
  const boardMembers = [
    {
      id: 1,
      name: "Amadou Diallo",
      position: "Chairman",
      location: "Bamako, Mali",
      experience: "15 years in Financial Services",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      bio: "Leading the strategic direction of Club66 Global with extensive experience in financial services and community development."
    },
    {
      id: 2,
      name: "Fatou Kone",
      position: "Vice Chairwoman",
      location: "Abidjan, Ivory Coast",
      experience: "12 years in Business Development",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b932?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      bio: "Driving business expansion and partnership development across West Africa."
    },
    {
      id: 3,
      name: "Ibrahim Traore",
      position: "Secretary General",
      location: "Ouagadougou, Burkina Faso",
      experience: "10 years in Operations",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      bio: "Overseeing daily operations and ensuring efficient service delivery to our members."
    },
    {
      id: 4,
      name: "Aisha Sy",
      position: "Treasurer",
      location: "Dakar, Senegal",
      experience: "14 years in Finance",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      bio: "Managing financial strategy and ensuring fiscal responsibility across all operations."
    }
  ];

  const stats = [
    { icon: Users, label: "Board Members", value: "12" },
    { icon: MapPin, label: "Countries Represented", value: "6" },
    { icon: Award, label: "Combined Experience", value: "150+ Years" },
    { icon: Building, label: "Partner Organizations", value: "25+" }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Association Members"
        description="Meet the dedicated individuals who guide Club66 Global's mission and strategic direction."
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        showBackButton
        backUrl="/about"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <stat.icon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Board of Directors</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our board consists of experienced professionals from various fields, 
                united by a common vision of empowering communities across Africa.
              </p>
            </div>

            {/* Board Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {boardMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <Badge className="bg-purple-100 text-purple-800">
                          {member.position}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {member.bio}
                    </CardDescription>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>{member.experience}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Membership Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Committee</CardTitle>
                  <CardDescription>
                    The executive committee handles day-to-day decision making and strategic implementation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Chairman</span>
                      <span className="font-medium">Amadou Diallo</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vice Chairwoman</span>
                      <span className="font-medium">Fatou Kone</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Secretary General</span>
                      <span className="font-medium">Ibrahim Traore</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Treasurer</span>
                      <span className="font-medium">Aisha Sy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advisory Board</CardTitle>
                  <CardDescription>
                    Our advisory board provides expertise and guidance across various sectors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Technology Advisory</h4>
                      <p className="text-sm text-gray-600">Digital transformation and innovation</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Financial Advisory</h4>
                      <p className="text-sm text-gray-600">Financial services and risk management</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Legal Advisory</h4>
                      <p className="text-sm text-gray-600">Compliance and regulatory matters</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Community Advisory</h4>
                      <p className="text-sm text-gray-600">Community engagement and social impact</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Join CTA */}
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in Contributing?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're always looking for dedicated individuals who share our vision 
                  and want to contribute to the growth of our community.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Get Involved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssociationMembers;
