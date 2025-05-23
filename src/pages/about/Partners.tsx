
import React from "react";
import Layout from "@/components/layout/Layout";

const Partners = () => {
  // Sample partners data
  const corporatePartners = [
    {
      name: "Mali Bank",
      logo: "/placeholder.svg",
      description: "Providing financial services and solutions for Club66 members.",
      website: "https://example.com",
    },
    {
      name: "Telecom Mali",
      logo: "/placeholder.svg",
      description: "Offering exclusive communication packages for Club66 members.",
      website: "https://example.com",
    },
    {
      name: "Retail Chain",
      logo: "/placeholder.svg",
      description: "Providing discounts on groceries and household items.",
      website: "https://example.com",
    },
    {
      name: "Mali Health Insurance",
      logo: "/placeholder.svg",
      description: "Offering healthcare coverage at reduced rates for Club66 members.",
      website: "https://example.com",
    },
  ];
  
  const endorsements = [
    {
      name: "Ministry of Trade and Industry",
      logo: "/placeholder.svg",
      statement: "Club66 represents an innovative approach to stimulating local economies and creating opportunities for small businesses.",
      representative: "Hon. Minister Issa Diallo",
    },
    {
      name: "Chamber of Commerce",
      logo: "/placeholder.svg",
      statement: "The Club66 initiative aligns with our goals of fostering entrepreneurship and creating a vibrant business ecosystem.",
      representative: "President, Bamako Chamber of Commerce",
    },
    {
      name: "Women Entrepreneurs Association",
      logo: "/placeholder.svg",
      statement: "Club66 has created unprecedented opportunities for women-owned businesses to thrive and expand their customer base.",
      representative: "Chairperson, Mali Women Entrepreneurs Association",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Partners & Endorsements
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Club66 partners with leading organizations and institutions to bring the best possible 
            benefits and services to our members. We are also honored to be endorsed by respected 
            entities that share our vision for community development.
          </p>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Corporate Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {corporatePartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <h3 className="font-bold text-xl">{partner.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{partner.description}</p>
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-club66-purple hover:underline"
                >
                  Visit website
                </a>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Endorsements</h2>
          <div className="space-y-6">
            {endorsements.map((endorsement, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={endorsement.logo} 
                    alt={endorsement.name} 
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <h3 className="font-bold text-xl">{endorsement.name}</h3>
                </div>
                <blockquote className="border-l-4 border-club66-purple pl-4 italic mb-4">
                  "{endorsement.statement}"
                </blockquote>
                <p className="text-right text-gray-600">— {endorsement.representative}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;
