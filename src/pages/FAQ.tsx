
import { useState } from 'react';
import { Search, CreditCard, Users, ShieldCheck, ChevronsDown, ChevronsUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };
  
  const categories = [
    {
      id: "membership",
      name: "Membership",
      icon: Users,
      questions: [
        {
          id: 1,
          question: "How do I sign up for a Club66 Global membership?",
          answer: "You can sign up for a membership by clicking the 'Register' button on our website or downloading our mobile app. Fill out the registration form with your personal details, choose your membership tier, select optional social benefits, and complete the payment process. Once payment is confirmed, your digital membership card will be instantly activated."
        },
        {
          id: 2,
          question: "What are the different membership tiers available?",
          answer: "We offer three membership tiers: Essential (5% discount at Club66 Global businesses), Premium (10% discount), and Elite (20% discount). All tiers include access to partner business discounts and other benefits, but higher tiers provide increased discount percentages and additional perks. Each tier has different pricing: Essential costs CFA 10,000 per year + CFA 1,000 per month, Premium costs CFA 10,000 per year + CFA 2,000 per month, and Elite costs CFA 10,000 per year + CFA 5,000 per month."
        },
        {
          id: 3,
          question: "How do I upgrade my membership tier?",
          answer: "You can upgrade your membership tier at any time through your member dashboard. Simply navigate to the 'Membership' section, select 'Upgrade Membership', choose your desired tier, and complete the payment process for the difference. Your new benefits will be activated immediately after the payment is confirmed."
        },
        {
          id: 4,
          question: "Can I change my selected social benefits after registration?",
          answer: "Yes, you can modify your selected social benefits through your member dashboard. However, some changes may be subject to administrative fees or waiting periods, depending on the benefits involved. Contact customer support for assistance with specific changes to your social benefits selection."
        }
      ]
    },
    {
      id: "cards",
      name: "Membership Cards",
      icon: CreditCard,
      questions: [
        {
          id: 5,
          question: "How do I access my digital membership card?",
          answer: "Your digital membership card is automatically generated after your registration is complete. You can access it through your member dashboard on our website or through our mobile app. The digital card includes your unique member ID, name, and a QR code for verification by partner merchants."
        },
        {
          id: 6,
          question: "How do I request a physical membership card?",
          answer: "You can request a physical membership card through your member dashboard. Navigate to the 'Membership Card' section, select 'Request Physical Card', confirm your mailing address, and complete any applicable payment for processing and delivery fees. Physical cards typically arrive within 14 business days."
        },
        {
          id: 7,
          question: "How do merchants verify my membership?",
          answer: "Partner merchants verify your membership by scanning the QR code on your digital or physical card using their authorized device. The scan confirms your membership status, tier, and applicable discount. The verification shows a green indicator for valid memberships or a red indicator for invalid or expired memberships."
        },
        {
          id: 8,
          question: "What should I do if my card is not working at a partner location?",
          answer: "If your card is not being recognized at a partner location, first ensure your membership is active and not expired. If the issue persists, you can contact our customer support hotline for immediate assistance. Our support team can verify your membership status and help resolve any technical issues with the merchant."
        }
      ]
    },
    {
      id: "benefits",
      name: "Benefits & Discounts",
      icon: ShieldCheck,
      questions: [
        {
          id: 9,
          question: "What discounts do I receive with my membership?",
          answer: "Your discount depends on your membership tier: Essential members receive 5% off at Club66 Global businesses, Premium members receive 10% off, and Elite members receive 20% off. Additionally, all members receive exclusive discounts at our partner businesses, which vary by partner but typically range from 5% to 15%."
        },
        {
          id: 10,
          question: "What are the optional social benefits I can select?",
          answer: "Upon subscribing, you can choose from several social benefits including: Startup Capital, Residential Land Plot, Payday Loans (with preferential interest rates), Scholarship or Professional Training, and Pilgrimage Package (Muslim/Christian). Each option has its standard charges, which will be clearly displayed during the selection process."
        },
        {
          id: 11,
          question: "How do I use my discount at partner businesses?",
          answer: "To use your discount, simply present your digital or physical membership card at the time of purchase. The merchant will scan your card to verify your membership and apply the appropriate discount automatically. The discount is applied to the final purchase amount before tax."
        },
        {
          id: 12,
          question: "Where can I see a list of all partner businesses?",
          answer: "A complete list of partner businesses is available on our website and mobile app. You can filter partners by category, location, or discount percentage. Each partner listing includes details about their location, business hours, and the specific discounts available to Club66 Global members."
        }
      ]
    },
    {
      id: "payments",
      name: "Payments & Billing",
      icon: CreditCard,
      questions: [
        {
          id: 13,
          question: "What payment methods are accepted?",
          answer: "We accept payments through various methods including: Mobile Money (Orange Money, Moov Money, Wave), Bank Transfers, and Credit Cards (via Stripe and PayPal). Payment methods may vary by country, with mobile money being the preferred option in Mali."
        },
        {
          id: 14,
          question: "How often will I be billed for my membership?",
          answer: "Your membership includes an annual fee of CFA 10,000 billed once a year, plus a monthly fee that varies by tier (CFA 1,000 for Essential, CFA 2,000 for Premium, or CFA 5,000 for Elite). The monthly fee is billed on the same day each month from your registration date."
        },
        {
          id: 15,
          question: "How do I update my payment information?",
          answer: "You can update your payment information through your member dashboard. Navigate to the 'Billing' section, select 'Payment Methods', and follow the instructions to add, remove, or update your payment details. Changes will apply to your next billing cycle."
        },
        {
          id: 16,
          question: "What is the refund policy?",
          answer: "Membership fees are generally non-refundable. However, in exceptional circumstances, refunds may be considered on a case-by-case basis. Please contact our customer support team with your specific situation for assistance with potential refunds."
        }
      ]
    },
    {
      id: "affiliate",
      name: "Affiliate Program",
      icon: Users,
      questions: [
        {
          id: 17,
          question: "How does the affiliate program work?",
          answer: "Our affiliate program allows members to earn commissions by referring new members. Each member receives a unique affiliate code to share. When someone signs up using your code, you earn 10% of their membership fees paid (both annual and monthly) for as long as they remain an active member."
        },
        {
          id: 18,
          question: "How do I track my affiliate earnings?",
          answer: "You can track all your affiliate activities and earnings through the 'Affiliate Dashboard' in your member account. The dashboard shows your referrals, their membership status, and your commission history. Commissions are calculated monthly based on the membership fees paid by your referrals."
        },
        {
          id: 19,
          question: "When and how are affiliate commissions paid?",
          answer: "Affiliate commissions are paid monthly, typically within the first week of the month for the previous month's earnings. Payments are made to your preferred payment method, which you can set in your affiliate dashboard. Available payment methods include mobile money, bank transfer, or credit to your Club66 Global account."
        },
        {
          id: 20,
          question: "Is there a limit to how many people I can refer?",
          answer: "There is no limit to the number of people you can refer to Club66 Global. The more members you refer, the more commission you can earn. High-performing affiliates may also qualify for additional bonuses and incentives through our tiered affiliate program."
        }
      ]
    }
  ];
  
  const allQuestions = categories.flatMap(category => category.questions);
  
  const filteredQuestions = searchTerm
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find answers to common questions about Club66 Global membership and services.
            Can't find what you're looking for? Contact our support team.
          </p>
          
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search for answers..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {searchTerm && (
              <div className="mt-6">
                <h2 className="font-medium mb-4">Search Results ({filteredQuestions.length})</h2>
                {filteredQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredQuestions.map((q) => (
                      <Card key={q.id} className="border">
                        <CardHeader className="py-3">
                          <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleQuestion(q.id)}
                          >
                            <CardTitle className="text-lg">{q.question}</CardTitle>
                            {expandedQuestion === q.id ? (
                              <ChevronsUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronsDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </CardHeader>
                        {expandedQuestion === q.id && (
                          <CardContent className="pt-0 pb-4">
                            <p className="text-gray-600">{q.answer}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">No results found for "{searchTerm}"</p>
                    <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!searchTerm && (
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="membership">
                <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center py-3">
                      <category.icon className="h-5 w-5 mb-1" />
                      <span>{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {categories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="space-y-4">
                      {category.questions.map((q) => (
                        <Card key={q.id} className="border">
                          <CardHeader className="py-3">
                            <div 
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleQuestion(q.id)}
                            >
                              <CardTitle className="text-lg">{q.question}</CardTitle>
                              {expandedQuestion === q.id ? (
                                <ChevronsUp className="h-5 w-5 text-gray-400" />
                              ) : (
                                <ChevronsDown className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </CardHeader>
                          {expandedQuestion === q.id && (
                            <CardContent className="pt-0 pb-4">
                              <p className="text-gray-600">{q.answer}</p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
          
          <div className="mt-16 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is ready to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-club66-purple hover:bg-club66-darkpurple">
                Contact Support
              </Button>
              <Button variant="outline">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
