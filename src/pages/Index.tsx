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
        .eq('page_type', 'landing')
        .single();

      if (error) {
        console.error('Error fetching home content:', error);
        // If no record found, create default content
        if (error.code === 'PGRST116') {
          setHomeContent(getDefaultHomeContent());
          setLoading(false);
          return;
        }
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

  const getDefaultHomeContent = (): HomePageContent => {
    return {
      id: 'default',
      title: 'Club66 Global - Your Gateway to Exclusive Benefits',
      slug: 'home-page',
      content: `
        <div class="hero-section">
          <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
            Welcome to Club66 Global
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-200">
            Join thousands of members enjoying exclusive discounts, premium services, and global benefits
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400">10K+</div>
              <div class="text-sm text-gray-300">Active Members</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400">500+</div>
              <div class="text-sm text-gray-300">Partner Merchants</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400">50+</div>
              <div class="text-sm text-gray-300">Countries</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-yellow-400">24/7</div>
              <div class="text-sm text-gray-300">Support</div>
            </div>
          </div>
        </div>
        <div class="about-section">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800">About Club66 Global</h2>
          <p class="text-lg mb-6">
            Club66 Global is a revolutionary membership platform that connects you to a world of exclusive benefits, 
            discounts, and premium services. Our mission is to enhance your lifestyle while providing exceptional 
            value through our extensive network of partners and services.
          </p>
          <p class="text-lg">
            From shopping discounts to emergency assistance, from job opportunities to educational scholarships, 
            Club66 Global is your gateway to a better life.
          </p>
        </div>
        <div class="features-section">
          <h2 class="text-3xl md:text-4xl font-bold mb-12 text-gray-800">Why Choose Club66 Global?</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 bg-white rounded-lg shadow-lg">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">💳</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Exclusive Discounts</h3>
              <p class="text-gray-600">Access up to 50% discounts at thousands of partner merchants worldwide</p>
            </div>
            <div class="text-center p-6 bg-white rounded-lg shadow-lg">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🌍</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Global Network</h3>
              <p class="text-gray-600">Connect with members and services across 50+ countries</p>
            </div>
            <div class="text-center p-6 bg-white rounded-lg shadow-lg">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🏪</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Partner Merchants</h3>
              <p class="text-gray-600">Shop at 500+ verified partner stores with guaranteed savings</p>
            </div>
            <div class="text-center p-6 bg-white rounded-lg shadow-lg">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">📊</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Premium Benefits</h3>
              <p class="text-gray-600">Enjoy exclusive perks, priority support, and special offers</p>
            </div>
          </div>
        </div>
        <div class="cta-section">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Lifestyle?</h2>
          <p class="text-xl mb-8 opacity-90">
            Join Club66 Global today and unlock a world of exclusive benefits, discounts, and opportunities.
          </p>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div class="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div class="text-2xl font-bold text-yellow-400">Basic</div>
                <div class="text-3xl font-bold">$29/year</div>
                <div class="text-sm opacity-80">Essential benefits</div>
              </div>
              <div class="border-2 border-yellow-400 rounded-lg p-4 relative">
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <div class="text-2xl font-bold text-yellow-400">Premium</div>
                <div class="text-3xl font-bold">$99/year</div>
                <div class="text-sm opacity-80">All benefits + extras</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-yellow-400">VIP</div>
                <div class="text-3xl font-bold">$199/year</div>
                <div class="text-sm opacity-80">Ultimate experience</div>
              </div>
            </div>
          </div>
        </div>
      `,
      meta_description: 'Join Club66 Global for exclusive discounts, premium services, and global benefits. Transform your lifestyle with our membership platform.',
      meta_keywords: 'Club66 Global, membership, discounts, benefits, premium services',
      status: 'published',
      page_type: 'landing',
      is_featured: true,
      featured_image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
    };
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