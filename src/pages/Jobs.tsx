
import { useState } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Users, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const jobListings = [
    {
      id: 1,
      title: "Field Sales Agent",
      department: "Sales",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "3 days ago",
      description: "Join our field sales team to promote Club66 Global memberships and recruit new members across Bamako.",
      requirements: ["High school diploma", "Excellent communication skills", "Sales experience preferred", "Fluency in French and Bambara"]
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "1 week ago",
      description: "Handle customer inquiries, membership activation, and provide excellent service to our growing member base.",
      requirements: ["Bachelor's degree", "Customer service experience", "Strong problem-solving abilities", "Fluency in French and English"]
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "2 weeks ago",
      description: "Coordinate marketing campaigns, social media, and promotional events for Club66 Global across Mali.",
      requirements: ["Bachelor's degree in Marketing or related field", "2+ years of marketing experience", "Social media expertise", "Graphic design skills a plus"]
    },
    {
      id: 4,
      title: "Mobile App Developer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      posted: "3 weeks ago",
      description: "Develop and maintain our mobile applications for iOS and Android platforms.",
      requirements: ["Bachelor's degree in Computer Science", "3+ years of mobile app development", "Experience with React Native", "Backend integration skills"]
    },
    {
      id: 5,
      title: "Merchant Relations Manager",
      department: "Partnerships",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "1 month ago",
      description: "Develop and maintain relationships with merchant partners, negotiate discounts, and expand our partner network.",
      requirements: ["Bachelor's degree in Business", "3+ years in business development", "Strong negotiation skills", "Fluency in French and English"]
    },
    {
      id: 6,
      title: "Field Agent Supervisor",
      department: "Sales",
      location: "Segou, Mali",
      type: "Full-time",
      posted: "2 days ago",
      description: "Supervise a team of field agents, set targets, monitor performance, and provide training and support.",
      requirements: ["Bachelor's degree", "2+ years of sales management", "Leadership abilities", "Fluency in French and Bambara"]
    },
    {
      id: 7,
      title: "Finance Officer",
      department: "Finance",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "5 days ago",
      description: "Handle financial operations, payment processing, and reporting for Club66 Global Mali.",
      requirements: ["Bachelor's degree in Finance", "2+ years of finance experience", "Proficiency in accounting software", "Attention to detail"]
    },
    {
      id: 8,
      title: "Social Media Assistant",
      department: "Marketing",
      location: "Bamako, Mali",
      type: "Part-time",
      posted: "1 week ago",
      description: "Create and schedule content for social media platforms, engage with followers, and track metrics.",
      requirements: ["Diploma in Marketing", "Social media management experience", "Creative content creation skills", "Fluency in French"]
    }
  ];
  
  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Career Opportunities</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our team and be part of Club66 Global's mission to transform membership benefits 
            and financial access across Africa. We offer exciting career paths and growth opportunities.
          </p>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search jobs by title, department or location..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-1/4">
                <Select>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by dept" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:w-1/4">
                <Select>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="bamako">Bamako</SelectItem>
                    <SelectItem value="segou">Segou</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-white px-6 py-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Showing {filteredJobs.length} opportunities</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Sort by:</span>
                  <button className="flex items-center font-medium hover:text-club66-purple">
                    Newest
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job.department}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                      <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50">
                    <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="mb-4">
                    <Search className="h-12 w-12 mx-auto text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No jobs match your search</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Join Our Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Become part of a dynamic team working to transform membership 
                    benefits across Africa. We offer competitive salaries and growth opportunities.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Field Agent Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    We're building a network of sales agents across Mali, with opportunities
                    for advancement to supervisory and management roles.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-purple-100 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Spontaneous Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Don't see a position that fits your profile? Send us your resume and 
                    tell us why you'd be a great addition to our team.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Contact Us</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
