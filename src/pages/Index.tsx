
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import MembershipPlans from '@/components/home/MembershipPlans';
import Benefits from '@/components/home/Benefits';
import DigitalCard from '@/components/home/DigitalCard';
import AffiliateProgram from '@/components/home/AffiliateProgram';
import SocialBenefits from '@/components/home/SocialBenefits';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <MembershipPlans />
      <DigitalCard />
      <AffiliateProgram />
      <SocialBenefits />
      <CTA />
    </Layout>
  );
};

export default Index;
