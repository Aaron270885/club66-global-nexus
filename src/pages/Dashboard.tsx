
import React from 'react';
import Layout from '@/components/layout/Layout';
import MemberDigitalCard from '@/components/dashboard/MemberDigitalCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Receipt, 
  Percent, 
  Users, 
  FileText, 
  Award, 
  Clock,
  Calendar,
  CreditCardIcon
} from 'lucide-react';

const mockMember = {
  name: 'John Doe',
  id: 'C66-123456',
  expiryDate: '31 May 2026',
  membershipTier: 'Premium' as 'Essential' | 'Premium' | 'Elite',
  profileImage: 'https://placehold.co/200x200/e9d5ff/7c3aed?text=JD',
  nextPayment: '23 Jun 2025',
  memberSince: '23 May 2025'
};

// Mock payment history
const mockPaymentHistory = [
  { id: 'INV-001', date: '23 May 2025', amount: 'CFA 12,000', status: 'Paid', description: 'Registration + Premium (May 2025)' },
  { id: 'INV-002', date: '23 Jun 2025', amount: 'CFA 2,000', status: 'Upcoming', description: 'Premium Monthly Fee (Jun 2025)' },
];

// Mock discount usage
const mockDiscountUsage = [
  { id: 'DCT-001', date: '25 May 2025', merchant: 'Mali Shopping Center', discount: '10%', saved: 'CFA 3,500' },
  { id: 'DCT-002', date: '27 May 2025', merchant: 'Café Touareg', discount: '10%', saved: 'CFA 800' },
];

// Mock competitions
const mockCompetitions = [
  { id: 'CMP-001', name: 'Young Entrepreneur Award', status: 'Voted', date: '28 May 2025' },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-club66-purple">Member Dashboard</h1>
          <p className="text-gray-600">Welcome back, {mockMember.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Member Card & Quick Stats */}
          <div className="col-span-1">
            <div className="mb-6">
              <MemberDigitalCard
                memberName={mockMember.name}
                memberID={mockMember.id}
                expiryDate={mockMember.expiryDate}
                membershipTier={mockMember.membershipTier}
                profileImage={mockMember.profileImage}
              />
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Membership Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tier:</span>
                    <span className="font-medium">{mockMember.membershipTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span>{mockMember.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span>{mockMember.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment:</span>
                    <span>{mockMember.nextPayment}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Renew Membership
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Percent className="h-4 w-4 mr-2" />
                      View All Discounts
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Request Physical Card
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Current Competitions
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Project & Scholarship Requests
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Activity Tabs */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="payments" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="discounts">Discounts</TabsTrigger>
                <TabsTrigger value="competitions">Competitions</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Receipt className="h-5 w-5 mr-2" />
                      Payment History
                    </CardTitle>
                    <CardDescription>View your membership payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockPaymentHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2">Invoice</th>
                              <th className="text-left py-3 px-2">Date</th>
                              <th className="text-left py-3 px-2">Description</th>
                              <th className="text-left py-3 px-2">Amount</th>
                              <th className="text-left py-3 px-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockPaymentHistory.map((payment) => (
                              <tr key={payment.id} className="border-b">
                                <td className="py-3 px-2">{payment.id}</td>
                                <td className="py-3 px-2">{payment.date}</td>
                                <td className="py-3 px-2">{payment.description}</td>
                                <td className="py-3 px-2">{payment.amount}</td>
                                <td className="py-3 px-2">
                                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    payment.status === 'Paid' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No payment history found.
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Upcoming Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Monthly Subscription</h4>
                          <p className="text-sm text-gray-600">Due on {mockMember.nextPayment}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">CFA 2,000</p>
                          <Button size="sm" className="mt-1">Pay Now</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discounts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Percent className="h-5 w-5 mr-2" />
                      Recent Discount Usage
                    </CardTitle>
                    <CardDescription>Track the savings from your Club66 membership</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockDiscountUsage.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2">Date</th>
                              <th className="text-left py-3 px-2">Merchant</th>
                              <th className="text-left py-3 px-2">Discount</th>
                              <th className="text-left py-3 px-2">Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockDiscountUsage.map((usage) => (
                              <tr key={usage.id} className="border-b">
                                <td className="py-3 px-2">{usage.date}</td>
                                <td className="py-3 px-2">{usage.merchant}</td>
                                <td className="py-3 px-2">{usage.discount}</td>
                                <td className="py-3 px-2 text-green-600">{usage.saved}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No discount usage recorded yet.
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        View All Discounts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="competitions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Competition Participation
                    </CardTitle>
                    <CardDescription>Track competitions you've voted in or participated in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockCompetitions.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2">Competition</th>
                              <th className="text-left py-3 px-2">Date</th>
                              <th className="text-left py-3 px-2">Status</th>
                              <th className="text-left py-3 px-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockCompetitions.map((comp) => (
                              <tr key={comp.id} className="border-b">
                                <td className="py-3 px-2">{comp.name}</td>
                                <td className="py-3 px-2">{comp.date}</td>
                                <td className="py-3 px-2">{comp.status}</td>
                                <td className="py-3 px-2">
                                  <Button size="sm" variant="outline">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No competition participation recorded.
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Button className="w-full">
                        Browse Active Competitions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Project & Scholarship Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't submitted any project or scholarship applications.
                      </p>
                      <Button>
                        Submit a Request
                      </Button>
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

export default Dashboard;
