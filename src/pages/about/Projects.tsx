
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Target, Calendar, MapPin } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Education Support Initiative",
      description: "Providing educational resources and scholarships to underprivileged students across West Africa.",
      status: "Active",
      progress: 75,
      target: 100000,
      raised: 75000,
      beneficiaries: 500,
      location: "Mali, Senegal, Burkina Faso",
      startDate: "2024-01-01"
    },
    {
      id: 2,
      title: "Small Business Empowerment",
      description: "Supporting small businesses with microloans and business development training.",
      status: "Active",
      progress: 60,
      target: 200000,
      raised: 120000,
      beneficiaries: 300,
      location: "Mali, Ivory Coast",
      startDate: "2024-02-01"
    },
    {
      id: 3,
      title: "Digital Literacy Program",
      description: "Teaching digital skills to rural communities to bridge the digital divide.",
      status: "Planning",
      progress: 25,
      target: 50000,
      raised: 12500,
      beneficiaries: 200,
      location: "Rural Mali",
      startDate: "2024-06-01"
    }
  ];

  return (
    <Layout>
      <PremiumBanner
        title="Our Projects"
        description="Discover the impactful projects we're working on to create positive change across Africa."
        backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        showBackButton
        backUrl="/about"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Projects</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to making a positive impact through various initiatives 
                focused on education, business development, and community empowerment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        className={
                          project.status === 'Active' 
                            ? 'bg-green-500' 
                            : project.status === 'Planning'
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }
                      >
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(project.startDate).getFullYear()}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="font-medium">CFA {project.raised.toLocaleString()}</p>
                          <p className="text-gray-500">of CFA {project.target.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="font-medium">{project.beneficiaries}</p>
                          <p className="text-gray-500">Beneficiaries</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          Started {new Date(project.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Want to Contribute?</h3>
                  <p className="text-gray-600 mb-6">
                    Join us in making a difference. Your contribution, no matter the size, 
                    helps us create positive change in communities across Africa.
                  </p>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Contribute to Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
