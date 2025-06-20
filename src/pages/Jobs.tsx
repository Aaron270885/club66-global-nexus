
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Bookmark, Building, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs, useJobBookmarks } from '@/hooks/useJobs';
import { dummyJobs } from '@/data/dummyJobs';

const Jobs = () => {
  const { jobs, loading, error, searchJobs } = useJobs();
  const { bookmarks, toggleBookmark } = useJobBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [displayJobs, setDisplayJobs] = useState(dummyJobs);

  useEffect(() => {
    // Use dummy jobs for now since the database might not have job data
    setDisplayJobs(dummyJobs);
  }, []);

  const handleSearch = () => {
    searchJobs({
      title: searchTerm,
      location: locationFilter,
      type: typeFilter,
      experience: experienceFilter,
    });
  };

  const formatSalary = (min?: number, max?: number, currency = 'CFA') => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    return `${currency} ${(min || max)?.toLocaleString()}`;
  };

  const getExperienceText = (level: string) => {
    switch (level) {
      case 'entry': return 'Entry Level';
      case 'mid': return 'Mid Level';
      case 'senior': return 'Senior Level';
      default: return level;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading jobs...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exciting career opportunities across West Africa with Club66 Global's job portal.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, company, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button onClick={handleSearch} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-6">
            {displayJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">
                          <Link to={`/jobs/${job.id}`} className="hover:text-purple-600">
                            {job.title}
                          </Link>
                        </CardTitle>
                        {job.featured && (
                          <Badge className="bg-yellow-500 text-white">Featured</Badge>
                        )}
                        {job.urgent && (
                          <Badge className="bg-red-500 text-white">Urgent</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                        {job.remote_allowed && (
                          <Badge variant="outline" className="ml-2">Remote</Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(job.id)}
                      className={bookmarks.includes(job.id) ? 'text-purple-600' : ''}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {job.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{job.employment_type}</Badge>
                    <Badge variant="outline">{getExperienceText(job.experience_level)}</Badge>
                    {job.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-medium">
                        {formatSalary(job.salary_min, job.salary_max, job.currency)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button asChild className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Link to={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Quick Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Jobs</span>
                    <span className="font-medium">{displayJobs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New This Week</span>
                    <span className="font-medium text-green-600">
                      {displayJobs.filter(job => 
                        new Date(job.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remote Jobs</span>
                    <span className="font-medium">
                      {displayJobs.filter(job => job.remote_allowed).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Companies */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(displayJobs.map(job => job.company))).slice(0, 5).map((company) => (
                    <div key={company} className="flex justify-between items-center">
                      <span>{company}</span>
                      <Badge variant="outline">
                        {displayJobs.filter(job => job.company === company).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Job Alerts</CardTitle>
                <CardDescription>
                  Get notified about new jobs matching your criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Create Job Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
