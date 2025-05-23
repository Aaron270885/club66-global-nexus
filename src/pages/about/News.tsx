
import React from "react";
import Layout from "@/components/layout/Layout";
import { CalendarIcon } from "lucide-react";

const News = () => {
  // Sample news data
  const newsArticles = [
    {
      title: "Club66 Expands to Nigeria",
      date: "May 15, 2025",
      summary: "Following our success in Mali, Club66 is proud to announce our expansion into Nigeria, Africa's most populous country.",
      image: "/placeholder.svg",
      category: "Expansion",
      url: "#",
    },
    {
      title: "Partnership Announcement with Global Bank",
      date: "April 28, 2025",
      summary: "Club66 members will now enjoy exclusive banking benefits through our new partnership with Global Bank.",
      image: "/placeholder.svg",
      category: "Partnerships",
      url: "#",
    },
    {
      title: "Youth Entrepreneurship Program Graduates 100 New Business Owners",
      date: "April 10, 2025",
      summary: "Our flagship entrepreneurship program celebrates the graduation of 100 young Malians who have now launched their own businesses.",
      image: "/placeholder.svg",
      category: "Community Impact",
      url: "#",
    },
    {
      title: "Club66 Wins Social Enterprise of the Year Award",
      date: "March 22, 2025",
      summary: "We are honored to be recognized for our innovative approach to community development and economic empowerment.",
      image: "/placeholder.svg",
      category: "Awards",
      url: "#",
    },
  ];
  
  const pressReleases = [
    {
      title: "Club66 Secures $5M Funding to Expand Across West Africa",
      date: "May 1, 2025",
      url: "#",
    },
    {
      title: "Club66 Launches Mobile App for Enhanced Member Experience",
      date: "April 15, 2025",
      url: "#",
    },
    {
      title: "Club66 and Ministry of Education Announce Scholarship Program",
      date: "March 30, 2025",
      url: "#",
    },
    {
      title: "Annual Report Reveals Club66's Economic Impact on Local Communities",
      date: "February 12, 2025",
      url: "#",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-club66-purple">
          News & Press
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content - News articles */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-6 text-club66-purple">Latest News</h2>
              
              <div className="space-y-8">
                {newsArticles.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-xs bg-club66-purple/10 text-club66-purple px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center ml-3 text-gray-500 text-sm">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.summary}</p>
                      
                      <a 
                        href={article.url} 
                        className="text-club66-purple font-medium hover:underline"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar - Press releases and media contacts */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Press Releases</h2>
                <ul className="space-y-4">
                  {pressReleases.map((release, index) => (
                    <li key={index}>
                      <a href={release.url} className="block hover:bg-gray-50 p-2 rounded">
                        <p className="font-medium text-gray-900">{release.title}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {release.date}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#" className="block text-center mt-4 text-club66-purple font-medium hover:underline">
                  View all press releases
                </a>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Media Contact</h2>
                <p className="text-gray-600 mb-4">
                  For media inquiries, please contact our press office:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Mariam Coulibaly</p>
                  <p>Press Relations Manager</p>
                  <p>
                    <a href="mailto:press@club66global.com" className="text-club66-purple hover:underline">
                      press@club66global.com
                    </a>
                  </p>
                  <p>
                    <a href="tel:+22379000000" className="text-club66-purple hover:underline">
                      +223 79 00 00 00
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
