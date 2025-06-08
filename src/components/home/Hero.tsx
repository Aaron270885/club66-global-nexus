
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Crown, Users, Gift, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background image with transparency */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-slate-900/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Crown className="h-5 w-5 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Premium Membership Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Join Club<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300">66</span>
              <br />Global
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">
              Unlock exclusive benefits, discounts, and opportunities through our 
              premium membership experience designed for the elite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-xl">
                <Link to="/membership-payment">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link to="/discounts">Explore Benefits</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-white">5-20%</p>
                <p className="text-sm text-gray-300">Member Discounts</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Gift className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-3xl font-bold text-white">10%</p>
                <p className="text-sm text-gray-300">Referral Bonus</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white">200+</p>
                <p className="text-sm text-gray-300">Partner Businesses</p>
              </div>
            </div>
          </div>

          {/* Right Content - Membership Cards */}
          <div className="relative">
            <div className="relative z-20">
              {/* Elite Card */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-2xl p-8 transform rotate-2 relative z-10 border border-purple-400/20">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-white">
                    <p className="text-sm uppercase tracking-wider opacity-90">Elite Member</p>
                    <p className="text-2xl font-bold">Club66 Global</p>
                  </div>
                  <div className="bg-white/20 text-white rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm">
                    <span className="font-bold text-xl">66</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm">Member Name</p>
                    <p className="font-semibold text-white text-lg">Ahmed Traore</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs">Member ID</p>
                      <p className="text-sm font-medium text-white">C66-ML-21058</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs">Valid until</p>
                      <p className="text-sm font-medium text-white">01/28</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Card */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl p-8 transform -rotate-3 absolute -top-8 -left-8 z-0 border border-yellow-300/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-gray-900">
                    <p className="text-sm uppercase tracking-wider opacity-70">Premium Member</p>
                    <p className="text-2xl font-bold">Club66 Global</p>
                  </div>
                  <div className="bg-white/30 text-gray-900 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="font-bold text-xl">66</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 text-sm">Member Name</p>
                    <p className="font-semibold text-gray-900 text-lg">Fatima Diallo</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-700 text-xs">Member ID</p>
                      <p className="text-sm font-medium text-gray-900">C66-ML-18593</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-xs">Valid until</p>
                      <p className="text-sm font-medium text-gray-900">10/27</p>
                    </div>
                  </div>
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
