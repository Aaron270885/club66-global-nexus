
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowLeft,
  Briefcase,
  Calendar,
  Globe,
  Send,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { useJobDetails, useJobBookmarks, useJobApplications } from '@/hooks/useJobs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { job, loading, error } = useJobDetails(id || '');
  const { bookmarks, toggleBookmark } = useJobBookmarks();
  const { applyToJob } = useJobApplications();
  
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    expectedSalary: '',
    availableFrom: '',
    experienceYears: '',
    portfolioUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async () => {
    if (!job || !user) return;

    try {
      setIsSubmitting(true);
      await applyToJob(job.id, {
        coverLetter: applicationData.coverLetter,
        expectedSalary: applicationData.expectedSalary ? parseInt(applicationData.expectedSalary) : undefined,
        availableFrom: applicationData.availableFrom,
        experienceYears: applicationData.experienceYears ? parseInt(applicationData.experienceYears) : undefined,
        portfolioUrl: applicationData.portfolioUrl
      });

      toast.success('Application submitted successfully!');
      setIsApplyDialogOpen(false);
      setApplicationData({
        coverLetter: '',
        expectedSalary: '',
        availableFrom: '',
        experienceYears: '',
        portfolioUrl: ''
      });
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
      console.error('Application error:', err);
    } finally {
      setIsSubmitting(false);
    }
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

  if (loading) {
    return (
      <Layout>
        <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading job details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
              <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
              <Link to="/jobs">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/jobs" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>

            {/* Job Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
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
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Posted {getTimeAgo(job.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 ml-6">
                    {user ? (
                      <>
                        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Apply for {job.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="coverLetter">Cover Letter</Label>
                                <Textarea
                                  id="coverLetter"
                                  placeholder="Tell us why you're interested in this position..."
                                  value={applicationData.coverLetter}
                                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                                  rows={4}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="expectedSalary">Expected Salary (CFA)</Label>
                                  <Input
                                    id="expectedSalary"
                                    type="number"
                                    placeholder="120000"
                                    value={applicationData.expectedSalary}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="experienceYears">Years of Experience</Label>
                                  <Input
                                    id="experienceYears"
                                    type="number"
                                    placeholder="3"
                                    value={applicationData.experienceYears}
                                    onChange={(e) => setApplicationData(prev => ({ ...prev, experienceYears: e.target.value }))}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="availableFrom">Available From</Label>
                                <Input
                                  id="availableFrom"
                                  type="date"
                                  value={applicationData.availableFrom}
                                  onChange={(e) => setApplicationData(prev => ({ ...prev, availableFrom: e.target.value }))}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="portfolioUrl">Portfolio URL (Optional)</Label>
                                <Input
                                  id="portfolioUrl"
                                  type="url"
                                  placeholder="https://yourportfolio.com"
                                  value={applicationData.portfolioUrl}
                                  onChange={(e) => setApplicationData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                                />
                              </div>
                              
                              <div className="flex gap-3 pt-4">
                                <Button 
                                  onClick={handleApply} 
                                  disabled={isSubmitting}
                                  className="flex-1"
                                >
                                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setIsApplyDialogOpen(false)}
                                  disabled={isSubmitting}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
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
                      </>
                    ) : (
                      <Link to="/login">
                        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                          Login to Apply
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Job Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{job.application_count} applications</span>
                  </div>
                  {job.application_deadline && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Deadline: {new Date(job.application_deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-wrap">{job.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements */}
                {job.requirements && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{job.requirements}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{job.benefits}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-blue-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Company Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {job.company}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    {job.remote_allowed && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Remote work allowed</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/job-dashboard/employee" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Briefcase className="h-4 w-4 mr-2" />
                        View My Applications
                      </Button>
                    </Link>
                    <Link to="/jobs" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Job Search
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;
