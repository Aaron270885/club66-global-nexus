import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import Hero from '@/components/home/Hero';

interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  page_type: string;
  is_featured?: boolean;
}

interface DynamicSection {
  title?: string;
  content?: any;
  data?: any;
}

const Index = () => {
  const [sections, setSections] = useState<{ [key: string]: DynamicSection }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynamicSections();
  }, []);

  const fetchDynamicSections = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('status', 'published')
        .in('slug', [
          'home-hero-slider',
          'home-about-section', 
          'home-benefits-section',
          'home-membership-plans',
          'home-digital-card',
          'home-social-benefits',
          'home-affiliate-program',
          'home-cta-section'
        ]);

      if (error) {
        console.error('Error fetching dynamic sections:', error);
      } else if (data) {
        const sectionsMap = data.reduce((acc, page) => {
          let parsedContent;
          try {
            parsedContent = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
          } catch {
            parsedContent = { html: page.content };
          }
          
          acc[page.slug] = {
            title: page.title,
            content: page.content,
            data: parsedContent
          };
          return acc;
        }, {} as { [key: string]: DynamicSection });
        setSections(sectionsMap);
      }
    } catch (error) {
      console.error('Error fetching dynamic sections:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Hero Slider Component
  const DynamicHeroSlider = () => {
    const heroData = sections['home-hero-slider']?.data;
    if (!heroData?.slides) return <Hero />;

    return (
      <section className="relative overflow-hidden">
        <div className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 opacity-60">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${heroData.slides[0]?.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/30 to-purple-800/40" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Club<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300">66</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed mb-8 mx-auto">
                {heroData.slides[0]?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={heroData.slides[0]?.primaryButton?.link || '/register'}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  {heroData.slides[0]?.primaryButton?.text || 'Join Now'}
                </a>
                <a 
                  href={heroData.slides[0]?.secondaryButton?.link || '/cards'}
                  className="border-white/30 text-white hover:bg-white/10 border px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  {heroData.slides[0]?.secondaryButton?.text || 'Learn More'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Dynamic About Section Component
  const DynamicAboutSection = () => {
    const aboutData = sections['home-about-section'];
    
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-lg p-8 md:p-12">
              {aboutData?.content ? (
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: aboutData.content }}
                />
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    About <span className="text-club66-gold">Club</span>
                    <span className="text-club66-purple">66</span> Global
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 text-justify">
                    Club 66 Global is a company that offers a diverse range of services and platforms through our unique all-in-one astonishing product called ZENIKA.
                  </p>
                </div>
              )}
              <div className="text-center mt-8">
                <a 
                  href="/about"
                  className="bg-gradient-to-r from-club66-gold to-club66-purple hover:from-club66-gold/90 hover:to-club66-purple/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                >
                  Know More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Dynamic Benefits Section Component
  const DynamicBenefitsSection = () => {
    const benefitsData = sections['home-benefits-section']?.data;
    
    const defaultBenefits = [
      { icon: 'Percent', title: 'Exclusive Discounts', description: 'Enjoy 5-20% discounts at thousands of partner businesses across West Africa.' },
      { icon: 'CreditCard', title: 'Digital Value & Privilege Card', description: 'Access your client benefits with a secure Zenika Card featuring QR verification.' },
      { icon: 'Users', title: 'Professional Network', description: 'Connect with millions of clients and expand your professional network across West Africa.' }
    ];

    const benefits = benefitsData?.benefits || defaultBenefits;
    
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">{benefitsData?.title || 'Client Benefits'}</h2>
            <p className="text-gray-600">
              {benefitsData?.description || 'Discover the advantages of being a Club66 Global client and how our services can enhance your lifestyle, career, and financial wellbeing across West Africa.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit: any, index: number) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-club66-purple rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💼</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Dynamic Membership Plans Component
  const DynamicMembershipPlans = () => {
    const plansData = sections['home-membership-plans']?.data;
    
    return (
      <section className="py-16 bg-white" id="plans">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">{plansData?.title || 'Find the Perfect Client Plan'}</h2>
            <p className="text-gray-600">
              {plansData?.description || 'Choose a plan that fits your lifestyle and goals. All plans include access to our exclusive network of partner businesses and special client-only benefits.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(plansData?.plans || []).map((plan: any, index: number) => (
              <div 
                key={index} 
                className={`border ${plan.popular ? 'shadow-lg ring-2 ring-club66-gold' : 'shadow'} relative animate-slide-up rounded-lg overflow-hidden`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 py-1 text-center bg-club66-gold text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`${plan.color} rounded-t-lg ${plan.textColor} p-4`}>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className={plan.name === 'Elite' ? 'text-gray-100' : 'text-gray-700'}>
                    {plan.discount} discount on all Club66 services
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-6 text-center">
                    <p className="text-sm text-gray-500">Annual Fee</p>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold">CFA {plan.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">+ CFA {plan.monthly} monthly</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={`/register?plan=${plan.id}`}
                    className={`w-full block text-center py-2 px-4 rounded transition-colors ${
                      plan.buttonVariant === 'default' ? 'bg-club66-purple hover:bg-club66-darkpurple text-white' : 
                      plan.buttonVariant === 'secondary' ? 'bg-club66-gold hover:bg-club66-gold/90 text-gray-900' : 
                      'border border-gray-300 text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Select {plan.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Dynamic CTA Section Component
  const DynamicCTASection = () => {
    const ctaData = sections['home-cta-section']?.data;
    
    return (
      <section className="py-16 bg-gradient-to-br from-club66-purple to-club66-darkpurple text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaData?.title || 'Ready to Join Club66?'}</h2>
            <p className="text-lg mb-8 opacity-90">
              {ctaData?.description || 'Become a member today and unlock a world of exclusive benefits, discounts, and opportunities.'}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              {(ctaData?.buttons || []).map((button: any, index: number) => (
                <a 
                  key={index}
                  href={button.link}
                  className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${button.className}`}
                >
                  {button.text}
                </a>
              ))}
            </div>
            
            {ctaData?.availability && (
              <div className="pt-8 border-t border-white/20">
                <p className="font-medium mb-4">{ctaData.availability.title}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {ctaData.availability.countries?.map((country: any, index: number) => (
                    <div key={index} className="bg-white/10 px-4 py-2 rounded-md">
                      <span className="font-medium text-lg">{country.name}</span>
                      <span className={`text-xs ml-2 text-white px-2 py-0.5 rounded-full ${country.statusColor}`}>
                        {country.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
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

  return (
    <Layout>
      {/* Dynamic Hero Slider Section */}
      <DynamicHeroSlider />
      
      {/* Dynamic About Section */}
      <DynamicAboutSection />
      
      {/* Dynamic Benefits Section */}
      <DynamicBenefitsSection />
      
      {/* Dynamic Membership Plans Section */}
      <DynamicMembershipPlans />
      
      {/* Dynamic Call to Action Section */}
      <DynamicCTASection />
    </Layout>
  );
};

export default Index;