
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  BriefcaseBusiness,
  ChevronRight, 
  MapPin,
  Phone,
  Search,
  PieChart,
  UserCheck,
  CalendarRange,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import QRCodeValidator from '@/components/security/QRCodeValidator';
import { toast } from '@/hooks/use-toast';

// Mock data for agents
const agents = [
  { id: 1, name: "Seydou Coulibaly", role: "Senior Agent", area: "Bamako Central", performance: 94, activeMembers: 128, pendingTasks: 3 },
  { id: 2, name: "Mariam Sidibe", role: "Agent", area: "Sikasso", performance: 88, activeMembers: 76, pendingTasks: 2 },
  { id: 3, name: "Oumar Diallo", role: "Supervisor", area: "Kayes", performance: 96, activeMembers: 203, pendingTasks: 1 },
  { id: 4, name: "Kadiatou Traore", role: "Agent", area: "Mopti", performance: 82, activeMembers: 65, pendingTasks: 5 },
  { id: 5, name: "Boubacar Keita", role: "Senior Agent", area: "Segou", performance: 91, activeMembers: 104, pendingTasks: 0 },
  { id: 6, name: "Aissata Toure", role: "Agent", area: "Bamako South", performance: 87, activeMembers: 83, pendingTasks: 4 }
];

// Mock tasks
const tasks = [
  { id: 1, type: "Member Verification", member: "Ibrahim Keita", location: "Bamako", status: "Pending", deadline: "Today" },
  { id: 2, type: "Card Distribution", member: "Aminata Kone", location: "Bamako", status: "Completed", deadline: "Yesterday" },
  { id: 3, type: "Member Verification", member: "Amadou Sidibe", location: "Sikasso", status: "In Progress", deadline: "Today" },
  { id: 4, type: "Fee Collection", member: "Fatoumata Traore", location: "Bamako", status: "Pending", deadline: "Tomorrow" },
  { id: 5, type: "Member Onboarding", member: "Adama Coulibaly", location: "Mopti", status: "Pending", deadline: "Tomorrow" }
];

// Mock appointments
const appointments = [
  { id: 1, member: "Sidi Coulibaly", type: "Card Activation", time: "10:00 AM", status: "Confirmed" },
  { id: 2, member: "Aminata Toure", type: "Initial Meeting", time: "11:30 AM", status: "Completed" },
  { id: 3, member: "Mohammed Sidibe", type: "Payment Collection", time: "2:00 PM", status: "Confirmed" },
  { id: 4, member: "Fanta Keita", type: "Loan Consultation", time: "3:30 PM", status: "Pending" }
];

const AgentPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  
  const filteredAgents = agents.filter(agent => 
    (selectedArea === 'all' || agent.area === selectedArea) &&
    (searchQuery === '' || agent.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout>
      <div className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Agent Management</h1>
              <p className="text-gray-600">Supervise field agents and track performance</p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Send Notifications
              </Button>
              <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                <UserCheck className="h-4 w-4 mr-2" />
                Add New Agent
              </Button>
            </div>
          </div>

          {selectedAgent === null ? (
            <>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Active Agents</p>
                        <p className="text-2xl font-bold">{agents.length}</p>
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
                        <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                        <p className="text-2xl font-bold">{tasks.filter(t => t.status === "Pending").length}</p>
                      </div>
                      <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                        <p className="text-2xl font-bold">{appointments.length}</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CalendarRange className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/3">
                  <Input
                    placeholder="Search agents by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="w-full md:w-1/3">
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="Bamako Central">Bamako Central</SelectItem>
                      <SelectItem value="Bamako South">Bamako South</SelectItem>
                      <SelectItem value="Sikasso">Sikasso</SelectItem>
                      <SelectItem value="Kayes">Kayes</SelectItem>
                      <SelectItem value="Mopti">Mopti</SelectItem>
                      <SelectItem value="Segou">Segou</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredAgents.map(agent => (
                  <Card key={agent.id} className="hover:border-club66-purple cursor-pointer" onClick={() => setSelectedAgent(agent.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
                            {agent.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.role}</div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Area:</span>
                          <span className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                            {agent.area}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-500">Performance:</span>
                          <div className="flex items-center">
                            <span className={`${
                              agent.performance >= 90 ? 'text-green-600' :
                              agent.performance >= 80 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {agent.performance}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-500">Active Members:</span>
                          <span>{agent.activeMembers}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-500">Pending Tasks:</span>
                          <span className={`${agent.pendingTasks > 0 ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>
                            {agent.pendingTasks}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredAgents.length === 0 && (
                  <div className="col-span-3 p-10 text-center border rounded-md bg-gray-50">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No agents found matching your filters.</p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Tasks & Appointments</h2>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tasks">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-4 font-medium">Task Type</th>
                            <th className="text-left p-4 font-medium">Member</th>
                            <th className="text-left p-4 font-medium">Location</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Deadline</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                              <td className="p-4 font-medium">{task.type}</td>
                              <td className="p-4">{task.member}</td>
                              <td className="p-4">{task.location}</td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.status === 'Completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : task.status === 'In Progress'
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {task.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`font-medium ${
                                  task.deadline === 'Today' ? 'text-amber-600' : 
                                  task.deadline === 'Tomorrow' ? 'text-blue-600' : 'text-gray-600'
                                }`}>
                                  {task.deadline}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <Button variant="outline" size="sm">
                                  Assign
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="appointments">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-4 font-medium">Member</th>
                            <th className="text-left p-4 font-medium">Appointment Type</th>
                            <th className="text-left p-4 font-medium">Time</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-right p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {appointments.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-gray-50">
                              <td className="p-4 font-medium">{appointment.member}</td>
                              <td className="p-4">{appointment.type}</td>
                              <td className="p-4">{appointment.time}</td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === 'Completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : appointment.status === 'Confirmed'
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {appointment.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <Button variant="outline" size="sm">
                                  {appointment.status === 'Completed' ? 'View' : 'Manage'}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            // Agent detail view
            <div>
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setSelectedAgent(null)}
              >
                Back to Agents List
              </Button>
              
              {/* Selected agent details */}
              {(() => {
                const agent = agents.find(a => a.id === selectedAgent);
                if (!agent) return null;
                
                return (
                  <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      <Card className="w-full lg:w-1/3">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-medium">
                              {agent.name.charAt(0)}
                            </div>
                            <div>
                              <CardTitle>{agent.name}</CardTitle>
                              <CardDescription>{agent.role}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Area:</span>
                              <span className="font-medium">{agent.area}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Agent ID:</span>
                              <span className="font-medium">AGT-{String(agent.id).padStart(4, '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status:</span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Active
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Phone:</span>
                              <span className="font-medium">+223 7X XX XX XX</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Email:</span>
                              <span className="font-medium text-sm">
                                {agent.name.toLowerCase().replace(' ', '.') + '@club66.com'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Performance Score:</span>
                              <span className={`font-bold text-lg ${
                                agent.performance >= 90 ? 'text-green-600' :
                                agent.performance >= 80 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {agent.performance}%
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-500">Active Members:</span>
                              <span className="font-medium">{agent.activeMembers}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-500">Members Onboarded:</span>
                              <span className="font-medium">217</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-500">Collection Rate:</span>
                              <span className="font-medium">96%</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button className="flex-1 bg-club66-purple hover:bg-club66-darkpurple">
                            Assign Task
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <div className="w-full lg:w-2/3 space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                              <PieChart className="h-16 w-16 text-gray-400" />
                              <div className="ml-4 text-gray-500">Performance chart visualization here</div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Current Tasks</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {[
                                { type: "Member Verification", member: "Ibrahim Keita", status: "In Progress", deadline: "Today" },
                                { type: "Fee Collection", member: "Fatoumata Traore", status: "Pending", deadline: "Tomorrow" },
                                { type: "Member Onboarding", member: "Adama Coulibaly", status: "Pending", deadline: "Tomorrow" }
                              ].map((task, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                                  <div>
                                    <div className="font-medium">{task.type}</div>
                                    <div className="text-sm text-gray-500">{task.member}</div>
                                  </div>
                                  <div className="flex items-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                                      task.status === 'Completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : task.status === 'In Progress'
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-amber-100 text-amber-800'
                                    }`}>
                                      {task.status}
                                    </span>
                                    <span className={`text-sm ${
                                      task.deadline === 'Today' ? 'text-amber-600 font-medium' : 
                                      task.deadline === 'Tomorrow' ? 'text-blue-600' : 'text-gray-600'
                                    }`}>
                                      {task.deadline}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Member Verification Tool</CardTitle>
                        <CardDescription>Verify member cards via QR code</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <QRCodeValidator 
                          onValidationComplete={(isValid, memberData) => {
                            if (isValid) {
                              toast({
                                title: "Verification Recorded",
                                description: `${agent.name} has verified ${memberData?.name}`
                              });
                            }
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentPanel;
