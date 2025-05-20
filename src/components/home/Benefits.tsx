
import { CreditCard, Gift, Users, Award, Percent, Clock } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Percent className="h-10 w-10 text-club66-purple" />,
      title: 'Exclusive Discounts',
      description: 'Enjoy 5-20% discounts at all Club66 Global owned businesses and partner merchants.'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-club66-purple" />,
      title: 'Digital Membership Card',
      description: 'Access your membership benefits with a secure digital card featuring QR verification.'
    },
    {
      icon: <Users className="h-10 w-10 text-club66-purple" />,
      title: 'Affiliate Program',
      description: 'Earn 10% commission on membership fees paid by members you refer to Club66 Global.'
    },
    {
      icon: <Gift className="h-10 w-10 text-club66-purple" />,
      title: 'Social Benefits',
      description: 'Choose from benefits like startup capital, payday loans, land plots, and more.'
    },
    {
      icon: <Award className="h-10 w-10 text-club66-purple" />,
      title: 'Job Opportunities',
      description: 'Get priority access to job opportunities through our dedicated job center portal.'
    },
    {
      icon: <Clock className="h-10 w-10 text-club66-purple" />,
      title: 'Flexible Payment Options',
      description: 'Pay via mobile money, bank transfers, or credit cards with instant confirmation.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Membership Benefits</h2>
          <p className="text-gray-600">
            Discover the advantages of being a Club66 Global member and how our services
            can enhance your lifestyle and financial wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
