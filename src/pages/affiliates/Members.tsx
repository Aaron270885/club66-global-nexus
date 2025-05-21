
import { Users, Percent, ArrowRight, DollarSign, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Members = () => {
  const benefits = [
    "Earn 10% commission on all membership fees paid by your referrals",
    "Commission applies to both annual and monthly fees",
    "Recurring income for as long as your referrals remain active members",
    "Unlimited referral potential - no cap on how many people you can refer",
    "Real-time tracking of referrals and earnings in your dashboard",
    "Monthly commission payments directly to your preferred payment method"
  ];
  
  const commissionExamples = [
    {
      tier: "Essential",
      annualFee: 10000,
      monthlyFee: 1000,
      firstYearCommission: 22000,
      ongoingCommission: 1000,
      referrals: 5
    },
    {
      tier: "Premium",
      annualFee: 10000,
      monthlyFee: 2000,
      firstYearCommission: 34000,
      ongoingCommission: 2000,
      referrals: 5
    },
    {
      tier: "Elite",
      annualFee: 10000,
      monthlyFee: 5000,
      firstYearCommission: 55000,
      ongoingCommission: 5000,
      referrals: 5
    }
  ];
  
  const faqItems = [
    {
      question: "How do I get my referral code?",
      answer: "Your unique referral code is automatically generated when you become a member. You can find it in your member dashboard under the 'Affiliate' section."
    },
    {
      question: "When are commissions paid out?",
      answer: "Commissions are calculated monthly and paid out during the first week of the following month. For example, commissions earned in January are paid by the first week of February."
    },
    {
      question: "How do I track my referrals?",
      answer: "You can track all your referrals and commissions in real-time through your member dashboard's 'Affiliate' section. This includes pending and paid commissions, as well as the membership status of your referrals."
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer: "No, there is no limit. You can refer as many people as you want and earn commissions on all of them. The more members you refer, the higher your potential earnings."
    }
  ];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Member Affiliate Program</h1>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Share the benefits of Club66 Global and earn commissions for referrals. Our affiliate program rewards you 
            for spreading the word about our membership benefits.
          </p>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-club66-purple/10 rounded-full px-4 py-1.5 mb-6">
                  <Percent className="h-4 w-4 mr-2 text-club66-purple" />
                  <span className="text-sm font-medium text-club66-purple">10% Commission</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Earn While You Share</h2>
                <p className="text-gray-600 mb-6">
                  As a Club66 Global member, you can earn additional income by referring friends, family, and colleagues 
                  to join our membership program. For every new member who signs up using your unique referral code, you'll 
                  receive 10% of their membership fees for as long as they remain an active member.
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
                
                <Button asChild className="bg-club66-purple hover:bg-club66-darkpurple">
                  <Link to="/register" className="flex items-center">
                    Join & Start Earning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Affiliate Earnings Example</h3>
                  <p className="text-gray-600 mb-4">
                    See how much you can earn by referring just 5 members of each tier:
                  </p>
                  <div className="space-y-6">
                    {commissionExamples.map((example, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center mb-3">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            example.tier === "Elite" ? "bg-club66-purple" : 
                            example.tier === "Premium" ? "bg-amber-500" : "bg-gray-500"
                          }`}></div>
                          <h4 className="font-bold">5 {example.tier} Members</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Fee Per Member:</span>
                            <span>CFA {example.annualFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Fee Per Member:</span>
                            <span>CFA {example.monthlyFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Your Commission (First Year):</span>
                            <span className="text-green-600">CFA {example.firstYearCommission.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Your Monthly Recurring Commission:</span>
                            <span className="text-green-600">CFA {example.ongoingCommission.toLocaleString()}/month</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-6 border-t">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total First Year Commission (15 referrals):</span>
                    <span className="text-green-600">CFA 111,000</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 font-bold">
                    <span>Total Monthly Recurring Commission:</span>
                    <span className="text-green-600">CFA 8,000/month</span>
                  </div>
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
                  <CardTitle>Join Club66 Global</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Become a member and get your unique affiliate code automatically assigned to your account.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">2</span>
                  </div>
                  <CardTitle>Share Your Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Share your referral code with friends, family, and colleagues through social media, messaging, or in person.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">3</span>
                  </div>
                  <CardTitle>They Join Using Your Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    When they register, they enter your referral code to link their membership to your affiliate account.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-club66-purple">4</span>
                  </div>
                  <CardTitle>Earn Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You earn 10% of their membership fees for as long as they remain active Club66 Global members.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-lg flex justify-between items-center cursor-pointer">
                      <span>{item.question}</span>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-club66-purple text-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8 md:flex items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
                  <p className="mb-0">
                    Join Club66 Global today and turn your connections into income with our 
                    affiliate program. The more people you refer, the more you earn!
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/register">Sign Up Now</Link>
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

export default Members;
