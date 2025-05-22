
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  CreditCard, 
  Settings, 
  Shield, 
  BriefcaseBusiness, 
  MessageSquare,
  UserCheck,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  PieChart
} from 'lucide-react';

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage all Club66 Global operations</p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Members</p>
                    <p className="text-2xl font-bold">2,543</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-club66-purple/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-club66-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue (Monthly)</p>
                    <p className="text-2xl font-bold">CFA 12.8M</p>
                    <p className="text-xs text-green-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                    <p className="text-2xl font-bold">136</p>
                    <p className="text-xs text-blue-600 mt-1">+24 new this week</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Support Tickets</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs text-amber-600 mt-1">5 require attention</p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="members" className="w-full mb-8">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <div className="my-4 flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="Search members..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="members" className="border rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium">Member</th>
                    <th className="text-left p-4 font-medium">Membership</th>
                    <th className="text-left p-4 font-medium">Joined</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { name: "Ahmed Traore", email: "ahmed@example.com", membership: "Elite", joined: "Oct 15, 2023", status: "Active" },
                    { name: "Fatima Diallo", email: "fatima@example.com", membership: "Premium", joined: "Nov 5, 2023", status: "Active" },
                    { name: "Moussa Toure", email: "moussa@example.com", membership: "Essential", joined: "Oct 20, 2023", status: "Active" },
                    { name: "Aminata Kone", email: "aminata@example.com", membership: "Elite", joined: "Jan 8, 2024", status: "Active" },
                    { name: "Ibrahim Keita", email: "ibrahim@example.com", membership: "Premium", joined: "Sep 15, 2023", status: "Inactive" }
                  ].map((member, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.membership === 'Elite' 
                            ? 'bg-purple-100 text-purple-800' 
                            : member.membership === 'Premium' 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.membership}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{member.joined}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center p-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing 5 of 2,543 members
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="p-6 border rounded-lg bg-white">
              <h3 className="font-medium text-lg mb-4">Recent Payments</h3>
              <div className="space-y-1">
                {[
                  { member: "Ahmed Traore", amount: "CFA 5,000", date: "Apr 15, 2024", type: "Monthly Fee" },
                  { member: "Fatima Diallo", amount: "CFA 5,000", date: "Apr 12, 2024", type: "Monthly Fee" },
                  { member: "Moussa Toure", amount: "CFA 2,500", date: "Apr 10, 2024", type: "Monthly Fee" },
                  { member: "Aminata Kone", amount: "CFA 10,000", date: "Apr 8, 2024", type: "Annual Fee" },
                  { member: "Ibrahim Keita", amount: "CFA 5,000", date: "Apr 5, 2024", type: "Monthly Fee" }
                ].map((payment, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                    <div>
                      <div className="font-medium">{payment.member}</div>
                      <div className="text-sm text-gray-500">{payment.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{payment.amount}</div>
                      <div className="text-sm text-gray-500">{payment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Button variant="outline">View All Payments</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="agents" className="p-6 border rounded-lg bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Agent Management</h3>
                <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                  Add New Agent
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Seydou Coulibaly", role: "Senior Agent", area: "Bamako Central", active: true },
                  { name: "Mariam Sidibe", role: "Agent", area: "Sikasso", active: true },
                  { name: "Oumar Diallo", role: "Supervisor", area: "Kayes", active: true },
                  { name: "Kadiatou Traore", role: "Agent", area: "Mopti", active: false },
                  { name: "Boubacar Keita", role: "Senior Agent", area: "Segou", active: true },
                  { name: "Aissata Toure", role: "Agent", area: "Bamako South", active: true }
                ].map((agent, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center font-medium">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.role}</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Area:</span>
                          <span>{agent.area}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Status:</span>
                          <span className={agent.active ? "text-green-600" : "text-red-600"}>
                            {agent.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Details</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="jobs" className="p-6 border rounded-lg bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Job Management</h3>
                <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                  Post New Job
                </Button>
              </div>
              
              <div className="border rounded-md divide-y">
                {[
                  { title: "Regional Sales Manager", company: "Club66 Global", location: "Bamako", type: "Full-Time", applications: 24, active: true },
                  { title: "Marketing Specialist", company: "Tech Mali", location: "Remote", type: "Contract", applications: 18, active: true },
                  { title: "Customer Support Agent", company: "Club66 Global", location: "Bamako", type: "Full-Time", applications: 32, active: true },
                  { title: "Financial Analyst", company: "Mali Bank", location: "Bamako", type: "Full-Time", applications: 12, active: false },
                  { title: "Web Developer", company: "Digital Solutions", location: "Remote", type: "Part-Time", applications: 28, active: true }
                ].map((job, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-lg">{job.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</div>
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                            {job.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {job.active ? "Active" : "Closed"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{job.applications} applications</div>
                        <div className="mt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="p-6 border rounded-lg bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Analytics & Reports</h3>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    Export Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Member Growth</CardTitle>
                    <CardDescription>New members over time</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                      <PieChart className="h-16 w-16 text-gray-400" />
                      <div className="ml-4 text-gray-500">Chart visualization here</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                    <CardDescription>Monthly revenue by category</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                      <PieChart className="h-16 w-16 text-gray-400" />
                      <div className="ml-4 text-gray-500">Chart visualization here</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
