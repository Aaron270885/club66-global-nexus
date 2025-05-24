
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Users, BarChart, Plus, FileText, Clock, User, ChevronRight, Building, Check, X, Eye, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { jobListings } from '@/data/jobListings';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import JobPostingForm from '@/components/jobs/JobPostingForm';

// Mock data for the employer dashboard
const mockPostedJobs = jobListings.slice(0, 5).map(job => ({
  ...job,
  applicants: Math.floor(Math.random() * 30),
  views: Math.floor(Math.random() * 200) + 50,
  status: Math.random() > 0.2 ? 'Active' : 'Draft',
}));

const mockApplicants = [
  {
    id: 'APP-1',
    name: 'John Smith',
    position: 'Field Sales Agent',
    date: '3 days ago',
    status: 'New',
    statusColor: 'bg-blue-100 text-blue-800',
    match: '85%',
  },
  {
    id: 'APP-2',
    name: 'Sarah Johnson',
    position: 'Customer Support Specialist',
    date: '1 week ago',
    status: 'Screening',
    statusColor: 'bg-yellow-100 text-yellow-800',
    match: '78%',
  },
  {
    id: 'APP-3',
    name: 'Michael Brown',
    position: 'Marketing Coordinator',
    date: '2 weeks ago',
    status: 'Interview',
    statusColor: 'bg-purple-100 text-purple-800',
    match: '92%',
  },
  {
    id: 'APP-4',
    name: 'Jennifer Davis',
    position: 'Mobile App Developer',
    date: '3 days ago',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-800',
    match: '65%',
  },
  {
    id: 'APP-5',
    name: 'Robert Wilson',
    position: 'Finance Officer',
    date: '1 day ago',
    status: 'New',
    statusColor: 'bg-blue-100 text-blue-800',
    match: '88%',
  }
];

const mockStats = {
  totalJobs: mockPostedJobs.length,
  activeJobs: mockPostedJobs.filter(job => job.status === 'Active').length,
  totalApplicants: 24,
  newApplicants: 8,
  interviewsScheduled: 3,
  applicantsByDepartment: [
    { department: 'Sales', count: 9 },
    { department: 'Marketing', count: 5 },
    { department: 'Technology', count: 6 },
    { department: 'Finance', count: 2 },
    { department: 'Customer Service', count: 2 }
  ]
};

const EmployerDashboard = () => {
  const { toast } = useToast();
  const [showPostingForm, setShowPostingForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleEditJob = (jobId: number) => {
    setSelectedJobId(jobId);
    setShowPostingForm(true);
  };
  
  const handleDuplicateJob = (jobId: number) => {
    toast({
      title: 'Job Duplicated',
      description: 'The job has been duplicated successfully and saved as a draft.',
    });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
              <div className="flex items-center text-gray-600">
                <Building className="h-4 w-4 mr-1" />
                Club66 Global
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => setShowPostingForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Post a New Job
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              <TabsTrigger value="applicants">Applicants</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                      Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStats.activeJobs}/{mockStats.totalJobs}</div>
                    <p className="text-sm text-gray-500">Active/Total Jobs</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2 text-green-500" />
                      Applicants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStats.totalApplicants}</div>
                    <p className="text-sm text-gray-500">Total Applicants</p>
                    <div className="mt-2 text-xs text-green-600">+{mockStats.newApplicants} new this week</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                      Interviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStats.interviewsScheduled}</div>
                    <p className="text-sm text-gray-500">Scheduled this week</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Recent Job Postings</CardTitle>
                      <CardDescription>Manage your active job listings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPostedJobs.slice(0, 3).map(job => (
                          <div key={job.id} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-medium">{job.title}</h3>
                                  <Badge className="ml-2" variant={job.status === 'Active' ? 'default' : 'secondary'}>
                                    {job.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {job.department} • {job.location} • Posted {job.posted}
                                </div>
                              </div>
                              <div className="text-sm">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1 text-blue-500" />
                                  <span>{job.applicants} Applicants</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Eye className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{job.views} Views</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex mt-3">
                              <Button size="sm" onClick={() => handleEditJob(job.id)}>
                                Edit
                              </Button>
                              <Link to={`/jobs/${job.id}`}>
                                <Button size="sm" variant="outline" className="ml-2">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <Link to="#" onClick={() => document.querySelector('[data-value="jobs"]')?.click()}>
                          Manage All Jobs
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>New Applicants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockApplicants.filter(app => app.status === 'New').map(app => (
                          <div key={app.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-sm">{app.name}</h4>
                                <div className="text-xs text-gray-600">
                                  {app.position} • Applied {app.date}
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {app.match} Match
                              </Badge>
                            </div>
                            <div className="flex items-center mt-2">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full ml-1">
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                              <div className="flex-grow"></div>
                              <Button size="sm" variant="ghost" className="h-8 text-xs">
                                Review
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="#" onClick={() => document.querySelector('[data-value="applicants"]')?.click()}>
                          View All Applicants
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStats.applicantsByDepartment.map(dept => (
                      <div key={dept.department}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{dept.department}</span>
                          <span className="text-sm text-gray-600">{dept.count} applicants</span>
                        </div>
                        <Progress 
                          value={(dept.count / mockStats.totalApplicants) * 100} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>My Job Postings</CardTitle>
                    <CardDescription>Manage and monitor all your job listings</CardDescription>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Button onClick={() => setShowPostingForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Job
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="relative mb-4 md:mb-0 md:max-w-xs w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search jobs..." className="pl-10" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        Active
                      </Button>
                      <Button variant="ghost" size="sm">
                        Drafts
                      </Button>
                      <Button variant="ghost" size="sm">
                        Closed
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {mockPostedJobs.map(job => (
                      <div key={job.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                          <div className="mb-4 lg:mb-0">
                            <div className="flex items-center">
                              <h3 className="font-medium">{job.title}</h3>
                              <Badge className="ml-2" variant={job.status === 'Active' ? 'default' : 'secondary'}>
                                {job.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {job.department} • {job.location} • Posted {job.posted}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{job.applicants} Applicants</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Eye className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{job.views} Views</span>
                              </div>
                            </div>
                            
                            <div className="flex">
                              <Button size="sm" onClick={() => handleEditJob(job.id)}>
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="ml-2" onClick={() => handleDuplicateJob(job.id)}>
                                Duplicate
                              </Button>
                              <Link to={`/jobs/${job.id}`}>
                                <Button size="sm" variant="ghost" className="ml-2">
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applicants">
              <Card>
                <CardHeader>
                  <CardTitle>All Applicants</CardTitle>
                  <CardDescription>Review and manage job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div className="relative mb-4 md:mb-0 md:max-w-xs w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search applicants..." className="pl-10" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        All
                      </Button>
                      <Button variant="ghost" size="sm">
                        New
                      </Button>
                      <Button variant="ghost" size="sm">
                        Screening
                      </Button>
                      <Button variant="ghost" size="sm">
                        Interview
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {mockApplicants.map(applicant => (
                      <div key={applicant.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex flex-col lg:flex-row justify-between">
                          <div className="mb-4 lg:mb-0">
                            <div className="flex items-center">
                              <User className="h-5 w-5 mr-2 text-gray-400" />
                              <div>
                                <h3 className="font-medium">{applicant.name}</h3>
                                <div className="text-sm text-gray-600">
                                  {applicant.position} • Applied {applicant.date}
                                </div>
                              </div>
                              <Badge variant="outline" className={applicant.statusColor}>
                                {applicant.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-green-50 text-green-700 mr-4">
                              {applicant.match} Match
                            </Badge>
                            
                            <div className="flex">
                              <Button size="sm">
                                Review
                              </Button>
                              <Button size="sm" variant="outline" className="ml-2">
                                Download CV
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription>Track performance of your job listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">Average Time to Hire</h3>
                      <div className="text-2xl font-bold">18 days</div>
                      <div className="text-xs text-green-600 mt-1">↓ 3 days from previous average</div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">Applications per Job</h3>
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-xs text-green-600 mt-1">↑ 0.7 from previous month</div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm text-gray-500 mb-1">Conversion Rate</h3>
                      <div className="text-2xl font-bold">5.2%</div>
                      <div className="text-xs text-green-600 mt-1">↑ 0.8% from previous month</div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Applications by Job Title</h3>
                    <div className="space-y-4">
                      {mockPostedJobs.slice(0, 5).map(job => (
                        <div key={job.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{job.title}</span>
                            <span className="text-sm text-gray-600">{job.applicants} applicants</span>
                          </div>
                          <Progress 
                            value={(job.applicants / mockStats.totalApplicants) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-8" />
                  
                  <div>
                    <h3 className="font-medium mb-4">Source of Applications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-lg">Direct</div>
                        <div className="text-sm text-gray-500">42% (10)</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-lg">LinkedIn</div>
                        <div className="text-sm text-gray-500">25% (6)</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-lg">Indeed</div>
                        <div className="text-sm text-gray-500">21% (5)</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="font-medium text-lg">Referrals</div>
                        <div className="text-sm text-gray-500">12% (3)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {showPostingForm && (
            <JobPostingForm
              jobId={selectedJobId}
              onClose={() => {
                setShowPostingForm(false);
                setSelectedJobId(null);
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

// Mocking the Calendar component from lucide-react
const Calendar = ({ className = "", ...props }) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default EmployerDashboard;
