
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, AlertTriangle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jobListings } from '@/data/jobListings';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface JobPostingFormProps {
  jobId?: number | null;
  onClose: () => void;
}

const jobPostingFormSchema = z.object({
  title: z.string().min(3, { message: 'Job title must be at least 3 characters.' }),
  department: z.string().min(1, { message: 'Please select a department.' }),
  location: z.string().min(1, { message: 'Please enter a location.' }),
  type: z.string().min(1, { message: 'Please select job type.' }),
  salary: z.coerce.number().int().positive({ message: 'Salary must be a positive number.' }),
  experience: z.string().min(1, { message: 'Please select experience level.' }),
  description: z.string().min(20, { message: 'Job description must be at least 20 characters.' }),
  responsibilities: z.string().min(20, { message: 'Responsibilities must be at least 20 characters.' }),
  requirements: z.string().min(20, { message: 'Requirements must be at least 20 characters.' }),
  benefits: z.string().optional(),
  applicationDeadline: z.string().optional(),
  contactEmail: z.string().email({ message: 'Please enter a valid email.' }).optional(),
  technologies: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  status: z.enum(['Active', 'Draft'])
});

type JobPostingFormValues = z.infer<typeof jobPostingFormSchema>;

const JobPostingForm = ({ jobId, onClose }: JobPostingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customTechnologies, setCustomTechnologies] = useState<string[]>([]);
  const [customCertifications, setCustomCertifications] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [newCert, setNewCert] = useState('');
  
  // Find existing job if editing
  const existingJob = jobId ? jobListings.find(job => job.id === jobId) : null;
  
  // Available departments
  const departments = [
    'Sales',
    'Marketing',
    'Customer Service',
    'Technology',
    'Finance',
    'Partnerships',
    'Human Resources',
    'Operations'
  ];
  
  // Available experience levels
  const experienceLevels = [
    'Entry-level',
    'Mid-level',
    'Senior-level',
    'Manager',
    'Executive'
  ];
  
  // Common technologies
  const commonTechnologies = [
    'MS Office',
    'CRM Software',
    'JavaScript',
    'React',
    'Python',
    'Excel',
    'Salesforce',
    'HubSpot',
    'Adobe Creative Suite',
    'Social Media Tools'
  ];
  
  // Common certifications
  const commonCertifications = [
    'Sales Certification',
    'Customer Service Certification',
    'Digital Marketing Certification',
    'Project Management Professional (PMP)',
    'AWS Certification',
    'Google Analytics Certification',
    'Accounting Certification',
    'Leadership Certification'
  ];
  
  // Create form with default values
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingFormSchema),
    defaultValues: existingJob ? {
      title: existingJob.title || '',
      department: existingJob.department || '',
      location: existingJob.location || '',
      type: existingJob.type || 'Full-time',
      salary: existingJob.salary || 0,
      experience: existingJob.experience || '',
      description: existingJob.description || '',
      responsibilities: existingJob.responsibilities?.join('\n\n') || '',
      requirements: existingJob.requirements.join('\n\n') || '',
      benefits: existingJob.benefits?.join('\n\n') || '',
      applicationDeadline: existingJob.applicationDeadline || '',
      contactEmail: existingJob.contactEmail || '',
      technologies: existingJob.technologies || [],
      certifications: existingJob.certifications || [],
      status: 'Active'
    } : {
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      salary: 0,
      experience: '',
      description: '',
      responsibilities: '',
      requirements: '',
      benefits: '',
      applicationDeadline: '',
      contactEmail: '',
      technologies: [],
      certifications: [],
      status: 'Draft'
    }
  });
  
  // Initialize custom arrays from existing job
  React.useEffect(() => {
    if (existingJob) {
      setCustomTechnologies(existingJob.technologies || []);
      setCustomCertifications(existingJob.certifications || []);
    }
  }, [existingJob]);
  
  // Handle adding new technology
  const handleAddTechnology = () => {
    if (newTech && !customTechnologies.includes(newTech)) {
      const updatedTechs = [...customTechnologies, newTech];
      setCustomTechnologies(updatedTechs);
      form.setValue('technologies', updatedTechs);
      setNewTech('');
    }
  };
  
  // Handle adding new certification
  const handleAddCertification = () => {
    if (newCert && !customCertifications.includes(newCert)) {
      const updatedCerts = [...customCertifications, newCert];
      setCustomCertifications(updatedCerts);
      form.setValue('certifications', updatedCerts);
      setNewCert('');
    }
  };
  
  // Handle technology selection
  const handleTechnologyChange = (tech: string, checked: boolean) => {
    const updatedTechs = checked
      ? [...customTechnologies, tech]
      : customTechnologies.filter(t => t !== tech);
    setCustomTechnologies(updatedTechs);
    form.setValue('technologies', updatedTechs);
  };
  
  // Handle certification selection
  const handleCertificationChange = (cert: string, checked: boolean) => {
    const updatedCerts = checked
      ? [...customCertifications, cert]
      : customCertifications.filter(c => c !== cert);
    setCustomCertifications(updatedCerts);
    form.setValue('certifications', updatedCerts);
  };
  
  // Remove custom technology or certification
  const handleRemoveItem = (item: string, type: 'tech' | 'cert') => {
    if (type === 'tech') {
      const updated = customTechnologies.filter(t => t !== item);
      setCustomTechnologies(updated);
      form.setValue('technologies', updated);
    } else {
      const updated = customCertifications.filter(c => c !== item);
      setCustomCertifications(updated);
      form.setValue('certifications', updated);
    }
  };
  
  // Form submission handler
  const onSubmit = (data: JobPostingFormValues) => {
    setIsSubmitting(true);
    
    // Transform responsibilities, requirements and benefits from text to arrays
    const formattedData = {
      ...data,
      responsibilities: data.responsibilities.split('\n\n').filter(item => item.trim() !== ''),
      requirements: data.requirements.split('\n\n').filter(item => item.trim() !== ''),
      benefits: data.benefits ? data.benefits.split('\n\n').filter(item => item.trim() !== '') : undefined,
    };
    
    // In a real app, we would send this to an API
    setTimeout(() => {
      console.log('Job posting data:', formattedData);
      setIsSubmitting(false);
      
      toast({
        title: existingJob ? 'Job Updated' : 'Job Created',
        description: existingJob 
          ? `"${data.title}" has been updated successfully.`
          : `"${data.title}" has been ${data.status === 'Active' ? 'published' : 'saved as draft'}.`,
      });
      
      onClose();
    }, 1000);
  };
  
  // Check if form has unsaved changes before closing
  const handleDismiss = () => {
    if (form.formState.isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={handleDismiss}>
      <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {existingJob ? `Edit Job: ${existingJob.title}` : 'Create New Job Posting'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Basic Details</TabsTrigger>
                  <TabsTrigger value="description">Job Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Marketing Manager" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department*</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {departments.map(dept => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Bamako, Mali or Remote" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Type*</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="flex flex-wrap gap-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Full-time" id="full-time" />
                                    <label htmlFor="full-time">Full-time</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Part-time" id="part-time" />
                                    <label htmlFor="part-time">Part-time</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Contract" id="contract" />
                                    <label htmlFor="contract">Contract</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Internship" id="internship" />
                                    <label htmlFor="internship">Internship</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="salary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Salary (USD)*</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="e.g. 1500" 
                                  {...field} 
                                  onChange={e => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience Level*</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {experienceLevels.map(level => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="description" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Description*</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe the job role and purpose..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Provide a clear overview of the job role and responsibilities.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="responsibilities"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Responsibilities*</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List key responsibilities, separated by blank lines..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Separate each responsibility with a blank line. These will be displayed as bullet points.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="benefits"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Benefits (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List benefits, separated by blank lines..."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Separate each benefit with a blank line. These will be displayed as bullet points.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Requirements*</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List job requirements, separated by blank lines..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Separate each requirement with a blank line. These will be displayed as bullet points.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-3">Technologies & Skills</h4>
                          <div className="mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                              {commonTechnologies.map(tech => (
                                <div key={tech} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`tech-${tech}`} 
                                    checked={customTechnologies.includes(tech)}
                                    onCheckedChange={(checked) => 
                                      handleTechnologyChange(tech, checked === true)
                                    }
                                  />
                                  <label 
                                    htmlFor={`tech-${tech}`}
                                    className="text-sm"
                                  >
                                    {tech}
                                  </label>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Input 
                                placeholder="Add custom technology..." 
                                className="max-w-xs"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTechnology();
                                  }
                                }}
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={handleAddTechnology}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </Button>
                            </div>
                            
                            {customTechnologies.length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm text-gray-500 mb-2">Selected Technologies:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {customTechnologies.map(tech => (
                                    <Badge key={tech} variant="outline" className="bg-gray-50 pl-2 pr-1 py-1 flex items-center">
                                      <span>{tech}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1"
                                        onClick={() => handleRemoveItem(tech, 'tech')}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium mb-3">Certifications</h4>
                          <div className="mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                              {commonCertifications.map(cert => (
                                <div key={cert} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`cert-${cert}`} 
                                    checked={customCertifications.includes(cert)}
                                    onCheckedChange={(checked) => 
                                      handleCertificationChange(cert, checked === true)
                                    }
                                  />
                                  <label 
                                    htmlFor={`cert-${cert}`}
                                    className="text-sm"
                                  >
                                    {cert}
                                  </label>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Input 
                                placeholder="Add custom certification..." 
                                className="max-w-xs"
                                value={newCert}
                                onChange={(e) => setNewCert(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCertification();
                                  }
                                }}
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={handleAddCertification}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </Button>
                            </div>
                            
                            {customCertifications.length > 0 && (
                              <div className="mt-3">
                                <h5 className="text-sm text-gray-500 mb-2">Selected Certifications:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {customCertifications.map(cert => (
                                    <Badge key={cert} variant="outline" className="bg-gray-50 pl-2 pr-1 py-1 flex items-center">
                                      <span>{cert}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1"
                                        onClick={() => handleRemoveItem(cert, 'cert')}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="applicationDeadline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Application Deadline</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormDescription>
                                Leave blank to keep job post open until filled.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="e.g. careers@company.com" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Email where applications will be sent.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Post Status</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Active" id="active" />
                                    <label htmlFor="active">Active - Post immediately</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Draft" id="draft" />
                                    <label htmlFor="draft">Draft - Save for later</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
        
        <DialogFooter className="flex items-center">
          {form.formState.isDirty && !isSubmitting && (
            <div className="flex items-center text-amber-600 mr-auto text-sm">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Unsaved changes</span>
            </div>
          )}
          
          <Button variant="outline" type="button" onClick={handleDismiss} disabled={isSubmitting}>
            Cancel
          </Button>
          
          <Button 
            type="submit" 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Submitting...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {existingJob ? 'Update Job' : 'Create Job'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobPostingForm;
