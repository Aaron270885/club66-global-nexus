
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { ArrowLeft, Briefcase, MapPin, Calendar, Clock, Mail, Share2, Bookmark, DollarSign, GraduationCap, Award, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { jobListings } from '@/data/jobListings';
import { useToast } from '@/hooks/use-toast';
import JobApplicationForm from '@/components/jobs/JobApplicationForm';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Find job by ID
  const job = jobListings.find(job => job.id === Number(id));
  
  if (!job) {
    return (
      <Layout>
        <PremiumBanner
          title="Job Not Found"
          description="The job listing you are looking for does not exist or has been removed."
          showBackButton
          backUrl="/jobs"
        >
          <Link to="/jobs">
            <Button size="lg" className="mt-4">Return to Jobs</Button>
          </Link>
        </PremiumBanner>
      </Layout>
    );
  }

  const handleSaveJob = () => {
    toast({
      title: "Job saved to your profile",
      description: "You can view your saved jobs in your dashboard."
    });
  };

  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this job with others."
    });
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleApplicationSuccess = () => {
    toast({
      title: "Application submitted successfully!",
      description: "Redirecting you back to jobs page."
    });
    setTimeout(() => {
      navigate('/jobs');
    }, 2000);
  };
  
  return (
    <Layout>
      <PremiumBanner
        title={job.title}
        description={`${job.department} • ${job.location} • $${job.salary}/month`}
        showBackButton
        backUrl="/jobs"
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button size="lg" onClick={handleApply}>
            Apply Now
          </Button>
          <Button variant="outline" size="lg" onClick={handleSaveJob} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Bookmark className="h-4 w-4 mr-2" />
            Save Job
          </Button>
          <Button variant="outline" size="lg" onClick={handleShareJob} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </PremiumBanner>
      
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-10 w-full">
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'} className="mb-2">
                    {job.type}
                  </Badge>
                  <CardTitle className="text-2xl mb-1">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1.5" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      <span>Posted {job.posted}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1.5" />
                      <span>${job.salary}/month</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold text-xl mb-3">Job Description</h3>
                  <p className="text-gray-700 mb-4">{job.detailedDescription || job.description}</p>
                </div>
                
                {job.responsibilities && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="text-sm text-gray-700">{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.qualifications && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.qualifications.map((qual, index) => (
                        <li key={index} className="text-sm text-gray-700">{qual}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
                
                {job.benefits && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 flex items-center mb-1">
                      <GraduationCap className="h-4 w-4 mr-1.5" />
                      Experience Level
                    </span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 flex items-center mb-1">
                      <Award className="h-4 w-4 mr-1.5" />
                      Certifications
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.certifications.map(cert => (
                        <Badge key={cert} variant="outline" className="bg-purple-50">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 flex items-center mb-1">
                      <Code className="h-4 w-4 mr-1.5" />
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.technologies.map(tech => (
                        <Badge key={tech} variant="outline" className="bg-green-50">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-sm text-gray-600 mb-4 md:mb-0">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>Application Deadline: {job.applicationDeadline || 'Open until filled'}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1.5" />
                      <span>Contact: {job.contactEmail || 'careers@club66.com'}</span>
                    </div>
                  </div>
                  
                  <Button size="lg" onClick={handleApply}>
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {showApplicationForm && (
              <JobApplicationForm 
                jobId={job.id} 
                jobTitle={job.title}
                onClose={() => setShowApplicationForm(false)}
                onSuccess={handleApplicationSuccess}
              />
            )}
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">About the Company</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {job.company?.logo ? (
                    <img 
                      src={job.company.logo} 
                      alt={job.company?.name || "Company Logo"} 
                      className="w-16 h-16 object-contain mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md mr-4">
                      <Briefcase className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{job.company?.name || "Club66 Global"}</h3>
                    <p className="text-sm text-gray-600">
                      {job.company?.description || "Club66 Global is transforming membership benefits and financial access across Africa."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">Interested in other opportunities at Club66 Global?</p>
              <Link to="/jobs">
                <Button variant="outline">
                  View All Positions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;
