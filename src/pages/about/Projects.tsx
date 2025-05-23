
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const Projects = () => {
  // Sample projects data
  const currentProjects = [
    {
      title: "Youth Entrepreneurship Initiative",
      image: "/placeholder.svg",
      description: "Providing startup funding and mentorship to young entrepreneurs across Mali.",
      progress: 75, // percentage complete
      goal: "CFA 50,000,000",
      raised: "CFA 37,500,000",
    },
    {
      title: "Digital Literacy Program",
      image: "/placeholder.svg",
      description: "Training 1,000 young people in essential digital skills to increase their employability.",
      progress: 60,
      goal: "1,000 Students",
      raised: "600 Students Trained",
    },
    {
      title: "Community Health Clinics",
      image: "/placeholder.svg",
      description: "Establishing accessible healthcare facilities in underserved communities.",
      progress: 40,
      goal: "5 Clinics",
      raised: "2 Clinics Established",
    },
  ];
  
  const upcomingProjects = [
    {
      title: "Agricultural Modernization",
      image: "/placeholder.svg",
      description: "Introducing sustainable farming techniques and equipment to rural communities.",
      target: "Launch: Q3 2025",
    },
    {
      title: "Women in Tech Scholarship",
      image: "/placeholder.svg",
      description: "Providing educational opportunities for women pursuing careers in technology.",
      target: "Launch: Q4 2025",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Our Projects
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Club66 invests in projects that create lasting positive impact in our communities. 
            A portion of every membership fee contributes to these initiatives, making our 
            members part of something bigger than themselves.
          </p>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Current Projects</h2>
          <div className="space-y-8 mb-12">
            {currentProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="md:flex">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-club66-purple h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Goal: {project.goal}</span>
                      <span>Raised: {project.raised}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-club66-purple">Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="bg-gray-100 rounded-full px-4 py-1 inline-block text-sm text-gray-700">
                    {project.target}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <h3 className="text-xl font-bold mb-2">Submit a Project Proposal</h3>
            <p className="mb-4">
              Do you have an idea for a community project that aligns with Club66's mission? 
              We welcome proposals from our members and the wider community.
            </p>
            <Button variant="default" className="bg-club66-purple hover:bg-club66-darkpurple">
              Submit Proposal
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
