
import React from "react";
import Layout from "@/components/layout/Layout";

const AssociationMembers = () => {
  // Sample members data
  const boardMembers = [
    {
      name: "Dr. Amadou Koné",
      position: "President",
      bio: "Dr. Koné brings over 20 years of experience in economic development across West Africa.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Fatima Tall",
      position: "Vice President",
      bio: "As a leading entrepreneur in Mali, Fatima has founded several successful businesses in the retail sector.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Jean-Baptiste Cissé",
      position: "Secretary General",
      bio: "With a background in international relations, Jean-Baptiste oversees Club66's expansion strategy.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Aisha Diallo",
      position: "Treasurer",
      bio: "Aisha's financial expertise has been instrumental in creating sustainable business models for Club66.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    }
  ];
  
  const executiveMembers = [
    {
      name: "Omar Traoré",
      position: "Chief Executive Officer",
      bio: "Omar leads the day-to-day operations of Club66 with a focus on innovation and growth.",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Mariam Touré",
      position: "Chief Operating Officer",
      bio: "Mariam ensures that Club66's operations run smoothly across all countries and divisions.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Ibrahim Keita",
      position: "Chief Financial Officer",
      bio: "Ibrahim oversees the financial health of Club66 and directs investment strategies.",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      name: "Sophie Sidibé",
      position: "Chief Marketing Officer",
      bio: "Sophie develops Club66's brand strategy and directs all marketing initiatives.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Association Members
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Club66 is governed by a dedicated group of professionals committed to our mission of 
            creating economic opportunities and fostering community development across Africa.
          </p>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Board of Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-club66-purple mb-2">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Executive Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {executiveMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                />
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-club66-purple mb-2">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssociationMembers;
