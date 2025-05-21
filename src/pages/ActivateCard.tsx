
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Phone, Check, ArrowRight, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ActivateCard = () => {
  const navigate = useNavigate();
  const [activationComplete, setActivationComplete] = useState(false);
  
  const handleActivateCard = () => {
    // Simulate card activation process
    setTimeout(() => {
      setActivationComplete(true);
      toast({
        title: "Card activated!",
        description: "Your digital membership card has been activated successfully.",
      });
    }, 1500);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Activate Your Digital Membership Card</CardTitle>
                <CardDescription>
                  Your digital membership card is ready to be activated
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {activationComplete ? (
                  <div className="flex flex-col items-center space-y-8">
                    <div className="bg-green-100 h-20 w-20 rounded-full flex items-center justify-center">
                      <Check className="h-10 w-10 text-green-600" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-medium">Card Activated Successfully!</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Your digital membership card is now active. You can access it anytime from your dashboard.
                      </p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 max-w-sm">
                      <div className="bg-gray-900 text-white p-4 rounded-t-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs opacity-70">Club66 Global</p>
                            <p className="font-bold">Elite Member</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="font-bold">66</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white rounded-b-lg">
                        <div className="flex justify-center mb-3">
                          <div className="bg-gray-200 w-32 h-32 flex items-center justify-center">
                            {/* Placeholder for QR code */}
                            <div className="w-24 h-24 border-2 border-gray-400 grid grid-cols-5 grid-rows-5">
                              {[...Array(25)].map((_, i) => (
                                <div key={i} className={`border border-gray-400 ${(i % 7 === 0 || i % 11 === 0) ? 'bg-gray-500' : ''}`}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="font-medium">Scan to verify membership</p>
                          <p className="text-xs text-gray-500 mt-1">ID: C66-ML-21058</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download Card
                      </Button>
                      <Button onClick={handleContinue} className="bg-club66-purple hover:bg-club66-darkpurple flex items-center">
                        Continue to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 space-y-6">
                      <div className="bg-club66-purple/10 h-20 w-20 rounded-full flex items-center justify-center">
                        <CreditCard className="h-10 w-10 text-club66-purple" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-2">Your Digital Card is Ready</h3>
                        <p className="text-gray-600">
                          Your Club66 Global digital membership card has been generated and is ready to be activated. 
                          Once activated, you can use it to access all member benefits and discounts.
                        </p>
                      </div>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Phone className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Need help?</h3>
                            <p className="text-xs text-yellow-700 mt-1">
                              If you're having trouble activating your card, please call our support hotline at 
                              <span className="font-medium"> +223 XX XX XX XX</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleActivateCard} 
                        className="bg-club66-purple hover:bg-club66-darkpurple"
                      >
                        Activate Digital Card
                      </Button>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-full flex flex-col items-center justify-center">
                        <div className="text-center mb-6">
                          <p className="font-medium text-lg mb-2">Your Digital Card</p>
                          <p className="text-sm text-gray-500">
                            The QR code will be generated once your card is activated
                          </p>
                        </div>
                        
                        <div className="h-48 w-full max-w-xs bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-16 w-16 text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {!activationComplete && (
                <CardFooter className="flex flex-col">
                  <div className="text-sm text-center mt-4 text-gray-600">
                    Want a physical card instead?{' '}
                    <Button variant="link" className="p-0 h-auto text-club66-purple">
                      Request a physical card
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivateCard;
