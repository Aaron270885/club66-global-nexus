
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Search, MapPin, Building, Clock, DollarSign, Filter, Briefcase, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useJobs, useJobBookmarks } from '@/hooks/useJobs';
import { useAuth } from '@/hooks/useAuth';

const Jobs = () => {
  const { user } = useAuth();
  const { jobs, loading, error, fetchJobs } = useJobs();
  const { bookmarks, toggleBookmark } = useJobBookmarks();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const handleSearch = () => {
    fetchJobs({
      search: searchTerm,
      location: locationFilter,
      employmentType: typeFilter,
      experienceLevel: departmentFilter
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setDepartmentFilter('');
    setTypeFilter('');
    fetchJobs();
  };

  const formatSalary = (min?: number, max?: number, currency = 'CFA') => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}/month`;
    if (min) return `From ${min.toLocaleString()} ${currency}/month`;
    if (max) return `Up to ${max.toLocaleString()} ${currency}/month`;
    return 'Salary not specified';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  const experienceLevels = ['entry', 'mid', 'senior', 'lead'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

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
                    <SelectItem value="Bamako">Bamako, Mali</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Multiple">Multiple Locations</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="lg" className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100" onClick={handleSearch}>
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
                      <label className="block text-sm font-medium mb-2">Experience Level</label>
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Levels</SelectItem>
                          {experienceLevels.map(level => (
                            <SelectItem key={level} value={level}>
                              {level.charAt(0).toUpperCase() + level.slice(1)} Level
                            </SelectItem>
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
                          {employmentTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
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
                    {loading ? 'Loading...' : `${jobs.length} Job${jobs.length !== 1 ? 's' : ''} Found`}
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

                {error && (
                  <Card className="mb-6">
                    <CardContent className="p-6 text-center text-red-600">
                      <p>Error loading jobs: {error}</p>
                      <Button variant="outline" onClick={() => fetchJobs()} className="mt-2">
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-6">
                  {jobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={job.employment_type === 'Full-time' ? 'default' : 'secondary'}>
                                {job.employment_type}
                              </Badge>
                              {job.remote_allowed && (
                                <Badge className="bg-green-500">Remote OK</Badge>
                              )}
                              <Badge variant="outline" className="bg-blue-50">
                                {job.experience_level} level
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                              <Link to={`/jobs/${job.id}`} className="hover:text-purple-600 transition-colors">
                                {job.title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Posted {getTimeAgo(job.created_at)}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                            {job.skills && job.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {job.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="outline" className="bg-blue-50">
                                    {skill}
                                  </Badge>
                                ))}
                                {job.skills.length > 3 && (
                                  <Badge variant="outline" className="bg-gray-50">
                                    +{job.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Link to={`/jobs/${job.id}`}>
                              <Button>View Details</Button>
                            </Link>
                            {user && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleBookmark(job.id)}
                                className="flex items-center gap-2"
                              >
                                {bookmarks.includes(job.id) ? (
                                  <>
                                    <BookmarkCheck className="h-4 w-4" />
                                    Saved
                                  </>
                                ) : (
                                  <>
                                    <Bookmark className="h-4 w-4" />
                                    Save Job
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {!loading && jobs.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search criteria or browse all available positions.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={clearFilters}
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
