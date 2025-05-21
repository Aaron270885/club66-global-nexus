
import { CreditCard, User, QrCode, Download, Phone } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Cards = () => {
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Membership Cards</h1>
          <p className="text-center text-gray-600 mb-8">
            Access exclusive benefits with your Club66 Global membership card, available both digitally and physically.
          </p>

          <Tabs defaultValue="digital" className="w-full max-w-4xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="digital">Digital Card</TabsTrigger>
              <TabsTrigger value="physical">Physical Card</TabsTrigger>
            </TabsList>
            
            <TabsContent value="digital" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Your Digital Membership Card</h2>
                  <p className="text-gray-600 mb-6">
                    The digital membership card is automatically generated after your registration and payment. 
                    It includes your unique member ID, name, and expiry date with a QR code for easy verification.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3">
                        <QrCode className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Easy Validation</h3>
                        <p className="text-sm text-gray-600">Our partner merchants can instantly validate your membership by scanning your card's QR code.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                        <Download className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Always Available</h3>
                        <p className="text-sm text-gray-600">Access your digital card anytime from your dashboard or download it to your device.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Activation Support</h3>
                        <p className="text-sm text-gray-600">Need help activating your card? Our customer support is available via phone hotline.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                    Access Your Digital Card
                  </Button>
                </div>
                
                <div className="relative mt-8 lg:mt-0">
                  <div className="card-container">
                    <div className="card-front card-gradient rounded-xl overflow-hidden shadow-lg p-5">
                      <div className="flex justify-between items-center">
                        <div className="text-white">
                          <div className="text-xs font-medium">Club66 Global</div>
                          <div className="text-lg font-bold">Member Card</div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="font-bold text-white">66</span>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="text-white/80 text-xs">Member Name</div>
                        <div className="text-white font-medium">Ahmed Traore</div>
                      </div>
                      <div className="mt-6 flex justify-between items-end">
                        <div>
                          <div className="text-white/80 text-xs">Member ID</div>
                          <div className="text-white">C66-ML-21058</div>
                        </div>
                        <div>
                          <div className="text-white/80 text-xs">Expires</div>
                          <div className="text-white">01/28</div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <div className="bg-white h-20 w-20 rounded-md flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-gray-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="physical" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Request a Physical Card</h2>
                  <p className="text-gray-600 mb-6">
                    Want a traditional membership card? You can request a physical card that will be delivered to your address.
                    The physical card includes all the benefits of the digital version and can be used at any partner location.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-600 mr-3">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Premium Design</h3>
                        <p className="text-sm text-gray-600">Our physical cards are elegantly designed and durable.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full text-red-600 mr-3">
                        <QrCode className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Equipped with QR Code</h3>
                        <p className="text-sm text-gray-600">Easily scannable QR code for quick membership verification.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Card Activation</h3>
                        <p className="text-sm text-gray-600">Activate your physical card via our customer support hotline.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                    Request Physical Card
                  </Button>
                </div>
                
                <div className="flex items-center justify-center mt-8 lg:mt-0">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle>Physical Card Request</CardTitle>
                      <CardDescription>
                        Your physical card will be delivered to your registered address within 14 business days.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Processing Time:</span>
                          <span className="font-medium">3-5 business days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Delivery Time:</span>
                          <span className="font-medium">7-10 business days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Processing Fee:</span>
                          <span className="font-medium">CFA 2,000</span>
                        </div>
                        <div className="border-t pt-4 mt-4">
                          <p className="text-gray-600">
                            For urgent requests or special delivery instructions, please contact our customer support.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Contact Support</Button>
                      <Button className="bg-club66-purple hover:bg-club66-darkpurple">Track Request</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-white rounded-xl shadow-md p-6 mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Membership Card FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">How do I activate my digital membership card?</h3>
                <p className="text-gray-600 mt-1">Your digital card is automatically activated upon successful membership payment. You can access it immediately from your dashboard.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">How do merchants verify my membership?</h3>
                <p className="text-gray-600 mt-1">Merchants scan the QR code on your digital or physical card using their device to verify your membership status and applicable discounts.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">What if I lose my physical card?</h3>
                <p className="text-gray-600 mt-1">You can report your lost card through customer support and request a replacement. A fee may apply for replacement cards.</p>
              </div>
              <div>
                <h3 className="font-medium text-lg">Can I use my membership card at all partner locations?</h3>
                <p className="text-gray-600 mt-1">Yes, your membership card is valid at all participating Club66 Global businesses and partner merchants.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
