
import React from 'react';
import Layout from '@/components/layout/Layout';
import MemberDigitalCard from '@/components/dashboard/MemberDigitalCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MembershipStatus from '@/components/dashboard/MembershipStatus';
import QuickLinks from '@/components/dashboard/QuickLinks';
import PaymentHistory from '@/components/dashboard/PaymentHistory';
import DiscountUsageComponent from '@/components/dashboard/DiscountUsage';
import CompetitionParticipation from '@/components/dashboard/CompetitionParticipation';
import ProjectsAndScholarships from '@/components/dashboard/ProjectsAndScholarships';
import JobCenter from '@/components/dashboard/JobCenter';

const mockMember = {
  name: 'John Doe',
  id: 'C66-123456',
  expiryDate: '31 May 2026',
  membershipTier: 'Premium' as 'Essential' | 'Premium' | 'Elite',
  profileImage: 'https://placehold.co/200x200/e9d5ff/7c3aed?text=JD',
  nextPayment: '23 Jun 2025',
  memberSince: '23 May 2025'
};

// Mock payment history - Fixed status to use correct union type values
const mockPaymentHistory = [
  { id: 'INV-001', date: '23 May 2025', amount: 'CFA 12,000', status: 'Paid' as 'Paid', description: 'Registration + Premium (May 2025)' },
  { id: 'INV-002', date: '23 Jun 2025', amount: 'CFA 2,000', status: 'Upcoming' as 'Upcoming', description: 'Premium Monthly Fee (Jun 2025)' },
];

// Mock discount usage
const mockDiscountUsage = [
  { id: 'DCT-001', date: '25 May 2025', merchant: 'Mali Shopping Center', discount: '10%', saved: 'CFA 3,500' },
  { id: 'DCT-002', date: '27 May 2025', merchant: 'Café Touareg', discount: '10%', saved: 'CFA 800' },
];

// Mock competitions
const mockCompetitions = [
  { id: 'CMP-001', name: 'Young Entrepreneur Award', status: 'Voted', date: '28 May 2025' },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-club66-purple">Member Dashboard</h1>
          <p className="text-gray-600">Welcome back, {mockMember.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Member Card & Quick Stats */}
          <div className="col-span-1">
            <div className="mb-6">
              <MemberDigitalCard
                memberName={mockMember.name}
                memberID={mockMember.id}
                expiryDate={mockMember.expiryDate}
                membershipTier={mockMember.membershipTier}
                profileImage={mockMember.profileImage}
              />
            </div>
            
            <MembershipStatus
              membershipTier={mockMember.membershipTier}
              memberSince={mockMember.memberSince}
              expiryDate={mockMember.expiryDate}
              nextPayment={mockMember.nextPayment}
            />
            
            <QuickLinks />
          </div>
          
          {/* Right Column - Activity Tabs */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="payments" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="discounts">Discounts</TabsTrigger>
                <TabsTrigger value="competitions">Competitions</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="payments" className="space-y-4">
                <PaymentHistory 
                  payments={mockPaymentHistory} 
                  nextPaymentDate={mockMember.nextPayment}
                  nextPaymentAmount="CFA 2,000"
                />
              </TabsContent>
              
              <TabsContent value="discounts" className="space-y-4">
                <DiscountUsageComponent discountUsage={mockDiscountUsage} />
              </TabsContent>
              
              <TabsContent value="competitions">
                <CompetitionParticipation competitions={mockCompetitions} />
              </TabsContent>
              
              <TabsContent value="projects">
                <ProjectsAndScholarships />
              </TabsContent>
              
              <TabsContent value="jobs">
                <JobCenter />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
