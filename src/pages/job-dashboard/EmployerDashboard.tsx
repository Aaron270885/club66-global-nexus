
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  Edit3, 
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const jobStats = {
    active: 8,
    draft: 3,
    applications: 47,
    interviews: 12
  };

  const postedJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'Bamako, Mali',
      type: 'Full-time',
      salary: '150,000',
      applications: 15,
      posted: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      location: 'Remote',
      type: 'Full-time',
      salary: '120,000',
      applications: 22,
      posted: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      title: 'Data Analyst',
      location: 'Bamako, Mali',
      type: 'Part-time',
      salary: '80,000',
      applications: 10,
      posted: '2024-01-08',
      status: 'draft'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      applicantName: 'Amadou Diallo',
      appliedDate: '2024-01-16',
      status: 'new',
      experience: '5 years'
    },
    {
      id: 2,
      jobTitle: 'Marketing Manager',
      applicantName: 'Fatima Traore',
      appliedDate: '2024-01-15',
      status: 'reviewed',
      experience: '3 years'
    },
    {
      id: 3,
      jobTitle: 'Senior Software Engineer',
      applicantName: 'Ibrahim Kone',
      appliedDate: '2024-01-14',
      status: 'interview',
      experience: '7 years'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500">Draft</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-yellow-500">Reviewed</Badge>;
      case 'interview':
        return <Badge className="bg-purple-500">Interview</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <PremiumBanner
        title="Employer Dashboard"
        description="Manage your job postings, review applications, and find the best talent for your organization."
        backgroundImage="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/job-center">
              <Building className="h-4 w-4 mr-2" />
              Job Center
            </Link>
          </Button>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="post-job">Post Job</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-1">{jobStats.active}</div>
                      <div className="text-gray-600">Active Jobs</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-gray-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Edit3 className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className="text-3xl font-bold text-gray-600 mb-1">{jobStats.draft}</div>
                      <div className="text-gray-600">Drafts</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{jobStats.applications}</div>
                      <div className="text-gray-600">Applications</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-1">{jobStats.interviews}</div>
                      <div className="text-gray-600">Interviews</div>
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
                            <h3 className="font-semibold">{application.applicantName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {application.jobTitle}
                              </span>
                              <span>{application.experience} experience</span>
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

              <TabsContent value="jobs" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Job Postings</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {postedJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{job.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span>{job.type}</span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {job.salary} FCFA/month
                              </span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {job.applications} applications
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(job.status)}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Job Applications</h2>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Jobs</SelectItem>
                        <SelectItem value="software">Software Engineer</SelectItem>
                        <SelectItem value="marketing">Marketing Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{application.applicantName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {application.jobTitle}
                              </span>
                              <span>{application.experience} experience</span>
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
                            <Button size="sm">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="post-job" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post New Job</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Job Title</label>
                        <Input placeholder="e.g. Senior Software Engineer" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <Input placeholder="Your company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input placeholder="e.g. Bamako, Mali or Remote" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Employment Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Minimum Salary (FCFA/month)</label>
                        <Input placeholder="e.g. 100000" type="number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Maximum Salary (FCFA/month)</label>
                        <Input placeholder="e.g. 150000" type="number" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Description</label>
                      <Textarea placeholder="Describe the job role, responsibilities, and what you're looking for..." rows={6} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Requirements</label>
                      <Textarea placeholder="List the required skills, experience, and qualifications..." rows={4} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Benefits</label>
                      <Textarea placeholder="Describe the benefits and perks offered..." rows={3} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Application Deadline</label>
                      <Input type="date" />
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Publish Job
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Save as Draft
                      </Button>
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

export default EmployerDashboard;
