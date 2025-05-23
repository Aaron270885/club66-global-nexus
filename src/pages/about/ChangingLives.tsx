
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Award, BookOpen, Lightbulb, Goal, Users } from "lucide-react";

const ChangingLives = () => {
  const impactStatistics = [
    { value: "5000+", label: "Members Supported", icon: Users },
    { value: "300+", label: "Businesses Empowered", icon: Award },
    { value: "120+", label: "Scholarships Awarded", icon: BookOpen },
    { value: "50+", label: "Community Projects", icon: Lightbulb },
  ];

  const socialInitiatives = [
    {
      title: "Educational Scholarships",
      description: "Supporting talented young people with local scholarships for vocational training, technical education, and university studies.",
      image: "https://placehold.co/400x300/e9d5ff/7c3aed?text=Scholarships"
    },
    {
      title: "Startup Capital Grants",
      description: "Providing seed capital and mentorship to entrepreneurs with innovative ideas to create businesses that solve local challenges.",
      image: "https://placehold.co/400x300/e9d5ff/7c3aed?text=Startup+Grants"
    },
    {
      title: "Vocational Training",
      description: "Offering technical and vocational training to help community members develop in-demand skills and secure better livelihoods.",
      image: "https://placehold.co/400x300/e9d5ff/7c3aed?text=Vocational+Training"
    },
    {
      title: "Health Initiatives",
      description: "Providing one-year health insurance packages to families in need and supporting local health infrastructure development.",
      image: "https://placehold.co/400x300/e9d5ff/7c3aed?text=Health+Initiatives"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-club66-purple">
          Changing Lives!
        </h1>
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-700">
            At Club66, our mission extends far beyond providing membership 
            benefits. We are committed to making a real, tangible difference 
            in the communities we serve.
          </p>
        </div>
        
        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {impactStatistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-club66-purple" />
              </div>
              <p className="text-3xl font-bold text-club66-purple">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-center mb-8">Our Impact</h2>
          <p>
            Through various initiatives and social responsibility programs, 
            Club66 has been able to touch thousands of lives across Africa. 
            From educational scholarships to entrepreneurial support, we believe 
            in empowering individuals to create better futures for themselves, 
            their families, and their communities.
          </p>
          <p>
            Every Club66 membership directly contributes to these social initiatives. 
            A percentage of all membership fees goes toward funding our community 
            projects, meaning that our members are active participants in creating 
            positive change.
          </p>

          {/* Social Benefits & Initiatives */}
          <h2 className="text-center mt-12 mb-8">Our Social Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-12">
            {socialInitiatives.map((initiative, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={initiative.image} 
                  alt={initiative.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{initiative.title}</h3>
                  <p className="text-gray-600">{initiative.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2>Success Stories</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="font-bold mb-2">Aminata's Story</h3>
            <p>
              "Through Club66's scholarship program, I was able to complete my 
              education in computer science. Today, I run my own tech startup 
              that employs seven young professionals in Bamako. This opportunity 
              has transformed not just my life, but the lives of everyone in my family."
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Aminata D., Club66 Scholarship Recipient
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="font-bold mb-2">Ibrahim's Enterprise</h3>
            <p>
              "The startup capital I received from Club66 helped me expand my 
              small grocery store into a thriving business. I can now provide 
              for my family and even hire two employees from my community. The 
              business mentorship they provided was just as valuable as the financial support."
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Ibrahim T., Business Grant Recipient
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6">
            <h3 className="font-bold mb-2">Fatima's Health Journey</h3>
            <p>
              "After being diagnosed with a chronic condition, I was worried about 
              the cost of ongoing treatment. The health insurance package from Club66's 
              social program has meant I can access the care I need without financial 
              stress. It has literally been a lifesaver for me."
            </p>
            <p className="text-sm text-gray-600 mt-2">
              — Fatima K., Health Initiative Beneficiary
            </p>
          </div>
          
          <h2>Join Our Mission</h2>
          <p>
            By becoming a Club66 member, you're not just gaining access to 
            discounts and services—you're becoming part of a movement that's 
            transforming lives and communities throughout Africa.
          </p>
          <p>
            A percentage of every membership fee goes directly to our social 
            impact initiatives, meaning your membership is helping create 
            positive change.
          </p>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-club66-purple to-purple-600 text-white rounded-2xl p-8 max-w-3xl mx-auto mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Ready to Make an Impact?</h3>
              <p className="text-purple-100">
                Join Club66 today and be part of our mission to change lives across Africa.
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg" 
              className="whitespace-nowrap"
              onClick={() => window.location.href = '/register'}
            >
              <Heart className="h-5 w-5 mr-2" /> Join Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangingLives;
