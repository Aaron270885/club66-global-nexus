
import { useState } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter, ChevronDown, Users, Mail, SlidersHorizontal } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

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
  
  const jobListings = [
    {
      id: 1,
      title: "Field Sales Agent",
      department: "Sales",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "3 days ago",
      description: "Join our field sales team to promote Club66 Global memberships and recruit new members across Bamako.",
      requirements: ["High school diploma", "Excellent communication skills", "Sales experience preferred", "Fluency in French and Bambara"],
      salary: 800,
      experience: "Entry-level",
      certifications: ["Sales Certification"],
      technologies: ["CRM Software"]
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "1 week ago",
      description: "Handle customer inquiries, membership activation, and provide excellent service to our growing member base.",
      requirements: ["Bachelor's degree", "Customer service experience", "Strong problem-solving abilities", "Fluency in French and English"],
      salary: 1000,
      experience: "Mid-level",
      certifications: ["Customer Service Certification"],
      technologies: ["Zendesk", "Salesforce"]
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "2 weeks ago",
      description: "Coordinate marketing campaigns, social media, and promotional events for Club66 Global across Mali.",
      requirements: ["Bachelor's degree in Marketing or related field", "2+ years of marketing experience", "Social media expertise", "Graphic design skills a plus"],
      salary: 1200,
      experience: "Mid-level",
      certifications: ["Digital Marketing Certification"],
      technologies: ["Adobe Creative Suite", "HubSpot"]
    },
    {
      id: 4,
      title: "Mobile App Developer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      posted: "3 weeks ago",
      description: "Develop and maintain our mobile applications for iOS and Android platforms.",
      requirements: ["Bachelor's degree in Computer Science", "3+ years of mobile app development", "Experience with React Native", "Backend integration skills"],
      salary: 2500,
      experience: "Senior-level",
      certifications: ["AWS Certification", "Google Developer Certification"],
      technologies: ["React Native", "JavaScript", "Firebase"]
    },
    {
      id: 5,
      title: "Merchant Relations Manager",
      department: "Partnerships",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "1 month ago",
      description: "Develop and maintain relationships with merchant partners, negotiate discounts, and expand our partner network.",
      requirements: ["Bachelor's degree in Business", "3+ years in business development", "Strong negotiation skills", "Fluency in French and English"],
      salary: 1800,
      experience: "Senior-level",
      certifications: ["Business Management Certification"],
      technologies: ["CRM Software", "MS Office"]
    },
    {
      id: 6,
      title: "Field Agent Supervisor",
      department: "Sales",
      location: "Segou, Mali",
      type: "Full-time",
      posted: "2 days ago",
      description: "Supervise a team of field agents, set targets, monitor performance, and provide training and support.",
      requirements: ["Bachelor's degree", "2+ years of sales management", "Leadership abilities", "Fluency in French and Bambara"],
      salary: 1500,
      experience: "Mid-level",
      certifications: ["Sales Management Certification", "Leadership Certification"],
      technologies: ["Sales Analytics Tools", "CRM Software"]
    },
    {
      id: 7,
      title: "Finance Officer",
      department: "Finance",
      location: "Bamako, Mali",
      type: "Full-time",
      posted: "5 days ago",
      description: "Handle financial operations, payment processing, and reporting for Club66 Global Mali.",
      requirements: ["Bachelor's degree in Finance", "2+ years of finance experience", "Proficiency in accounting software", "Attention to detail"],
      salary: 1600,
      experience: "Mid-level",
      certifications: ["Accounting Certification"],
      technologies: ["QuickBooks", "Excel"]
    },
    {
      id: 8,
      title: "Social Media Assistant",
      department: "Marketing",
      location: "Bamako, Mali",
      type: "Part-time",
      posted: "1 week ago",
      description: "Create and schedule content for social media platforms, engage with followers, and track metrics.",
      requirements: ["Diploma in Marketing", "Social media management experience", "Creative content creation skills", "Fluency in French"],
      salary: 700,
      experience: "Entry-level",
      certifications: ["Social Media Marketing Certification"],
      technologies: ["Canva", "Hootsuite", "Buffer"]
    }
  ];
  
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
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Career Opportunities</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our team and be part of Club66 Global's mission to transform membership benefits 
            and financial access across Africa. We offer exciting career paths and growth opportunities.
          </p>
          
          <div className="max-w-6xl mx-auto mb-12">
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
              <div className={`lg:w-1/4 bg-white rounded-lg shadow-sm ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
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
                  <Accordion type="multiple" defaultValue={["salary", "department", "location", "jobType"]}>
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
                <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 whitespace-nowrap">Found {filteredJobs.length} jobs</span>
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
                            <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 gap-2">
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                <span>{job.department}</span>
                              </div>
                              <span className="mx-1">•</span>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <span className="mx-1">•</span>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                              {job.type}
                            </Badge>
                            <span className="text-sm font-medium text-green-600">${job.salary}/month</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-5">
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="text-sm text-gray-600">{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50">{job.experience}</Badge>
                          {job.certifications.map(cert => (
                            <Badge key={cert} variant="outline" className="bg-purple-50">{cert}</Badge>
                          ))}
                          {job.technologies.map(tech => (
                            <Badge key={tech} variant="outline" className="bg-green-50">{tech}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50 flex justify-between items-center">
                        <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                          Apply Now
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          Share <Mail className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

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
