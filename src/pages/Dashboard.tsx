
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MemberCard from '@/components/dashboard/MemberCard';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CurrencyConverterWidget from '@/components/dashboard/CurrencyConverterWidget';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, User, Settings, CreditCardIcon, Download, Phone } from 'lucide-react';

// Mock user data
const user = {
  name: 'Ahmed Traore',
  email: 'ahmed.traore@example.com',
  phone: '+223 71 XX XX XX',
  memberID: 'C66-ML-21058',
  expiryDate: '01/28',
  membershipTier: 'Elite' as const,
  referralCode: 'AHMED21058',
  joinDate: 'Oct 15, 2023',
};

const Dashboard = () => {
  const [requestingPhysical, setRequestingPhysical] = useState(false);
  
  const handlePhysicalCardRequest = () => {
    setRequestingPhysical(true);
    // In a real app, this would make an API call
    setTimeout(() => {
      alert('Physical card request submitted successfully! You will receive it within 14 business days.');
      setRequestingPhysical(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Member Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500 text-sm mb-2">{user.email}</p>
                  <p className="text-gray-500 text-sm">{user.phone}</p>
                  <div className="mt-4 mb-6 inline-flex items-center bg-club66-purple/10 text-club66-purple px-3 py-1 rounded-full text-sm font-medium">
                    {user.membershipTier} Member
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">{user.joinDate}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-500">Referral Code</span>
                    <span className="font-medium">{user.referralCode}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mb-3" asChild>
                    <Link to="/affiliate-dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Affiliate Dashboard
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full mb-3">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full text-destructive border-destructive hover:bg-destructive/10">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </div>
              
              {/* Currency Converter */}
              <div className="mt-6">
                <CurrencyConverterWidget />
              </div>
              
              {/* Membership Card Mobile View */}
              <div className="lg:hidden mt-6">
                <h3 className="text-lg font-medium mb-4">Membership Card</h3>
                <MemberCard
                  memberName={user.name}
                  memberID={user.memberID}
                  expiryDate={user.expiryDate}
                  membershipTier={user.membershipTier}
                />
                
                <div className="mt-4 flex flex-col space-y-2">
                  <Button variant="outline" size="sm" onClick={handlePhysicalCardRequest} disabled={requestingPhysical}>
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    {requestingPhysical ? 'Processing...' : 'Request Physical Card'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Card
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <DashboardStats />
              
              {/* Tabs */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <Tabs defaultValue="benefits" className="w-full">
                  <TabsList className="grid grid-cols-4 border-b">
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="referrals">Referrals</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="benefits" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Your Membership Benefits</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-green-50 p-2 rounded-md mr-4">
                          <CreditCard className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">20% Discount at Club66 Businesses</h4>
                          <p className="text-sm text-gray-500">As an Elite member, you receive our highest discount rate</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-blue-50 p-2 rounded-md mr-4">
                          <Phone className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">5% Flat Interest Payday Loans</h4>
                          <p className="text-sm text-gray-500">Elite members enjoy our lowest interest rates</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button asChild variant="outline">
                          <Link to="/benefits">View All Benefits</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payments" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Payment History</h3>
                    <div className="border rounded-md divide-y">
                      <div className="flex justify-between p-4">
                        <div>
                          <p className="font-medium">Monthly Membership Fee</p>
                          <p className="text-sm text-gray-500">Nov 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">CFA 5,000</p>
                          <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Paid</p>
                        </div>
                      </div>
                      <div className="flex justify-between p-4">
                        <div>
                          <p className="font-medium">Monthly Membership Fee</p>
                          <p className="text-sm text-gray-500">Oct 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">CFA 5,000</p>
                          <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Paid</p>
                        </div>
                      </div>
                      <div className="flex justify-between p-4">
                        <div>
                          <p className="font-medium">Annual Membership Fee</p>
                          <p className="text-sm text-gray-500">Oct 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">CFA 10,000</p>
                          <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Paid</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="referrals" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Your Referrals</h3>
                    <div className="mb-4">
                      <p className="text-gray-600">Share your referral code with friends and earn 10% of their membership fees.</p>
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          value={user.referralCode}
                          readOnly
                          className="flex-1 px-3 py-2 border rounded-l-md bg-gray-50"
                        />
                        <Button className="rounded-l-none bg-club66-purple hover:bg-club66-darkpurple">
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full mb-4" asChild>
                      <Link to="/affiliate-dashboard">
                        View Affiliate Dashboard
                      </Link>
                    </Button>
                    
                    <h4 className="font-medium mt-6 mb-2">Your Referred Members</h4>
                    <div className="border rounded-md divide-y">
                      <div className="flex justify-between p-4">
                        <div>
                          <p className="font-medium">Fatima Diallo</p>
                          <p className="text-sm text-gray-500">Premium Member</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+ CFA 200/month</p>
                          <p className="text-sm text-gray-500">Joined Nov 5, 2023</p>
                        </div>
                      </div>
                      <div className="flex justify-between p-4">
                        <div>
                          <p className="font-medium">Moussa Toure</p>
                          <p className="text-sm text-gray-500">Essential Member</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">+ CFA 100/month</p>
                          <p className="text-sm text-gray-500">Joined Oct 20, 2023</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="support" className="p-6">
                    <h3 className="text-lg font-bold mb-4">Customer Support</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Contact Support</h4>
                        <p className="text-sm text-gray-600 mb-4">Need help with your membership or have questions? Our support team is here to help.</p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Support
                          </Button>
                          <Button size="sm" className="flex-1 bg-club66-purple hover:bg-club66-darkpurple">
                            Live Chat
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Support Hours</h4>
                        <p className="text-sm text-gray-600">Monday to Friday: 8:00 AM - 8:00 PM</p>
                        <p className="text-sm text-gray-600">Saturday: 9:00 AM - 5:00 PM</p>
                        <p className="text-sm text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Membership Card Desktop View */}
          <div className="hidden lg:block mt-8">
            <h2 className="text-2xl font-bold mb-6">Your Membership Card</h2>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <MemberCard
                memberName={user.name}
                memberID={user.memberID}
                expiryDate={user.expiryDate}
                membershipTier={user.membershipTier}
              />
              
              <div className="space-y-6">
                <div className="bg-white shadow p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Card Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={handlePhysicalCardRequest} disabled={requestingPhysical}>
                      <CreditCardIcon className="mr-2 h-5 w-5" />
                      {requestingPhysical ? 'Processing...' : 'Request Physical Card'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-5 w-5" />
                      Download Digital Card
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-5 w-5" />
                      Activate Card
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white shadow p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    For card activation or issues, please contact our support team.
                  </p>
                  <Button size="sm" className="bg-club66-purple hover:bg-club66-darkpurple">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
