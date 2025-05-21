
import { Download, Smartphone, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const AppPage = () => {
  const features = [
    "Access your digital membership card anytime",
    "View and redeem partner discounts",
    "Track your savings and benefits",
    "Manage your membership and payments",
    "Refer friends and track your commissions",
    "Find nearby partner merchants",
    "Contact customer support",
    "Receive notifications for new offers"
  ];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Club66 Global Mobile App</h1>
          <p className="text-center text-gray-600 mb-8">
            Manage your membership, access your benefits, and connect with our community on the go.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">Everything You Need In Your Pocket</h2>
              <p className="text-gray-600 mb-6">
                The Club66 Global app gives you instant access to your membership benefits, digital card, and exclusive offers. 
                Track your savings, manage your account, and refer friends - all from your smartphone.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-gray-800 flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-medium">App Store</div>
                  </div>
                </Button>
                <Button className="bg-black hover:bg-gray-800 flex items-center justify-center gap-2">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-medium">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="rounded-[2.5rem] bg-gray-900 border-8 border-gray-900 shadow-xl w-64">
                  <div className="h-[500px] rounded-3xl bg-white overflow-hidden">
                    <div className="h-12 bg-gray-100 flex justify-center items-center">
                      <div className="w-1/2 h-6 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 h-full">
                      <div className="card-gradient rounded-xl overflow-hidden shadow-lg p-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div className="text-white">
                            <div className="text-xs font-medium">Club66 Global</div>
                            <div className="text-lg font-bold">Member Card</div>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="font-bold text-white text-xs">66</span>
                          </div>
                        </div>
                        <div className="mt-4 mb-2">
                          <div className="text-white/80 text-xs">Member</div>
                          <div className="text-white text-sm font-medium">Ahmed Traore</div>
                        </div>
                        <div className="mt-2 flex justify-between items-end">
                          <div>
                            <div className="text-white/80 text-xs">ID</div>
                            <div className="text-white text-xs">C66-ML-21058</div>
                          </div>
                          <div>
                            <div className="text-white/80 text-xs">Expires</div>
                            <div className="text-white text-xs">01/28</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-3 mt-4">
                        <div className="text-sm font-medium mb-2">Your Benefits</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Discount at Club66 Businesses</span>
                            <span className="font-medium text-club66-purple">20%</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Payday Loans Interest</span>
                            <span className="font-medium text-club66-purple">5% Flat</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Membership Tier</span>
                            <span className="font-medium text-club66-purple">Elite</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-3 mt-4">
                        <div className="text-sm font-medium mb-2">Quick Actions</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-100 p-2 rounded-md flex flex-col items-center justify-center">
                            <Smartphone className="h-4 w-4 text-gray-600" />
                            <span className="text-xs mt-1">Card</span>
                          </div>
                          <div className="bg-gray-100 p-2 rounded-md flex flex-col items-center justify-center">
                            <Download className="h-4 w-4 text-gray-600" />
                            <span className="text-xs mt-1">Benefits</span>
                          </div>
                          <div className="bg-gray-100 p-2 rounded-md flex flex-col items-center justify-center">
                            <ShieldCheck className="h-4 w-4 text-gray-600" />
                            <span className="text-xs mt-1">Support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">App Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Digital Card</h3>
                <p className="text-gray-600 text-sm">Access your membership card anytime, anywhere with instant QR verification.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Track Benefits</h3>
                <p className="text-gray-600 text-sm">Monitor your savings and keep track of all the benefits you've used.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure Access</h3>
                <p className="text-gray-600 text-sm">Login securely with Face ID, phone number, or email authentication.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience Club66 Global?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Download our app today and enjoy all the benefits of your Club66 Global membership on the go.
            </p>
            <Button className="bg-club66-purple hover:bg-club66-darkpurple" size="lg" asChild>
              <Link to="/register">Join Club66 Global Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppPage;
