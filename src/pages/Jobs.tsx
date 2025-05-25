import { useState } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Users, Mail, SlidersHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { jobListings } from '@/data/jobListings'; 

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    jobType: '',
    salaryRange: [0, 3000],
    experience: [],
    certification: [],
    technology: [],
  });
  
  // Unique values for filter options
  const departments = [...new Set(jobListings.map(job => job.department))];
  const locations = [...new Set(jobListings.map(job => job.location))];
  const jobTypes = [...new Set(jobListings.map(job => job.type))];
  const experienceLevels = [...new Set(jobListings.map(job => job.experience))];
  const certifications = [...new Set(jobListings.flatMap(job => job.certifications))];
  const technologies = [...new Set(jobListings.flatMap(job => job.technologies))];
  
  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleCheckboxFilterChange = (category, value, isChecked) => {
    setFilters(prev => ({
      ...prev,
      [category]: isChecked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };
  
  // Apply filters
  const filteredJobs = jobListings.filter(job => {
    // Text search filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Department filter
    const matchesDepartment = 
      !filters.department || job.department === filters.department;
    
    // Location filter
    const matchesLocation = 
      !filters.location || job.location === filters.location;
    
    // Job type filter
    const matchesJobType = 
      !filters.jobType || job.type === filters.jobType;
    
    // Salary range filter
    const matchesSalary = 
      job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1];
    
    // Experience filter
    const matchesExperience = 
      filters.experience.length === 0 || filters.experience.includes(job.experience);
    
    // Certification filter
    const matchesCertification = 
      filters.certification.length === 0 || 
      job.certifications.some(cert => filters.certification.includes(cert));
    
    // Technology filter
    const matchesTechnology = 
      filters.technology.length === 0 || 
      job.technologies.some(tech => filters.technology.includes(tech));
    
    return matchesSearch && matchesDepartment && matchesLocation && 
           matchesJobType && matchesSalary && matchesExperience && 
           matchesCertification && matchesTechnology;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      department: '',
      location: '',
      jobType: '',
      salaryRange: [0, 3000],
      experience: [],
      certification: [],
      technology: [],
    });
    setSearchTerm('');
  };
  
  return (
    <Layout>
      {/* Premium Banner with Search */}
      <PremiumBanner
        title="Find Your Dream Career"
        description="Join Club66 Global and be part of a team transforming membership benefits across Africa."
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            type="text" 
            placeholder="Search jobs by title, department or location..." 
            className="pl-10 h-12 text-black bg-white/95 border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="absolute right-1 top-1 bottom-1 px-6">
            Search
          </Button>
        </div>
      </PremiumBanner>
      
      <div className="py-12 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mb-4">
              <Link to="/job-dashboard/employee">
                <Button variant="outline" className="mr-2">Job Seeker Portal</Button>
              </Link>
              <Link to="/job-dashboard/employer">
                <Button>Employer Portal</Button>
              </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side filters - Mobile toggle */}
              <div className="lg:hidden w-full mb-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-between"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter Jobs
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              {/* Left side filters panel */}
              <div className={`lg:w-1/4 bg-white rounded-lg shadow-md border border-gray-100 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </h2>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <Accordion type="multiple" defaultValue={["salary", "department", "location", "jobType", "experience", "certification", "technology"]}>
                    {/* Salary Range Filter */}
                    <AccordionItem value="salary">
                      <AccordionTrigger className="text-sm py-2">Salary Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Slider 
                            value={filters.salaryRange}
                            min={0}
                            max={3000}
                            step={100}
                            onValueChange={(value) => handleFilterChange('salaryRange', value)}
                          />
                          <div className="flex items-center justify-between text-sm">
                            <span>${filters.salaryRange[0]}</span>
                            <span>${filters.salaryRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Department Filter */}
                    <AccordionItem value="department">
                      <AccordionTrigger className="text-sm py-2">Department</AccordionTrigger>
                      <AccordionContent>
                        <Select 
                          value={filters.department} 
                          onValueChange={(value) => handleFilterChange('department', value)}
                        >
                          <SelectTrigger className="w-full text-sm">
                            <SelectValue placeholder="All Departments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Departments</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Location Filter */}
                    <AccordionItem value="location">
                      <AccordionTrigger className="text-sm py-2">Location</AccordionTrigger>
                      <AccordionContent>
                        <Select 
                          value={filters.location} 
                          onValueChange={(value) => handleFilterChange('location', value)}
                        >
                          <SelectTrigger className="w-full text-sm">
                            <SelectValue placeholder="All Locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Locations</SelectItem>
                            {locations.map(location => (
                              <SelectItem key={location} value={location}>{location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Job Type Filter */}
                    <AccordionItem value="jobType">
                      <AccordionTrigger className="text-sm py-2">Job Type</AccordionTrigger>
                      <AccordionContent>
                        <Select 
                          value={filters.jobType} 
                          onValueChange={(value) => handleFilterChange('jobType', value)}
                        >
                          <SelectTrigger className="w-full text-sm">
                            <SelectValue placeholder="All Job Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Job Types</SelectItem>
                            {jobTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Experience Level Filter */}
                    <AccordionItem value="experience">
                      <AccordionTrigger className="text-sm py-2">Experience Level</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {experienceLevels.map(exp => (
                            <div key={exp} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`exp-${exp}`} 
                                checked={filters.experience.includes(exp)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxFilterChange('experience', exp, checked)
                                }
                              />
                              <label 
                                htmlFor={`exp-${exp}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {exp}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Certification Filter */}
                    <AccordionItem value="certification">
                      <AccordionTrigger className="text-sm py-2">Certifications</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {certifications.map(cert => (
                            <div key={cert} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`cert-${cert}`} 
                                checked={filters.certification.includes(cert)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxFilterChange('certification', cert, checked)
                                }
                              />
                              <label 
                                htmlFor={`cert-${cert}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {cert}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {/* Technology Filter */}
                    <AccordionItem value="technology">
                      <AccordionTrigger className="text-sm py-2">Technologies</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {technologies.map(tech => (
                            <div key={tech} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`tech-${tech}`} 
                                checked={filters.technology.includes(tech)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxFilterChange('technology', tech, checked)
                                }
                              />
                              <label 
                                htmlFor={`tech-${tech}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tech}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              
              {/* Right side job listings */}
              <div className="flex-grow">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map(job => (
                    <Link 
                      key={job.id} 
                      to={`/jobs/${job.id}`}
                      className="block w-[300px] mx-auto"
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardHeader className="bg-gray-50 border-b">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500 gap-1">
                              <div className="flex items-center">
                                <Briefcase className="h-3 w-3 mr-1" />
                                <span>{job.department}</span>
                              </div>
                              <span className="mx-1">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={job.type === "Full-time" ? "default" : "secondary"} className="absolute top-3 right-3">
                            {job.type}
                          </Badge>
                        </CardHeader>
                        <CardContent className="py-3">
                          <p className="text-gray-600 text-sm line-clamp-2">{job.description}</p>
                          <div className="mt-3">
                            <Badge variant="outline" className="mr-1 mb-1 text-xs">{job.experience}</Badge>
                            {job.technologies.slice(0, 2).map(tech => (
                              <Badge key={tech} variant="outline" className="mr-1 mb-1 text-xs bg-green-50">{tech}</Badge>
                            ))}
                            {job.technologies.length > 2 && (
                              <Badge variant="outline" className="mr-1 mb-1 text-xs bg-gray-50">+{job.technologies.length - 2}</Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 flex justify-between items-center py-2">
                          <span className="text-sm font-medium text-green-600">${job.salary}/month</span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{job.posted}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                {filteredJobs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="mb-4">
                      <Search className="h-12 w-12 mx-auto text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No jobs match your criteria</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                    <Button variant="outline" onClick={resetFilters}>Clear Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16">
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
