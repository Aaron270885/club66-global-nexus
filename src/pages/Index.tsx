import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Users, Globe, Store, Percent } from 'lucide-react';

interface HomePageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  page_type: string;
  is_featured?: boolean;
  featured_image_url?: string;
}

const Index = () => {
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', 'home-page')
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching home content:', error);
        setError('Failed to load page content');
        return;
      }

      if (data) {
        setHomeContent(data);
        
        // Update page meta tags
        if (data.meta_description) {
          document.querySelector('meta[name="description"]')?.setAttribute('content', data.meta_description);
        }
        if (data.meta_keywords) {
          document.querySelector('meta[name="keywords"]')?.setAttribute('content', data.meta_keywords);
        }
        document.title = data.title;
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
      setError('Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const parseContentSections = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    const heroSection = doc.querySelector('.hero-section');
    const aboutSection = doc.querySelector('.about-section');
    const featuresSection = doc.querySelector('.features-section');
    const ctaSection = doc.querySelector('.cta-section');
    
    return {
      hero: heroSection?.innerHTML || '',
      about: aboutSection?.innerHTML || '',
      features: featuresSection?.innerHTML || '',
      cta: ctaSection?.innerHTML || ''
    };
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Club66 Global...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !homeContent) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Unavailable</h2>
              <p className="text-gray-600 mb-6">
                {error || 'Unable to load page content. Please try again later.'}
              </p>
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const sections = parseContentSections(homeContent.content);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
          <img 
            src={homeContent.featured_image_url || "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
            alt="Club66 Global"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div 
            className="prose prose-lg prose-invert max-w-none text-center"
            dangerouslySetInnerHTML={{ __html: sections.hero }}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link to="/register">Join Club66 Global Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/cards">Explore Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none text-gray-700 text-center"
                  dangerouslySetInnerHTML={{ __html: sections.about }}
                />
                <div className="text-center mt-8">
                  <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-purple-600 hover:from-yellow-600 hover:to-purple-700 text-white">
                    <Link to="/about">Know More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="prose prose-lg max-w-none text-center mb-12"
              dangerouslySetInnerHTML={{ __html: sections.features }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-invert max-w-none text-center"
              dangerouslySetInnerHTML={{ __html: sections.cta }}
            />
            
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="font-medium mb-4">Available in</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-md">
                  <span className="font-medium text-lg">Mali</span>
                  <Badge className="ml-2 bg-green-500">Active</Badge>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-md opacity-60">
                  <span className="font-medium text-lg">Nigeria</span>
                  <Badge className="ml-2 bg-gray-500">Coming Soon</Badge>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-md opacity-60">
                  <span className="font-medium text-lg">Ghana</span>
                  <Badge className="ml-2 bg-gray-500">Coming Soon</Badge>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-md opacity-60">
                  <span className="font-medium text-lg">Senegal</span>
                  <Badge className="ml-2 bg-gray-500">Coming Soon</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;