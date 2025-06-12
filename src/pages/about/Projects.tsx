
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/projects/ProjectCard";
import ContributionModal from "@/components/projects/ContributionModal";
import { useProjects, Project } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const { projects, loading, refetch } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  // Sample static projects data for display
  const staticProjects = [
    {
      title: "Youth Entrepreneurship Initiative",
      image: "/placeholder.svg",
      description: "Providing startup funding and mentorship to young entrepreneurs across Mali.",
      progress: 75,
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

  const handleContribute = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsContributionModalOpen(true);
    }
  };

  const handleContributionSuccess = () => {
    refetch();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          Our Projects
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <p className="text-lg text-center mb-12">
            Club66 invests in projects that create lasting positive impact in our communities. 
            A portion of every membership fee contributes to these initiatives, making our 
            members part of something bigger than themselves.
          </p>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Projects</TabsTrigger>
              <TabsTrigger value="crowdfunding">Community Crowdfunding</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-8">
              <div className="space-y-8">
                {staticProjects.map((project, index) => (
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
            </TabsContent>

            <TabsContent value="crowdfunding" className="space-y-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No Active Crowdfunding Projects</h3>
                  <p className="text-gray-600">Check back soon for new community projects to support!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onContribute={handleContribute}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </TabsContent>
          </Tabs>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center mt-12">
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

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        project={selectedProject}
        onSuccess={handleContributionSuccess}
      />
    </Layout>
  );
};

export default Projects;
