
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileUp, CheckCircle, XCircle, Upload, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

interface JobApplicationFormProps {
  jobId: number;
  jobTitle: string;
  onClose: () => void;
}

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Valid phone number is required" }),
  coverLetter: z.string().optional(),
  workExperience: z.string().optional(),
  education: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const JobApplicationForm = ({ jobId, jobTitle, onClose }: JobApplicationFormProps) => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [parsedResumeData, setParsedResumeData] = useState<Partial<FormValues> | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      workExperience: "",
      education: "",
    },
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setIsResumeUploaded(true);
      
      // Simulate resume parsing (in a real app, this would be a backend call)
      setTimeout(() => {
        // Mock parsed data from resume
        const mockParsedData = {
          fullName: "John Smith",
          email: "john.smith@example.com",
          phone: "+223 76123456",
          workExperience: "5 years of experience in sales and marketing. Previously worked at ABC Corp as Senior Marketing Specialist.",
          education: "Bachelor's degree in Business Administration from University of Mali, 2020."
        };
        
        setParsedResumeData(mockParsedData);
        
        // Auto-fill the form
        form.setValue("fullName", mockParsedData.fullName);
        form.setValue("email", mockParsedData.email);
        form.setValue("phone", mockParsedData.phone);
        form.setValue("workExperience", mockParsedData.workExperience);
        form.setValue("education", mockParsedData.education);
        
        toast({
          title: "Resume parsed successfully",
          description: "Your resume information has been auto-filled. Please review and edit as needed."
        });
      }, 1500);
    }
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission (would be a backend call in a real app)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessDialog(true);
      console.log("Application submitted:", {
        ...data,
        jobId,
        jobTitle,
        resumeFileName: resumeFile?.name
      });
    }, 2000);
  };

  return (
    <>
      <Card className="mb-6 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">Apply for: {jobTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className={`p-2 rounded-full ${isResumeUploaded ? 'bg-green-100' : 'bg-gray-100'}`}>
                <FileUp className={`h-5 w-5 ${isResumeUploaded ? 'text-green-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1">
                <Label htmlFor="resume" className="text-sm font-medium block mb-1">Upload your resume</Label>
                <div className="flex items-center w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={() => document.getElementById('resume')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isResumeUploaded ? 'Change File' : 'Select File'}
                  </Button>
                  <span className="text-sm text-gray-500">
                    {resumeFile ? resumeFile.name : "PDF, DOCX or TXT, max 5MB"}
                  </span>
                </div>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={handleResumeChange}
                />
                {isResumeUploaded && (
                  <div className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Resume uploaded successfully
                  </div>
                )}
              </div>
            </div>

            {parsedResumeData && (
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                <div className="flex items-start mb-2">
                  <div className="mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Resume Auto-Fill</h4>
                    <p className="text-sm text-blue-700">
                      We've automatically filled in some information from your resume. Please review and complete any missing details.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                    <Label className="font-medium text-gray-700">Work Experience</Label>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="workExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your relevant work experience" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                    <Label className="font-medium text-gray-700">Education</Label>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="List your educational background" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label className="font-medium text-gray-700">Cover Letter (Optional)</Label>
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Write a brief cover letter or message" 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !isResumeUploaded}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Application Submitted
            </DialogTitle>
            <DialogDescription>
              Your application for <span className="font-semibold">{jobTitle}</span> has been successfully submitted.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <div className="flex items-center text-sm mb-3">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span>Application ID: APP-{jobId}-{Date.now().toString().slice(-6)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a confirmation email to your inbox. The hiring team will review your application and contact you if there's a match.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => {
              setShowSuccessDialog(false);
              onClose();
            }}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplicationForm;
