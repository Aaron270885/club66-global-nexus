import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Save, 
  Edit, 
  CreditCard, 
  History, 
  Settings, 
  Gift, 
  ShoppingBag, 
  Users, 
  Briefcase, 
  HelpCircle,
  Download,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MessageSquare,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Percent,
  Award,
  RefreshCw,
  ExternalLink,
  Lock,
  Smartphone,
  Package
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import ProductManagement from '@/components/products/ProductManagement';

const MyAccount = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile, fetchProfile } = useUserProfile();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    country: 'Mali'
  });
  const [membership, setMembership] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock data for demonstration
  const mockData = {
    recentTransactions: [
      { id: '1', date: '2024-01-15', description: 'Monthly Membership', amount: 'CFA 5,000', status: 'Completed' },
      { id: '2', date: '2024-01-10', description: 'Discount at TechMart', amount: 'CFA -2,500', status: 'Completed' },
      { id: '3', date: '2024-01-05', description: 'Payday Advance', amount: 'CFA 50,000', status: 'Completed' }
    ],
    availableRewards: [
      { id: '1', title: '10% Off Electronics', points: 500, category: 'Shopping' },
      { id: '2', title: 'Free Coffee Voucher', points: 200, category: 'Food & Beverage' },
      { id: '3', title: 'Movie Ticket Discount', points: 300, category: 'Entertainment' }
    ],
    totalSavings: 125000,
    rewardsPoints: 1250,
    discountsUsed: 15,
    affiliateStats: {
      referrals: 8,
      earnings: 45000,
      pendingCommission: 12000
    },
    jobApplications: [
      { id: '1', position: 'Software Developer', company: 'TechCorp Mali', status: 'Under Review', appliedDate: '2024-01-12' },
      { id: '2', position: 'Marketing Manager', company: 'Digital Solutions', status: 'Interview Scheduled', appliedDate: '2024-01-08' }
    ]
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMembership();
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || 'Mali'
      });
    }
  }, [profile]);

  const fetchMembership = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setMembership(data);
    } catch (error) {
      console.error('Error fetching membership:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('club66')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('club66')
        .getPublicUrl(filePath);

      await updateProfile({ profile_image_url: publicUrl });
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const getMembershipTierColor = (tier: string) => {
    switch (tier?.toLowerCase()) {
      case 'essential':
        return 'bg-gray-100 text-gray-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      case 'elite':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      case 'interview scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your Elverra Global membership and services</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 overflow-x-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-1">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="affiliate" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Affiliate</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Account Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{membership?.tier || 'Essential'}</div>
                  <div className="text-gray-600">Membership Tier</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">CFA {mockData.totalSavings.toLocaleString()}</div>
                  <div className="text-gray-600">Total Savings</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Percent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{mockData.discountsUsed}</div>
                  <div className="text-gray-600">Discounts Used</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{mockData.rewardsPoints}</div>
                  <div className="text-gray-600">Rewards Points</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{transaction.amount}</p>
                          <Badge className={getStatusBadge(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Manage Cards</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <History className="h-6 w-6 mb-2" />
                      <span className="text-sm">Payment History</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Gift className="h-6 w-6 mb-2" />
                      <span className="text-sm">Redeem Rewards</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <HelpCircle className="h-6 w-6 mb-2" />
                      <span className="text-sm">Get Support</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Card Management Tab */}
          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Card Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    My ZENIKA Card
                    <Badge variant="default">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs opacity-80">ZENIKA Card</p>
                        <p className="font-bold text-xl" style={{ color: membership?.tier === 'Elite' ? '#277732' : membership?.tier === 'Premium' ? '#ffcf08' : '#b4121d' }}>
                          {membership?.tier || 'Essential'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-80">Elverra</p>
                        <p className="font-bold">Global</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs opacity-80">Card Number</p>
                        <p className="font-mono text-lg">**** **** **** 1234</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs opacity-80">Valid Thru</p>
                          <p className="text-sm">12/28</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-80">Member ID</p>
                          <p className="text-sm">{membership?.member_id || 'EG-1001'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Expiration Date</Label>
                        <p className="font-medium">December 2028</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Renewal Status</Label>
                        <Badge variant="outline" className="bg-green-50 text-green-700">Auto-Renewal On</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">PIN Status</Label>
                        <p className="font-medium text-green-600">Set</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Card Status</Label>
                        <Badge variant="default">Activated</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Renewal
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Replace Card
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Manage PIN
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Activate Card
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Card Management Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Card Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" asChild>
                      <a href="/cards">
                        <CreditCard className="h-4 w-4 mr-2" />
                        View All Card Options
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/activate-card">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Card Activation
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      PIN Management
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Card Renewal
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Request Card Replacement
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Card Benefits</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Exclusive merchant discounts</li>
                      <li>• Pan-African network access</li>
                      <li>• Priority customer support</li>
                      <li>• Reward points on purchases</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment History</CardTitle>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <History className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        <Badge className={getStatusBadge(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Profile Information
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profile?.profile_image_url} alt="Profile" />
                        <AvatarFallback className="text-lg">
                          {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1 cursor-pointer hover:bg-purple-700">
                          <Camera className="h-3 w-3" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{profile?.full_name || 'No name set'}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Security & Notifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span>SMS Alerts</span>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Two-Factor Authentication</span>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Account Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Discounts and Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Rewards Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{mockData.rewardsPoints}</div>
                    <p className="text-gray-600">Available Points</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Earned:</span>
                      <span className="font-medium">2,450 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Redeemed:</span>
                      <span className="font-medium">1,200 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Savings:</span>
                      <span className="font-medium text-green-600">CFA {mockData.totalSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockData.availableRewards.map((reward) => (
                      <div key={reward.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{reward.title}</h3>
                          <Badge variant="outline">{reward.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{reward.points} points</span>
                          <Button size="sm" disabled={mockData.rewardsPoints < reward.points}>
                            Redeem
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services and Products Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ô Secours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Emergency assistance services</p>
                  <Button className="w-full" asChild>
                    <a href="/services/o-secours">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access Service
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payday Advance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Quick cash advances</p>
                  <Button className="w-full" asChild>
                    <a href="/services/payday-advance">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hire Purchase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Buy now, pay later options</p>
                  <Button className="w-full" asChild>
                    <a href="/services/hire-purchase">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Affiliate Management Tab */}
          <TabsContent value="affiliate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Affiliate Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockData.affiliateStats.referrals}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">CFA {mockData.affiliateStats.earnings.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Earnings</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">CFA {mockData.affiliateStats.pendingCommission.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Pending Commission</div>
                  </div>
                  <Button className="w-full" asChild>
                    <a href="/affiliate-dashboard">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Affiliate Account
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Referral Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Your Referral Code</Label>
                    <div className="flex mt-1">
                      <Input value="EG-REF-12345" readOnly />
                      <Button variant="outline" className="ml-2">Copy</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Referral Link</Label>
                    <div className="flex mt-1">
                      <Input value="https://elverraglobal.com/register?ref=EG-REF-12345" readOnly />
                      <Button variant="outline" className="ml-2">Copy</Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Commission Structure</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Essential: CFA 100/month per referral</li>
                      <li>• Premium: CFA 200/month per referral</li>
                      <li>• Elite: CFA 500/month per referral</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Job Center Portal Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.jobApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{application.position}</h3>
                          <Badge className={getStatusBadge(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{application.company}</p>
                        <p className="text-xs text-gray-500">Applied: {application.appliedDate}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <a href="/job-dashboard/employee">
                      <Briefcase className="h-4 w-4 mr-2" />
                      View All Applications
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="font-medium mb-2">Explore Career Opportunities</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Access exclusive job listings and career development resources
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full" asChild>
                        <a href="/jobs">Browse Jobs</a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/job-center">Job Center</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <ProductManagement />
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" className="h-16 flex items-center justify-start space-x-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Phone Support</div>
                        <div className="text-sm text-gray-500">+223 20 22 15 30</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-16 flex items-center justify-start space-x-4">
                      <Mail className="h-6 w-6 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium">Email Support</div>
                        <div className="text-sm text-gray-500">support@elverraglobal.com</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-16 flex items-center justify-start space-x-4">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-gray-500">Available 24/7</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Help Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/faq">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Frequently Asked Questions
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/terms">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Terms of Use
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/privacy">
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy Policy
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/about/contact">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Information
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyAccount;