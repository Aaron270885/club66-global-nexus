
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  User, 
  FileText, 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  Upload,
  Edit3,
  Eye,
  BookmarkPlus,
  Plus,
  Trash2
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useJobApplications, useJobBookmarks } from '@/hooks/useJobs';
import { useUserProfile } from '@/hooks/useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EmployeeDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { getUserApplications } = useJobApplications();
  const { bookmarks, fetchBookmarks } = useJobBookmarks();
  const { profile, skills, experience, education, loading: profileLoading, updateProfile, addSkill, addExperience, addEducation } = useUserProfile();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    country: 'Mali'
  });

  const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' });
  const [newExperience, setNewExperience] = useState({
    company_name: '',
    position: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: ''
  });
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    is_current: false,
    grade: ''
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || 'Mali'
      });
    }
  }, [profile]);

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch applications
      const applicationsData = await getUserApplications();
      setApplications(applicationsData);

      // Fetch saved jobs
      const { data: bookmarksData } = await supabase
        .from('job_bookmarks')
        .select(`
          job_id,
          jobs (
            id,
            title,
            company,
            location,
            salary_min,
            salary_max,
            currency,
            employment_type,
            created_at
          )
        `)
        .eq('user_id', user.id);

      setSavedJobs(bookmarksData?.map(b => b.jobs).filter(Boolean) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applicationStats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    interviews: applications.filter(app => app.status === 'interview').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interview':
        return <Badge className="bg-blue-500">Interview</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    
    try {
      await addSkill(newSkill.name, newSkill.level);
      setNewSkill({ name: '', level: 'beginner' });
      toast.success('Skill added successfully!');
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.company_name || !newExperience.position || !newExperience.start_date) return;
    
    try {
      await addExperience(newExperience);
      setNewExperience({
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: ''
      });
      toast.success('Experience added successfully!');
    } catch (error) {
      toast.error('Failed to add experience');
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEducation.institution || !newEducation.degree || !newEducation.start_date) return;
    
    try {
      await addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        is_current: false,
        grade: ''
      });
      toast.success('Education added successfully!');
    } catch (error) {
      toast.error('Failed to add education');
    }
  };

  if (authLoading || profileLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <PremiumBanner
        title="Job Seeker Dashboard"
        description="Manage your job applications, profile, and career opportunities all in one place."
        backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      >
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/jobs">
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Link to="/job-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Center
            </Link>
          </Button>
        </div>
      </PremiumBanner>

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{applicationStats.total}</div>
                      <div className="text-gray-600">Total Applications</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="text-3xl font-bold text-yellow-600 mb-1">{applicationStats.pending}</div>
                      <div className="text-gray-600">Pending</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{applicationStats.interviews}</div>
                      <div className="text-gray-600">Interviews</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <XCircle className="h-8 w-8 text-red-600" />
                      </div>
                      <div className="text-3xl font-bold text-red-600 mb-1">{applicationStats.rejected}</div>
                      <div className="text-gray-600">Rejected</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.slice(0, 5).map((application) => (
                          <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="font-semibold">{application.jobs?.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {application.jobs?.company}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {application.jobs?.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Applied {getTimeAgo(application.applied_at)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(application.status)}
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/jobs/${application.job_id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                        <p className="text-gray-500 mb-4">Start applying to jobs to track your applications here.</p>
                        <Button asChild>
                          <Link to="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Job Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.map((application) => (
                          <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="font-semibold">{application.jobs?.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {application.jobs?.company}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {application.jobs?.location}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Applied {getTimeAgo(application.applied_at)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(application.status)}
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/jobs/${application.job_id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                        <p className="text-gray-500 mb-4">Start applying to jobs to track your applications here.</p>
                        <Button asChild>
                          <Link to="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {savedJobs.length > 0 ? (
                      <div className="space-y-4">
                        {savedJobs.map((job) => (
                          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="font-semibold">{job.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {job.company}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.location}
                                </span>
                                <span>Posted {getTimeAgo(job.created_at)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="font-semibold">
                                  {job.salary_min && job.salary_max 
                                    ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.currency}/month`
                                    : 'Salary not specified'
                                  }
                                </div>
                              </div>
                              <Button size="sm" asChild>
                                <Link to={`/jobs/${job.id}`}>View Job</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookmarkPlus className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Jobs</h3>
                        <p className="text-gray-500 mb-4">Save interesting jobs to view them later.</p>
                        <Button asChild>
                          <Link to="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <Input 
                            placeholder="Enter your full name" 
                            value={profileData.full_name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <Input 
                            placeholder="Enter your phone number" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Address</label>
                          <Input 
                            placeholder="Enter your address" 
                            value={profileData.address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <Input 
                            placeholder="Enter your city" 
                            value={profileData.city}
                            onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                      </div>
                      <Button type="submit">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill.id} variant="outline" className="bg-blue-50">
                          {skill.skill_name} ({skill.experience_level})
                        </Badge>
                      ))}
                    </div>
                    
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <Input
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                        className="flex-1"
                      />
                      <select
                        value={newSkill.level}
                        onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                      <Button type="submit" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company_name}</p>
                        <p className="text-sm text-gray-500">
                          {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                        </p>
                        {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                      </div>
                    ))}
                    
                    <form onSubmit={handleAddExperience} className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Add Experience</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Company name"
                          value={newExperience.company_name}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, company_name: e.target.value }))}
                        />
                        <Input
                          placeholder="Position"
                          value={newExperience.position}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                        />
                        <Input
                          type="date"
                          placeholder="Start date"
                          value={newExperience.start_date}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                        <Input
                          type="date"
                          placeholder="End date"
                          value={newExperience.end_date}
                          onChange={(e) => setNewExperience(prev => ({ ...prev, end_date: e.target.value }))}
                          disabled={newExperience.is_current}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="current"
                          checked={newExperience.is_current}
                          onChange={(e) => setNewExperience(prev => ({ 
                            ...prev, 
                            is_current: e.target.checked,
                            end_date: e.target.checked ? '' : prev.end_date
                          }))}
                        />
                        <label htmlFor="current" className="text-sm">I currently work here</label>
                      </div>
                      <Textarea
                        placeholder="Description (optional)"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                      <Button type="submit" size="sm">Add Experience</Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-green-200 pl-4 pb-4">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        {edu.field_of_study && <p className="text-gray-600">{edu.field_of_study}</p>}
                        <p className="text-sm text-gray-500">
                          {edu.start_date} - {edu.is_current ? 'Present' : edu.end_date}
                        </p>
                        {edu.grade && <p className="text-sm text-gray-500">Grade: {edu.grade}</p>}
                      </div>
                    ))}
                    
                    <form onSubmit={handleAddEducation} className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Add Education</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Institution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                        />
                        <Input
                          placeholder="Degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                        />
                        <Input
                          placeholder="Field of study"
                          value={newEducation.field_of_study}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, field_of_study: e.target.value }))}
                        />
                        <Input
                          placeholder="Grade (optional)"
                          value={newEducation.grade}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, grade: e.target.value }))}
                        />
                        <Input
                          type="date"
                          placeholder="Start date"
                          value={newEducation.start_date}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                        <Input
                          type="date"
                          placeholder="End date"
                          value={newEducation.end_date}
                          onChange={(e) => setNewEducation(prev => ({ ...prev, end_date: e.target.value }))}
                          disabled={newEducation.is_current}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="currentEdu"
                          checked={newEducation.is_current}
                          onChange={(e) => setNewEducation(prev => ({ 
                            ...prev, 
                            is_current: e.target.checked,
                            end_date: e.target.checked ? '' : prev.end_date
                          }))}
                        />
                        <label htmlFor="currentEdu" className="text-sm">I currently study here</label>
                      </div>
                      <Button type="submit" size="sm">Add Education</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resume" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                      <p className="text-gray-600 mb-4">Upload a PDF or Word document (Max 5MB)</p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-blue-600 mr-3" />
                          <div>
                            <h4 className="font-semibold">Current Resume.pdf</h4>
                            <p className="text-sm text-gray-600">Uploaded 2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
