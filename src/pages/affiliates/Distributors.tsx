
import { Users, Briefcase, Award, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Distributors = () => {
  const benefits = [
    "Exclusive territory rights for member recruitment",
    "Higher commission rates compared to regular affiliates",
    "Build and manage your own team of sub-affiliates",
    "Additional revenue from team performance bonuses",
    "Comprehensive training and marketing materials",
    "Direct support from Club66 Global headquarters"
  ];
  
  const distributorLevels = [
    {
      level: "City Distributor",
      commission: "15% direct + 5% from team",
      requirement: "Recruit 50+ members and build a team of 5+ sub-affiliates",
      territory: "Exclusive rights in specific city zones"
    },
    {
      level: "Regional Distributor",
      commission: "15% direct + 7% from team",
      requirement: "Manage 3+ city distributors with total of 200+ members",
      territory: "Exclusive rights to a full city or region"
    },
    {
      level: "National Distributor",
      commission: "20% direct + 10% from team",
      requirement: "Manage multiple regional distributors with 1,000+ members",
      territory: "Country-wide exclusivity for specific sectors"
    }
  ];
  
  const requirements = [
    {
      title: "Business Experience",
      description: "Minimum 2 years experience in sales, marketing, or business ownership",
      essential: true
    },
    {
      title: "Financial Capacity",
      description: "Ability to invest in initial setup and team development",
      essential: true
    },
    {
      title: "Local Presence",
      description: "Physical office or facility in your operating territory",
      essential: true
    },
    {
      title: "Sales Team",
      description: "Capacity to build and manage a team of sales representatives",
      essential: true
    },
    {
      title: "Tech Proficiency",
      description: "Comfort with digital tools and mobile applications",
      essential: true
    },
    {
      title: "Higher Education",
      description: "University degree in business or related field",
      essential: false
    }
  ];
  
  const earnings = [
    {
      scenario: "City Distributor with 100 Members & 10 Sub-affiliates",
      calculation: [
        {
          line: "Direct commissions from 20 personal recruits (Elite Tier)",
          amount: "CFA 240,000 annually"
        },
        {
          line: "Team commissions from 80 members recruited by sub-affiliates",
          amount: "CFA 480,000 annually"
        },
        {
          line: "Performance bonuses for team growth targets",
          amount: "CFA 200,000 annually"
        },
        {
          line: "Total Potential Annual Income",
          amount: "CFA 920,000 annually",
          isTotal: true
        }
      ]
    },
    {
      scenario: "Regional Distributor managing 3 City Distributors",
      calculation: [
        {
          line: "Direct commissions from personal recruits",
          amount: "CFA 300,000 annually"
        },
        {
          line: "Team commissions from 300+ members in network",
          amount: "CFA 1,260,000 annually"
        },
        {
          line: "Override commissions from City Distributors",
          amount: "CFA 540,000 annually"
        },
        {
          line: "Performance bonuses for regional growth",
          amount: "CFA 400,000 annually"
        },
        {
          line: "Total Potential Annual Income",
          amount: "CFA 2,500,000 annually",
          isTotal: true
        }
      ]
    }
  ];
  
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Distributor Program</h1>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Build and manage your own team, secure exclusive territory rights, and earn enhanced commissions.
            Take your entrepreneurial journey to the next level with Club66 Global.
          </p>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-club66-purple/10 rounded-full px-4 py-1.5 mb-6">
                  <Briefcase className="h-4 w-4 mr-2 text-club66-purple" />
                  <span className="text-sm font-medium text-club66-purple">Business Opportunity</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Build Your Own Club66 Global Business</h2>
                <p className="text-gray-600 mb-6">
                  The Distributor Program offers ambitious entrepreneurs the opportunity to build a substantial business 
                  within the Club66 Global ecosystem. As a distributor, you'll secure exclusive territory rights, 
                  build your own sales team, and earn enhanced commissions on all members recruited within your network.
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
                  Apply for Distributor Program
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Distributor Levels & Commissions</h3>
                  <div className="space-y-6">
                    {distributorLevels.map((level, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold">{level.level}</h4>
                          <Badge className={
                            index === 2 ? "bg-club66-purple" : 
                            index === 1 ? "bg-amber-500" : "bg-blue-500"
                          }>
                            {level.commission}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <span className="text-gray-600 w-24 shrink-0">Requirement:</span>
                            <span>{level.requirement}</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-gray-600 w-24 shrink-0">Territory:</span>
                            <span>{level.territory}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-6 border-t">
                  <p className="text-sm text-gray-600">
                    Distributor levels are based on performance and team size. As your network grows, 
                    you can advance to higher levels with increased benefits and commission rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Eligibility Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {requirements.map((req, index) => (
                <Card key={index} className={req.essential ? "border-green-200" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{req.title}</CardTitle>
                      {req.essential ? (
                        <Badge variant="outline" className="border-green-500 text-green-600">Required</Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-400 text-gray-600">Preferred</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{req.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center text-gray-600">
              <p>
                Meeting these requirements doesn't guarantee acceptance. All distributor applications 
                are evaluated on a case-by-case basis with consideration for territory availability.
              </p>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Income Potential</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {earnings.map((earning, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg">{earning.scenario}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <tbody>
                        {earning.calculation.map((line, idx) => (
                          <tr key={idx} className={line.isTotal ? "bg-gray-50 font-bold" : ""}>
                            <td className="p-4 border-b border-gray-100">
                              {line.line}
                            </td>
                            <td className={`p-4 border-b border-gray-100 text-right ${line.isTotal ? "text-green-600" : ""}`}>
                              {line.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t text-sm text-gray-500">
                    <p>*These figures are illustrative examples and not guaranteed earnings.</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">The Application Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-club66-purple">1</span>
                    </div>
                    <h3 className="font-bold mb-2">Initial Application</h3>
                    <p className="text-gray-600">
                      Complete our detailed distributor application form with your business experience and vision.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-club66-purple">2</span>
                    </div>
                    <h3 className="font-bold mb-2">Interview & Evaluation</h3>
                    <p className="text-gray-600">
                      Participate in interviews with our distribution team and present your business plan.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-club66-purple/10 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-club66-purple">3</span>
                    </div>
                    <h3 className="font-bold mb-2">Onboarding & Launch</h3>
                    <p className="text-gray-600">
                      Complete training, sign agreements, and launch your distributor business with our support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 border-t">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h3 className="font-bold text-xl mb-2">Ready to Build Your Distribution Business?</h3>
                    <p className="text-gray-600">
                      Take the first step toward becoming a Club66 Global distributor and creating significant income opportunities.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" asChild>
                      <Link to="/distributor-brochure">Download Brochure</Link>
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
      </div>
    </Layout>
  );
};

export default Distributors;
