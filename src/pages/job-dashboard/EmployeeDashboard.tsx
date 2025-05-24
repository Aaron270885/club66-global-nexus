import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, Clock, File, FileText, Bell, Settings, UserCircle, Star, Award, Bookmark, Eye, FileX, Search, Mail, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { jobListings } from '@/data/jobListings';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const savedJobIds = [1, 3, 5]; // Mock saved job IDs
const appliedJobIds = [2, 4]; // Mock applied job IDs

const mockApplications = [
  { 
    id: 'APP-2-123456', 
    jobId: 2,
    title: 'Customer Support Specialist',
    company: 'Club66 Global',
    date: '12 May 2025',
    status: 'Under Review',
    statusColor: 'bg-yellow-100 text-yellow-800' 
  },
  { 
    id: 'APP-4-654321', 
    jobId: 4,
    title: 'Mobile App Developer',
    company: 'Club66 Global',
    date: '10 May 2025',
    status: 'Interview',
    statusColor: 'bg-blue-100 text-blue-800' 
  },
  { 
    id: 'APP-7-987654', 
    jobId: 7,
    title: 'Finance Officer',
    company: 'Club66 Global',
    date: '5 May 2025',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-800' 
  }
];

const mockProfile = {
  fullName: 'John Doe',
  jobTitle: 'Marketing Specialist',
  location: 'Bamako, Mali',
  phone: '+223 76 12 34 56',
  email: 'john.doe@example.com',
  resumeLastUpdated: '15 May 2025',
  profileCompleteness: 85,
  skills: ['Marketing Strategy', 'Social Media', 'Content Creation', 'SEO', 'Analytics'],
  education: [
    {
      degree: 'Bachelor of Marketing',
      institution: 'University of Mali',
      year: '2020'
    }
  ],
  experience: [
    {
      position: 'Marketing Associate',
      company: 'TechSoft Mali',
      period: 'Jan 2021 - Present',
      description: 'Managing social media campaigns and content marketing'
    },
    {
      position: 'Marketing Intern',
      company: 'Bamako Digital',
      period: 'Jun 2020 - Dec 2020',
      description: 'Assisted in digital marketing campaigns'
    }
  ]
};

const mockRecommendedJobs = jobListings.filter(job => 
  job.department === "Marketing" || 
  job.technologies.some(tech => mockProfile.skills.includes(tech))
).slice(0, 3);

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const savedJobs = jobListings.filter(job => savedJobIds.includes(job.id));
  const appliedJobs = jobListings.filter(job => appliedJobIds.includes(job.id));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Job Seeker Dashboard</h1>
              <div className="flex items-center text-gray-600">
                <UserCircle className="h-4 w-4 mr-1" />
                Welcome back, {mockProfile.fullName}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/jobs">
                <Button className="mr-2">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <File className="h-5 w-5 mr-2 text-blue-500" />
                      Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockApplications.length}</div>
                    <p className="text-sm text-gray-500">Total applications</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab('applications')}>
                        View All
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Bookmark className="h-5 w-5 mr-2 text-purple-500" />
                      Saved Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{savedJobs.length}</div>
                    <p className="text-sm text-gray-500">Jobs saved for later</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="#" onClick={() => setActiveTab('saved')}>
                        View All
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-green-500" />
                      Profile Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">+40% from last month</span>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recommended Jobs</CardTitle>
                      <CardDescription>Based on your profile and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockRecommendedJobs.map(job => (
                          <div key={job.id} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{job.title}</h3>
                                <div className="text-sm text-gray-600 mt-1">
                                  {job.department} • {job.location} • ${job.salary}/month
                                </div>
                              </div>
                              <Badge>{job.type}</Badge>
                            </div>
                            <div className="flex mt-3">
                              <Link to={`/jobs/${job.id}`}>
                                <Button size="sm">View Job</Button>
                              </Link>
                              <Button size="sm" variant="ghost" className="ml-2">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to="/jobs">
                        <Button variant="outline">See All Recommendations</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Application Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockApplications.map(app => (
                          <div key={app.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-sm">{app.title}</h4>
                                <div className="text-xs text-gray-600">
                                  {app.company} • Applied {app.date}
                                </div>
                              </div>
                              <Badge variant="outline" className={app.statusColor}>
                                {app.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="#" onClick={() => setActiveTab('applications')}>
                          View All Applications
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track the status of your job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockApplications.length > 0 ? (
                    <div className="space-y-4">
                      {mockApplications.map(app => (
                        <div key={app.id} className="p-4 border rounded-lg">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{app.title}</h3>
                                <Badge variant="outline" className={`ml-2 ${app.statusColor}`}>
                                  {app.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {app.company} • Application ID: {app.id}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Applied on {app.date}
                              </div>
                            </div>
                            <div className="mt-3 md:mt-0">
                              <Link to={`/jobs/${app.jobId}`}>
                                <Button size="sm" variant="outline" className="mr-2">
                                  View Job
                                </Button>
                              </Link>
                              <Button size="sm">
                                Track Status
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileX className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't applied to any jobs yet. Start exploring opportunities!
                      </p>
                      <Link to="/jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>Jobs you've saved to apply to later</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedJobs.map(job => (
                        <div key={job.id} className="p-4 border rounded-lg">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="font-medium">{job.title}</h3>
                              <Badge>{job.type}</Badge>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {job.department} • {job.location}
                            </div>
                            <div className="text-sm text-green-600 mt-1">
                              ${job.salary}/month
                            </div>
                            <div className="mt-3 flex justify-between">
                              <Link to={`/jobs/${job.id}`}>
                                <Button size="sm">
                                  Apply Now
                                </Button>
                              </Link>
                              <Button size="sm" variant="outline">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Saved Jobs</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't saved any jobs yet. Save jobs to apply to them later!
                      </p>
                      <Link to="/jobs">
                        <Button>Browse Jobs</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>My Profile</CardTitle>
                      <CardDescription>Manage your professional profile</CardDescription>
                    </div>
                    <Button>
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">{mockProfile.fullName}</h3>
                        <p className="text-gray-600">{mockProfile.jobTitle}</p>
                        <p className="text-sm text-gray-500 mt-1">{mockProfile.location}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            {mockProfile.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {mockProfile.phone}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Profile Completeness</h4>
                          <span className="text-sm text-gray-500">{mockProfile.profileCompleteness}%</span>
                        </div>
                        <Progress value={mockProfile.profileCompleteness} className="h-2" />
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Resume</h4>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-500 mr-2" />
                            <div>
                              <div className="text-sm font-medium">JohnDoe_Resume.pdf</div>
                              <div className="text-xs text-gray-500">Last updated: {mockProfile.resumeLastUpdated}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {mockProfile.skills.map(skill => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-3">
                          <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Work Experience</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {mockProfile.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                              <h5 className="font-medium">{exp.position}</h5>
                              <div className="text-sm text-gray-600">{exp.company}</div>
                              <div className="text-sm text-gray-500">{exp.period}</div>
                              <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div>
                        <div className="flex items-center mb-3">
                          <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Education</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {mockProfile.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4 ml-2">
                              <h5 className="font-medium">{edu.degree}</h5>
                              <div className="text-sm text-gray-600">{edu.institution}</div>
                              <div className="text-sm text-gray-500">Graduated: {edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// Mocking the Phone component from lucide-react
const Phone = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default EmployeeDashboard;
