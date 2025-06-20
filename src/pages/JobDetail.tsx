
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Users, Briefcase, Star, Heart, Share2, ChevronLeft, Calendar, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { dummyJobs } from '@/data/dummyJobs';
import JobApplicationForm from '@/components/jobs/JobApplicationForm';

const JobDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(dummyJobs.find(j => j.id === id));
  const [loading, setLoading] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(searchParams.get('apply') === 'true');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleApply = () => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }
    setShowApplicationForm(true);
  };

  const handleBookmark = () => {
    if (!user) {
      toast.error('Please login to bookmark jobs');
      navigate('/login');
      return;
    }
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Job removed from bookmarks' : 'Job bookmarked successfully');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard');
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min || !max) return 'Salary not specified';
    return `CFA ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const getExperienceLevel = (years: number) => {
    if (years === 0) return 'Entry Level';
    if (years <= 2) return 'Junior Level';
    if (years <= 5) return 'Mid Level';
    return 'Senior Level';
  };

  const daysAgo = job ? Math.floor((Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/jobs')}
            className="mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        {job.urgent && <Badge className="bg-red-100 text-red-800">Urgent</Badge>}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Posted {daysAgo} days ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBookmark}
                        className={isBookmarked ? 'text-red-500 border-red-200' : ''}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Salary</div>
                      <div className="font-semibold text-sm">{formatSalary(job.salary_min, job.salary_max)}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="font-semibold text-sm capitalize">{job.employment_type}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Experience</div>
                      <div className="font-semibold text-sm">{getExperienceLevel(job.experience_required)}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600">Applications</div>
                      <div className="font-semibold text-sm">{job.application_count}</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                      <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </div>

                    {job.requirements && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                        <p className="text-gray-700 leading-relaxed">{job.requirements}</p>
                      </div>
                    )}

                    {job.benefits && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                        <p className="text-gray-700 leading-relaxed">{job.benefits}</p>
                      </div>
                    )}

                    {job.skills && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Application Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Apply for this Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.application_deadline && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                      <Calendar className="h-4 w-4 text-yellow-600" />
                      <div>
                        <div className="font-medium">Application Deadline</div>
                        <div>{new Date(job.application_deadline).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleApply}
                  >
                    Apply Now
                  </Button>
                  
                  {job.remote_allowed && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                      <span>Remote work allowed</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About {job.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <Building className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold">{job.company}</h4>
                      <p className="text-sm text-gray-600">{job.location}</p>
                    </div>
                    <Separator />
                    <div className="text-sm text-gray-600 text-center">
                      A leading company in the industry, committed to innovation and excellence.
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dummyJobs
                      .filter(j => j.id !== job.id && j.experience_level === job.experience_level)
                      .slice(0, 3)
                      .map((similarJob) => (
                        <div key={similarJob.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <h5 className="font-medium text-sm">{similarJob.title}</h5>
                          <p className="text-xs text-gray-600">{similarJob.company}</p>
                          <p className="text-xs text-gray-500">{similarJob.location}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <JobApplicationForm
          jobId={parseInt(job.id)}
          jobTitle={job.title}
          onClose={() => setShowApplicationForm(false)}
          onSuccess={() => {
            toast.success('Application submitted successfully!');
            setShowApplicationForm(false);
          }}
        />
      )}
    </Layout>
  );
};

export default JobDetail;
