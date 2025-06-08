
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Search, MapPin, Building, Clock, DollarSign, Filter, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

// Sample job data - replace with actual data source
const jobListings = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: { name: 'Tech Solutions Mali' },
    location: 'Bamako, Mali',
    salary: '150,000',
    type: 'Full-time',
    department: 'Engineering',
    posted: '2 days ago',
    featured: true,
    description: 'Join our dynamic team to build cutting-edge applications that serve millions of users across Africa.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB']
  },
  {
    id: 2,
    title: 'Marketing Manager',
    company: { name: 'Club66 Global' },
    location: 'Bamako, Mali',
    salary: '120,000',
    type: 'Full-time',
    department: 'Marketing',
    posted: '1 week ago',
    featured: false,
    description: 'Lead our marketing initiatives to expand Club66 Global membership across West Africa.',
    technologies: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics']
  },
  {
    id: 3,
    title: 'Customer Success Representative',
    company: { name: 'Club66 Global' },
    location: 'Remote',
    salary: '80,000',
    type: 'Part-time',
    department: 'Customer Service',
    posted: '3 days ago',
    featured: false,
    description: 'Help our members get the most value from their Club66 Global membership experience.',
    technologies: ['Customer Support', 'CRM', 'Communication']
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredJobs = jobListings.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (locationFilter === '' || job.location.includes(locationFilter)) &&
      (departmentFilter === '' || job.department === departmentFilter) &&
      (typeFilter === '' || job.type === typeFilter)
    );
  });

  const departments = [...new Set(jobListings.map(job => job.department))];
  const locations = [...new Set(jobListings.map(job => job.location))];
  const types = [...new Set(jobListings.map(job => job.type))];

  return (
    <Layout>
      <PremiumBanner
        title="Find Your Dream Job"
        description="Discover exciting career opportunities with top companies across Africa. Start your journey today."
        backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      >
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white/90 border-0 text-gray-900"
                />
              </div>
              <div className="flex gap-3">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-40 h-12 bg-white/90 border-0 text-gray-900">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="lg" className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-1/4">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Departments</SelectItem>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Job Type</label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Types</SelectItem>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setDepartmentFilter('');
                        setLocationFilter('');
                        setTypeFilter('');
                        setSearchTerm('');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Job Listings */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                  </h2>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                      <SelectItem value="salary-low">Lowest Salary</SelectItem>
                      <SelectItem value="company">Company A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                                {job.type}
                              </Badge>
                              {job.featured && (
                                <Badge className="bg-orange-500">Featured</Badge>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              <Link to={`/jobs/${job.id}`} className="hover:text-purple-600 transition-colors">
                                {job.title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{job.company?.name || 'Club66 Global'}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span>{job.salary} FCFA/month</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Posted {job.posted}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="outline" className="bg-blue-50">
                                  {tech}
                                </Badge>
                              ))}
                              {job.technologies.length > 3 && (
                                <Badge variant="outline" className="bg-gray-50">
                                  +{job.technologies.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Link to={`/jobs/${job.id}`}>
                              <Button>View Details</Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              Save Job
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search criteria or browse all available positions.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setDepartmentFilter('');
                          setLocationFilter('');
                          setTypeFilter('');
                          setSearchTerm('');
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
