
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Join Club<span className="text-club66-purple">66</span> Global for Exclusive Benefits
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Unlock a world of discounts, opportunities, and community connections through our 
              tiered membership plans. Experience the Club66 difference today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-club66-purple hover:bg-club66-darkpurple">
                <Link to="/register">Join Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-club66-purple text-club66-purple hover:bg-club66-purple/10">
                <Link to="/plans">View Membership Plans</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-club66-purple">5-20%</p>
                <p className="text-sm text-gray-600">Member Discounts</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-club66-purple">10%</p>
                <p className="text-sm text-gray-600">Referral Bonus</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-club66-purple">200+</p>
                <p className="text-sm text-gray-600">Partner Businesses</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl p-6 transform rotate-3 relative z-10">
              <div className="card-gradient rounded-lg p-4 flex items-center justify-between">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-wider">Elite Member</p>
                  <p className="text-lg font-bold">Club66 Global</p>
                </div>
                <div className="bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="font-bold">66</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold">Ahmed Traore</p>
                <p className="text-gray-500 text-xs">Valid until 01/28</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">Membership ID</div>
                  <div className="text-sm font-medium">C66-ML-21058</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 transform -rotate-2 absolute top-12 -left-12 z-0">
              <div className="gold-gradient rounded-lg p-4 flex items-center justify-between">
                <div className="text-gray-900">
                  <p className="text-xs uppercase tracking-wider">Premium Member</p>
                  <p className="text-lg font-bold">Club66 Global</p>
                </div>
                <div className="bg-white/70 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="font-bold">66</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold">Fatima Diallo</p>
                <p className="text-gray-500 text-xs">Valid until 10/27</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">Membership ID</div>
                  <div className="text-sm font-medium">C66-ML-18593</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
