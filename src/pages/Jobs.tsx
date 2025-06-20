import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, Building, Heart, Share2, Filter, ChevronDown, Star, Users, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/hooks/useJobs';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Jobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { jobs, loading, searchJobs, bookmarkJob, applyToJob } = useJobs();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [experience, setExperience] = useState('all');
  const [salary, setSalary] = useState('all');
  const [company, setCompany] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  useEffect(() => {
    searchJobs({ 
      title: searchTerm, 
      location, 
      type: jobType === 'all' ? undefined : jobType,
      experience: experience === 'all' ? undefined : experience,
      salary: salary === 'all' ? undefined : salary,
      company: company === 'all' ? undefined : company
    });
  }, [searchTerm, location, jobType, experience, salary, company, searchJobs]);

  const handleBookmark = async (jobId: string) => {
    if (!user) {
      toast.error('Please login to bookmark jobs');
      navigate('/login');
      return;
    }
    
    try {
      await bookmarkJob(jobId);
      setBookmarkedJobs(prev => 
        prev.includes(jobId) 
          ? prev.filter(id => id !== jobId)
          : [...prev, jobId]
      );
      toast.success(bookmarkedJobs.includes(jobId) ? 'Job removed from bookmarks' : 'Job bookmarked successfully');
    } catch (error) {
      toast.error('Failed to bookmark job');
    }
  };

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }
    
    try {
      await applyToJob(jobId);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to apply for job');
    }
  };

  const handleQuickApply = (jobId: string) => {
    navigate(`/jobs/${jobId}?apply=true`);
  };

  const formatSalary = (min: number, max: number) => {
    return `CFA ${min?.toLocaleString() || 0} - ${max?.toLocaleString() || 0}`;
  };

  const getExperienceLevel = (years: number) => {
    if (years === 0) return 'Entry Level';
    if (years <= 2) return 'Junior Level';
    if (years <= 5) return 'Mid Level';
    return 'Senior Level';
  };

  return (
    <Layout>
      <PremiumBanner
        title="Find Your Dream Job"
        description="Discover thousands of job opportunities across Mali and West Africa. Connect with top employers and build your career."
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68ba2c6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        variant="compact"
      />

      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search Section */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="City or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </Button>
              </div>
              
              {/* Advanced Filters */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <div className="text-sm text-gray-600">
                  {jobs.length} jobs found
                </div>
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={salary} onValueChange={setSalary}>
                    <SelectTrigger>
                      <SelectValue placeholder="Salary Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Salaries</SelectItem>
                      <SelectItem value="0-500000">Under CFA 500K</SelectItem>
                      <SelectItem value="500000-1000000">CFA 500K - 1M</SelectItem>
                      <SelectItem value="1000000-2000000">CFA 1M - 2M</SelectItem>
                      <SelectItem value="2000000+">CFA 2M+</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      <SelectItem value="startup">Startup (1-50)</SelectItem>
                      <SelectItem value="medium">Medium (51-500)</SelectItem>
                      <SelectItem value="large">Large (500+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">
                              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                            </h3>
                            {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                            {job.urgent && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span className="capitalize">{job.employment_type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(job.id)}
                            className={bookmarkedJobs.includes(job.id) ? 'text-red-500' : 'text-gray-400'}
                          >
                            <Heart className={`h-4 w-4 ${bookmarkedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills?.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills && job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">
                              {job.salary_min && job.salary_max ? formatSalary(job.salary_min, job.salary_max) : 'Salary not specified'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{getExperienceLevel(job.experience_required || 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(job.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/jobs/${job.id}`}>View Details</Link>
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleQuickApply(job.id)}
                          >
                            Quick Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Jobs</span>
                    <span className="font-bold text-purple-600">{jobs.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New This Week</span>
                    <span className="font-bold text-green-600">
                      {jobs.filter(job => {
                        const jobDate = new Date(job.created_at);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return jobDate > weekAgo;
                      }).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Companies Hiring</span>
                    <span className="font-bold text-blue-600">
                      {new Set(jobs.map(job => job.company)).size}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Companies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Hiring Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(jobs.map(job => job.company))).slice(0, 5).map((company, index) => {
                      const companyJobs = jobs.filter(job => job.company === company);
                      return (
                        <div key={company} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Building className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{company}</p>
                              <p className="text-sm text-gray-500">{companyJobs.length} openings</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Job Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create Job Alert</CardTitle>
                  <CardDescription>
                    Get notified when jobs matching your criteria are posted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Users className="h-4 w-4 mr-2" />
                    Set Up Alert
                  </Button>
                </CardContent>
              </Card>

              {/* Career Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Career Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/about/projects">
                      <Calendar className="h-4 w-4 mr-2" />
                      Resume Builder
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/about/projects">
                      <Star className="h-4 w-4 mr-2" />
                      Interview Tips
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/about/projects">
                      <Users className="h-4 w-4 mr-2" />
                      Career Guidance
                    </Link>
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

export default Jobs;
