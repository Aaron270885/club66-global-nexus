
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import AboutSection from '@/components/home/AboutSection';
import MembershipPlans from '@/components/home/MembershipPlans';
import Benefits from '@/components/home/Benefits';
import DigitalCard from '@/components/home/DigitalCard';
import AffiliateProgram from '@/components/home/AffiliateProgram';
import SocialBenefits from '@/components/home/SocialBenefits';
import CTA from '@/components/home/CTA';
import { supabase } from '@/integrations/supabase/client';

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

const Index = () => {
  const [cmsContent, setCmsContent] = useState<{ [key: string]: CMSPage }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCMSContent();
  }, []);

  const fetchCMSContent = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('status', 'published')
        .eq('page_type', 'section')
        .in('slug', [
          'home-hero',
          'home-about',
          'home-benefits',
          'home-membership-plans',
          'home-digital-card',
          'home-affiliate',
          'home-social-benefits',
          'home-cta'
        ]);

      if (error) {
        console.error('Error fetching CMS content:', error);
        return;
      }

      if (data) {
        const contentMap = data.reduce((acc, page) => {
          acc[page.slug] = page;
          return acc;
        }, {} as { [key: string]: CMSPage });
        setCmsContent(contentMap);
      }
    } catch (error) {
      console.error('Error fetching CMS content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSlider cmsContent={cmsContent['home-hero']} />
      <AboutSection cmsContent={cmsContent['home-about']} />
      <Benefits cmsContent={cmsContent['home-benefits']} />
      <MembershipPlans cmsContent={cmsContent['home-membership-plans']} />
      <DigitalCard cmsContent={cmsContent['home-digital-card']} />
      <AffiliateProgram cmsContent={cmsContent['home-affiliate']} />
      <SocialBenefits cmsContent={cmsContent['home-social-benefits']} />
      <CTA cmsContent={cmsContent['home-cta']} />
    </Layout>
  );
};

export default Index;
