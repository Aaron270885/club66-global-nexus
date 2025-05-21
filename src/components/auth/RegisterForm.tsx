
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import OTPVerification from './OTPVerification';
import { toast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    referralCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        toast({
          title: "Missing information",
          description: "Please set your password.",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password mismatch",
          description: "Password and confirmation do not match.",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive"
        });
        return;
      }
      
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!formData.address) {
        toast({
          title: "Missing information",
          description: "Please provide your address.",
          variant: "destructive"
        });
        return;
      }
      
      // Send OTP to the user's phone
      setStep(4);
      sendOTPCode();
      return;
    }

    if (step === 5) {
      setIsSubmitting(true);
      
      try {
        // In a real app, this would be an API call to register the user
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Registration success
        toast({
          title: "Registration successful!",
          description: "Your account has been created. You can now log in."
        });
        
        // Redirect to the QR code activation page
        window.location.href = "/activate-card";
      } catch (error) {
        toast({
          title: "Registration failed",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const sendOTPCode = async () => {
    // In a real app, this would make an API call to send an OTP code
    // For now, we'll simulate sending an OTP code
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Verification code sent",
        description: `A verification code has been sent to ${formData.phone}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code",
        variant: "destructive"
      });
    }
  };

  const handleOTPComplete = () => {
    setStep(5);
  };

  const handleResendOTP = async () => {
    await sendOTPCode();
  };

  const renderStepContent = () => {
    if (step === 4) {
      return (
        <OTPVerification 
          phoneNumber={formData.phone} 
          onVerifyComplete={handleOTPComplete}
          onResendCode={handleResendOTP}
        />
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+223 XX XX XX XX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500">
                We'll send a verification code to your phone for account activation.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <Input
                id="referralCode"
                name="referralCode"
                placeholder="Enter referral code if you have one"
                value={formData.referralCode}
                onChange={handleChange}
              />
              <div className="flex items-center text-xs text-green-600 mt-1">
                <Users className="h-3 w-3 mr-1" />
                <span>Refer 5 members and your registration fee will be waived!</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Street Name, City"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-600">
                By creating an account, you agree to Club66 Global's 
                <Link to="/terms" className="text-club66-purple hover:underline ml-1">
                  Terms of Service
                </Link> and 
                <Link to="/privacy" className="text-club66-purple hover:underline ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
              <h3 className="font-medium text-lg">Phone Verified Successfully!</h3>
              <p className="text-sm mt-1">Your account is ready to be created.</p>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full bg-club66-purple hover:bg-club66-darkpurple"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className={`${step === 1 && step === 1 ? 'w-full' : ''} bg-club66-purple hover:bg-club66-darkpurple`}
            >
              {step === 3 ? 'Continue to Verification' : 'Continue'}
            </Button>
          </div>
        )}
      </form>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Join Club66 Global to access exclusive member benefits
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-club66-purple text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Personal Info</span>
              </div>
              <div className="h-1 w-12 bg-gray-200">
                <div className={`h-1 bg-club66-purple ${step >= 2 ? 'w-full' : 'w-0'} transition-all`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-club66-purple text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Security</span>
              </div>
              <div className="h-1 w-12 bg-gray-200">
                <div className={`h-1 bg-club66-purple ${step >= 3 ? 'w-full' : 'w-0'} transition-all`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-club66-purple text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Address</span>
              </div>
            </div>
          </div>
        )}

        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-club66-purple hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
