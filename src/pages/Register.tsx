
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
import { Layers, ShieldCheck, CreditCard } from 'lucide-react';

const Register = () => {
  const benefits = [
    {
      icon: CreditCard,
      title: "Digital Membership Card",
      description: "Instantly receive your digital membership card with QR code for discounts"
    },
    {
      icon: ShieldCheck,
      title: "Exclusive Discounts",
      description: "Get 5-20% discounts at Club66 businesses and partner merchants"
    },
    {
      icon: Layers,
      title: "Social Impact",
      description: "Your membership helps fund community projects and scholarships"
    }
  ];

  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-club66-purple mb-2">Join Club66 Today</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Become a member to unlock exclusive discounts, access special services, 
              and be part of a community changing lives across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
              <RegisterForm />
            </div>
            
            <div className="col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Membership Benefits</h2>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 bg-purple-100 p-2 rounded-full">
                        <benefit.icon className="h-6 w-6 text-club66-purple" />
                      </div>
                      <div>
                        <h3 className="font-medium">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-2">Why join Club66?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Access to exclusive discounts across Mali</li>
                    <li>• Financial services including payday loans</li>
                    <li>• Community support and networking</li>
                    <li>• Contribute to social impact initiatives</li>
                    <li>• Opportunity to become a referral agent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
