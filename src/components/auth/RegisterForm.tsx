
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import OTPVerification from './OTPVerification';
import { toast } from '@/hooks/use-toast';
import { Users, Upload, CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MembershipTiers from '@/components/membership/MembershipTiers';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    country: 'Mali',
    referralCode: '',
    membershipTier: 'essential',
    requestPhysicalCard: false,
    profileImage: null,
    paymentMethod: 'mobile',
    mobileMoneyProvider: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profileImage: file }));
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImageURL(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
      if (!formData.address || !formData.city) {
        toast({
          title: "Missing information",
          description: "Please provide your address information.",
          variant: "destructive"
        });
        return;
      }
      
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!formData.membershipTier) {
        toast({
          title: "Missing information",
          description: "Please select a membership tier.",
          variant: "destructive"
        });
        return;
      }
      setStep(5);
      return;
    }

    if (step === 5) {
      if (formData.paymentMethod === 'mobile' && !formData.mobileMoneyProvider) {
        toast({
          title: "Missing information",
          description: "Please select a mobile money provider.",
          variant: "destructive"
        });
        return;
      }

      // Send OTP to the user's phone
      setStep(6);
      sendOTPCode();
      return;
    }

    if (step === 7) {
      setIsSubmitting(true);
      
      try {
        // In a real app, this would be an API call to register the user
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Registration success
        toast({
          title: "Registration successful!",
          description: "Your account has been created. You can now log in."
        });
        
        // Redirect to the dashboard with the digital card
        window.location.href = "/dashboard";
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
    setStep(7);
  };

  const handleResendOTP = async () => {
    await sendOTPCode();
  };

  const renderProgressBar = () => {
    const totalSteps = 7;
    const progress = (step / totalSteps) * 100;

    return (
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-club66-purple rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (step === 6) {
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
                placeholder="123 Street Name"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange('country', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mali">Mali</SelectItem>
                  <SelectItem value="Senegal">Senegal</SelectItem>
                  <SelectItem value="Ivory Coast">Ivory Coast</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-600">
                By creating an account, you agree to Club66 Global's 
                <Link to="/about/terms" className="text-club66-purple hover:underline ml-1">
                  Terms of Service
                </Link> and 
                <Link to="/about/privacy" className="text-club66-purple hover:underline ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Choose Your Membership Tier</Label>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                Select the membership tier that best fits your needs.
              </p>
              
              <MembershipTiers 
                selectedTier={formData.membershipTier}
                onSelectTier={(tier) => handleSelectChange('membershipTier', tier)}
                compact={true}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requestPhysicalCard" 
                  checked={formData.requestPhysicalCard}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange('requestPhysicalCard', checked === true)
                  }
                />
                <Label htmlFor="requestPhysicalCard" className="text-sm font-normal">
                  I would like to request a physical membership card
                </Label>
              </div>
              {formData.requestPhysicalCard && (
                <p className="text-xs text-gray-500 ml-6">
                  Additional fees may apply for physical card issuance and delivery.
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm">Upload Your Profile Photo (For Your Membership Card)</Label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImageURL ? (
                    <img
                      src={profileImageURL}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="profileImage"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded cursor-pointer text-sm inline-block"
                  >
                    Choose File
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    This photo will appear on your digital membership card.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <div>
              <Label className="text-base font-semibold mb-2 block">Select Payment Method</Label>
              <RadioGroup 
                value={formData.paymentMethod}
                onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                    <div className="bg-purple-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                      <CreditCard className="h-4 w-4 text-club66-purple" />
                    </div>
                    <div>
                      <span className="font-medium">Mobile Money</span>
                      <p className="text-xs text-gray-500">Orange, Moov, Wave</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <div className="bg-purple-100 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                      <CreditCard className="h-4 w-4 text-club66-purple" />
                    </div>
                    <div>
                      <span className="font-medium">Card Payment</span>
                      <p className="text-xs text-gray-500">Credit/Debit cards</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.paymentMethod === 'mobile' && (
              <div className="space-y-3">
                <Label htmlFor="mobileMoneyProvider">Select Mobile Money Provider</Label>
                <Select
                  value={formData.mobileMoneyProvider}
                  onValueChange={(value) => handleSelectChange('mobileMoneyProvider', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orange">Orange Money</SelectItem>
                    <SelectItem value="moov">Moov Money</SelectItem>
                    <SelectItem value="wave">Wave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="border-t pt-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Fee</span>
                  <span>CFA 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Fee ({formData.membershipTier === 'essential' ? 'Essential' : formData.membershipTier === 'premium' ? 'Premium' : 'Elite'})</span>
                  <span>CFA {formData.membershipTier === 'essential' ? '1,000' : formData.membershipTier === 'premium' ? '2,000' : '5,000'}</span>
                </div>
                {formData.requestPhysicalCard && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Physical Card Fee</span>
                    <span>CFA 2,500</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Due Today</span>
                  <span>CFA {10000 + (formData.membershipTier === 'essential' ? 1000 : formData.membershipTier === 'premium' ? 2000 : 5000) + (formData.requestPhysicalCard ? 2500 : 0)}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By proceeding, you agree to pay the registration fee and the first month's membership fee. 
                Subsequent monthly fees will be charged automatically.
              </p>
            </div>
          </div>
        )}

        {step === 7 && (
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

        {step < 6 && step !== 7 && (
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
              className={`${step === 1 ? 'w-full' : ''} bg-club66-purple hover:bg-club66-darkpurple`}
            >
              {step === 5 ? 'Proceed to Verification' : 'Continue'}
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
        {renderProgressBar()}
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
