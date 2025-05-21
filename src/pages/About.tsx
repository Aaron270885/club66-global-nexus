
import { Users, Globe, Star, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  const team = [
    {
      name: "Ibrahim Diallo",
      role: "Founder & CEO",
      bio: "Visionary entrepreneur with over 15 years of experience in business development across West Africa."
    },
    {
      name: "Aminata Touré",
      role: "Chief Operations Officer",
      bio: "Expert in operational excellence with a passion for creating efficient systems and processes."
    },
    {
      name: "Mohammed Keita",
      role: "Chief Technology Officer",
      bio: "Tech innovator dedicated to leveraging digital solutions to solve Africa's unique challenges."
    },
    {
      name: "Fatima Coulibaly",
      role: "Chief Marketing Officer",
      bio: "Strategic marketer with deep understanding of consumer behavior in emerging markets."
    }
  ];

  const values = [
    {
      title: "Community Impact",
      description: "Uplifting local communities through sustainable economic growth and opportunity creation.",
      icon: Users
    },
    {
      title: "African Innovation",
      description: "Championing innovative solutions designed specifically for African markets and needs.",
      icon: Globe
    },
    {
      title: "Excellence",
      description: "Committing to the highest standards in every aspect of our business operations.",
      icon: Star
    },
    {
      title: "Social Responsibility",
      description: "Implementing initiatives that create positive social change throughout Mali and beyond.",
      icon: Heart
    }
  ];

  const partners = [
    "Mali National Chamber of Commerce",
    "African Development Bank",
    "Mali Entrepreneurship Foundation",
    "West African Economic Council",
    "Digital Africa Initiative",
    "Mali Women in Business Association"
  ];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">About Club66 Global</h1>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn more about our mission, vision, and the team behind Club66 Global.
          </p>
          
          <div className="max-w-4xl mx-auto mb-20">
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
                <TabsTrigger value="story">Our Story</TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-6">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-4">
                    Club66 Global is dedicated to creating a membership ecosystem that empowers individuals and businesses 
                    throughout Mali and Africa. We aim to provide accessible financial services, exclusive benefits, and 
                    networking opportunities to our members while fostering economic growth in local communities.
                  </p>
                  <p className="text-gray-600">
                    Through our innovative approach to membership benefits and social impact initiatives, we strive to be 
                    a catalyst for positive change and sustainable development across the continent.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="vision" className="mt-6">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-gray-600 mb-4">
                    We envision a future where Club66 Global becomes the leading membership platform across Africa, 
                    connecting millions of members to valuable services, discounts, and opportunities while driving 
                    economic empowerment and financial inclusion.
                  </p>
                  <p className="text-gray-600">
                    By 2030, we aim to expand to 20 African countries, creating a continental network of businesses and 
                    members who benefit from our ecosystem while contributing to local development and prosperity.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="story" className="mt-6">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    Club66 Global was founded in 2022 with a simple yet powerful idea: create a membership platform that provides 
                    real value to Malian citizens while supporting local businesses. Our founder recognized that many traditional 
                    financial services were inaccessible to the average Malian, and discount programs typically bypassed African markets.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Starting with just a handful of partner businesses in Bamako, Club66 Global has grown rapidly, expanding our network 
                    of merchants and developing innovative benefits tailored to the needs of our members. Our success in Mali has provided 
                    the foundation for our planned expansion across West Africa and beyond.
                  </p>
                  <p className="text-gray-600">
                    Today, we're proud to be a Malian company with global aspirations, staying true to our roots while embracing technology 
                    to create solutions that work for Africa's unique context.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-club66-purple/10 p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    <value.icon className="h-6 w-6 text-club66-purple" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-gray-200 h-16 w-16 rounded-full mr-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Partners & Endorsements</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {partners.map((partner, index) => (
                  <div key={index} className="border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center h-32">
                    <p className="text-center font-medium text-gray-700">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-club66-purple text-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Join Club66 Global Today</h2>
              <p className="mb-8">
                Become part of our growing community and enjoy exclusive benefits while contributing to Africa's economic development.
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link to="/register">Become a Member</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
