
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  User, 
  FileText, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  Upload,
  Edit3,
  Eye,
  BookmarkPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const applicationStats = {
    total: 15,
    pending: 8,
    interviews: 3,
    rejected: 4
  };

  const recentApplications = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Mali',
      appliedDate: '2024-01-15',
      status: 'interview',
      location: 'Bamako, Mali'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'Club66 Global',
      appliedDate: '2024-01-12',
      status: 'pending',
      location: 'Remote'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Innovation Hub',
      appliedDate: '2024-01-10',
      status: 'rejected',
      location: 'Bamako, Mali'
    }
  ];

  const savedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'Bamako, Mali',
      salary: '120,000',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Project Manager',
      company: 'TechCorp Africa',
      location: 'Remote',
      salary: '150,000',
      posted: '1 week ago'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interview':
        return <Badge className="bg-blue-500">Interview</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <PremiumBanner
        title="Job Seeker Dashboard"
        description="Manage your job applications, profile, and career opportunities all in one place."
        backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/jobs">
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/job-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Center
            </Link>
          </Button>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{applicationStats.total}</div>
                      <div className="text-gray-600">Total Applications</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="text-3xl font-bold text-yellow-600 mb-1">{applicationStats.pending}</div>
                      <div className="text-gray-600">Pending</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{applicationStats.interviews}</div>
                      <div className="text-gray-600">Interviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <XCircle className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="text-3xl font-bold text-red-600 mb-1">{applicationStats.rejected}</div>
                      <div className="text-gray-600">Rejected</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{application.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {application.company}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Applied {application.appliedDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Job Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{application.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {application.company}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Applied {application.appliedDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{job.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.company}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="font-semibold">{job.salary} FCFA/month</div>
                            </div>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input placeholder="Enter your full name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input placeholder="Enter your email" type="email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input placeholder="Enter your phone number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input placeholder="Enter your location" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Professional Summary</label>
                      <Textarea placeholder="Write a brief summary about your professional background..." rows={4} />
                    </div>
                    <Button>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                      <p className="text-gray-600 mb-4">Upload a PDF or Word document (Max 5MB)</p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-blue-600 mr-3" />
                          <div>
                            <h4 className="font-semibold">Current Resume.pdf</h4>
                            <p className="text-sm text-gray-600">Uploaded 2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
