
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Club66 Global Expands to Three New Countries",
      excerpt: "We're excited to announce our expansion into Ghana, Nigeria, and Benin, bringing our membership benefits to even more people across West Africa.",
      category: "Expansion",
      author: "Club66 Team",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      id: 2,
      title: "New Partnership with West African Development Bank",
      excerpt: "Our strategic partnership will enable us to offer micro-lending services and financial advisory to small businesses.",
      category: "Partnership",
      author: "Business Development",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Digital Literacy Program Launches in Rural Mali",
      excerpt: "Our new initiative aims to bridge the digital divide by teaching essential digital skills to rural communities.",
      category: "Community",
      author: "Project Team",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false
    },
    {
      id: 4,
      title: "Club66 Mobile App Now Available",
      excerpt: "Download our new mobile app for easy access to member benefits, digital card, and exclusive offers.",
      category: "Technology",
      author: "Tech Team",
      date: "2023-12-20",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false
    }
  ];

  const categories = ["All", "Expansion", "Partnership", "Community", "Technology"];

  return (
    <Layout>
      <PremiumBanner
        title="News & Updates"
        description="Stay informed about the latest developments, partnerships, and initiatives from Club66 Global."
        backgroundImage="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        showBackButton
        backUrl="/about"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={category === "All" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Featured Article */}
            {newsArticles.filter(article => article.featured).map((article) => (
              <Card key={article.id} className="mb-12 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className="bg-red-500">Featured</Badge>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-4">{article.title}</CardTitle>
                    <CardDescription className="text-base mb-6">
                      {article.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Read More <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.filter(article => !article.featured).map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-48">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-16">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
                </p>
                <div className="flex max-w-md mx-auto space-x-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
