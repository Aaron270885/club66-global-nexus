
import { ShoppingBag, Users, Percent, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Merchants = () => {
  const benefits = [
    "Access to Club66 Global's growing member base",
    "Increased customer traffic and loyalty",
    "Zero upfront costs or monthly fees",
    "Simple membership validation through QR scanning",
    "Marketing support and promotion to all members",
    "Detailed analytics and reporting"
  ];
  
  const merchantTypes = [
    {
      type: "Retail",
      discount: "5-15%",
      examples: "Clothing stores, electronics, grocery stores",
      minimumTerm: "6 months"
    },
    {
      type: "Food & Dining",
      discount: "10-15%",
      examples: "Restaurants, cafés, food delivery",
      minimumTerm: "6 months"
    },
    {
      type: "Services",
      discount: "10-20%",
      examples: "Salons, gyms, professional services",
      minimumTerm: "6 months"
    },
    {
      type: "Entertainment",
      discount: "15-25%",
      examples: "Cinemas, events, tourist attractions",
      minimumTerm: "3 months"
    }
  ];
  
  const testimonials = [
    {
      name: "Ibrahim Koné",
      business: "Tech Haven Electronics",
      quote: "Partnering with Club66 Global has brought us consistent new customers. The membership verification system is simple to use, and we've seen a 30% increase in repeat business.",
      role: "Owner"
    },
    {
      name: "Aminata Diallo",
      business: "Café Touareg",
      quote: "Since becoming a merchant partner, we've welcomed dozens of new customers each month. The Club66 Global team promotes our business regularly, and the additional revenue far outweighs the discounts we offer.",
      role: "Manager"
    },
    {
      name: "Mohammed Touré",
      business: "Fashion Hub Boutique",
      quote: "The partnership has been seamless. We offer a 12% discount to Club66 Global members, but we've seen a 40% increase in overall sales as these customers tend to spend more and bring friends.",
      role: "Director"
    }
  ];
  
  const faqItems = [
    {
      question: "How does the merchant partnership work?",
      answer: "As a merchant partner, you agree to offer a specified discount to Club66 Global members. When members visit your business, they present their digital or physical membership card with a QR code. Your staff scans this code using our mobile app or device to verify membership and apply the discount. There are no upfront costs or monthly fees to join as a merchant partner."
    },
    {
      question: "What discount percentage do I need to offer?",
      answer: "Discount percentages typically range from 5% to 25% depending on your industry and business type. We work with each merchant to determine a discount rate that makes sense for your business model and profit margins while still being attractive to our members."
    },
    {
      question: "How do I validate Club66 Global memberships?",
      answer: "You'll receive access to our merchant verification app, which allows you to scan member QR codes. The app instantly verifies membership status and tier, shows the applicable discount, and keeps track of member visits for your analytics."
    },
    {
      question: "How will my business be promoted to Club66 Global members?",
      answer: "Your business will be featured in our member directory, mobile app, and website. We also promote merchant partners through regular email newsletters, social media posts, and special promotions. Premium merchant partners can also be featured in our 'Spotlight' section with enhanced visibility."
    }
  ];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Merchant Partner Program</h1>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of partner businesses and tap into Club66 Global's membership base.
            Increase customer traffic and build loyalty by offering exclusive member discounts.
          </p>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-club66-purple/10 rounded-full px-4 py-1.5 mb-6">
                  <Users className="h-4 w-4 mr-2 text-club66-purple" />
                  <span className="text-sm font-medium text-club66-purple">Growing Member Base</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Expand Your Customer Reach</h2>
                <p className="text-gray-600 mb-6">
                  Partner with Club66 Global and connect with our rapidly growing member base. By offering exclusive 
                  discounts to our members, you'll attract new customers, increase repeat visits, and build lasting 
                  loyalty—all with zero upfront costs or monthly fees.
                </p>
                
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4" />
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                  <Link to="/register" className="flex items-center">
                    Become a Partner Merchant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Partnership Types</h3>
                  <div className="space-y-6">
                    {merchantTypes.map((type, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h4 className="font-bold mb-2">{type.type} Businesses</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <span className="text-gray-600">Typical Discount:</span>
                          <span className="font-medium">{type.discount}</span>
                          <span className="text-gray-600">Examples:</span>
                          <span className="font-medium">{type.examples}</span>
                          <span className="text-gray-600">Minimum Term:</span>
                          <span className="font-medium">{type.minimumTerm}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-6 border-t">
                  <p className="text-sm text-gray-600">
                    Our partnership team works closely with each merchant to create a customized 
                    agreement that works for your specific business model and objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">1</span>
                  </div>
                  <CardTitle>Partner With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Apply to become a merchant partner and agree on the discount percentage you'll offer to members.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">2</span>
                  </div>
                  <CardTitle>Get Equipped</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive access to our merchant app for QR code scanning and membership verification.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">3</span>
                  </div>
                  <CardTitle>Welcome Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Club66 Global members visit your business and present their membership cards.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">4</span>
                  </div>
                  <CardTitle>Grow Together</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Track your results, gain loyal customers, and grow your business with our expanding member base.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <Tabs defaultValue="testimonials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="testimonials">Partner Testimonials</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="testimonials" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hear From Our Merchant Partners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex items-center mb-4">
                            <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center mr-4">
                              <span className="font-bold text-gray-500">{testimonial.name[0]}</span>
                            </div>
                            <div>
                              <h4 className="font-bold">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.business}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqItems.map((item, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-bold mb-2">{item.question}</h4>
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8 md:flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Ready to Partner With Club66 Global?</h3>
                  <p className="text-gray-600 mb-6 md:mb-0">
                    Join our network of merchant partners and start attracting Club66 Global members to your business.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">
                    Contact Sales
                  </Button>
                  <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                    Apply Now
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

export default Merchants;
