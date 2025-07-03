
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Crown, Users, Gift, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

const HeroSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Auto-scroll every 5 seconds with smooth infinite loop
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // Reset to first slide for infinite loop
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const slides = [
    {
      id: 1,
      title: 'Join Club66 Global',
      subtitle: 'Premium Membership Platform',
      description: 'Unlock exclusive benefits, discounts, and opportunities through our premium membership experience designed for the African elite.',
      backgroundImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      primaryButton: { text: 'Start Your Journey', link: '/membership-payment' },
      secondaryButton: { text: 'Explore Benefits', link: '/discounts' }
    },
    {
      id: 2,
      title: 'ZENIKA Cards',
      subtitle: 'Premium Membership Cards',
      description: 'Choose from Essential, Premium, or Elite cards. Each tier offers unique benefits and exclusive access to our growing network across Africa.',
      backgroundImage: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      primaryButton: { text: 'Get Your Card', link: '/cards' },
      secondaryButton: { text: 'View Plans', link: '/cards' }
    },
    {
      id: 3,
      title: 'Ô Secours',
      subtitle: 'Emergency Assistance',
      description: 'Get emergency help when you need it most with our token-based rescue system. Available 24/7 across African countries.',
      backgroundImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      primaryButton: { text: 'Get Protected', link: '/services/o-secours' },
      secondaryButton: { text: 'Learn More', link: '/services/o-secours' }
    },
    {
      id: 4,
      title: 'Mobile App',
      subtitle: 'Everything In Your Pocket',
      description: 'Manage your membership, access benefits, and connect with our African community on the go with our premium mobile application.',
      backgroundImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      primaryButton: { text: 'Download App', link: '/app' },
      secondaryButton: { text: 'Learn More', link: '/app' }
    },
    {
      id: 5,
      title: 'Job Center',
      subtitle: 'Career Opportunities',
      description: 'Find your dream job or hire top talent through our comprehensive job portal designed for African professionals.',
      backgroundImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      primaryButton: { text: 'Browse Jobs', link: '/jobs' },
      secondaryButton: { text: 'Post Jobs', link: '/job-dashboard/employer' }
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <Carousel 
        setApi={setApi} 
        className="w-full"
        opts={{
          align: "start",
          loop: true,
          duration: 35,
        }}
      >
        <CarouselContent className="transition-all duration-1000 ease-out">
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
                {/* Background image with better overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[8000ms] ease-out"
                    style={{
                      backgroundImage: `url('${slide.backgroundImage}')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-slate-900/80"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 text-white animate-fade-in">
                      <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20">
                        <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                        <span className="text-sm font-medium">{slide.subtitle}</span>
                      </div>
                      
                       <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {slide.title.includes('Club66') ? (
                          <>
                            Join Club<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300">66</span>
                            <br />Global
                          </>
                        ) : slide.title.includes('ZENIKA') ? (
                          <>
                            ZENIKA<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300"> Cards</span>
                          </>
                        ) : slide.title.includes('Ô Secours') ? (
                          <>
                            Ô<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300"> Secours</span>
                          </>
                        ) : slide.title.includes('Mobile') ? (
                          <>
                            Mobile<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300"> App</span>
                          </>
                        ) : (
                          <>
                            Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-300"> Center</span>
                          </>
                        )}
                       </h1>
                      
                      <p className="text-xl md:text-2xl text-gray-300 max-w-lg leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-xl transform transition-all duration-300 hover:scale-105">
                          <Link to={slide.primaryButton.link}>{slide.primaryButton.text}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                          <Link to={slide.secondaryButton.link}>{slide.secondaryButton.text}</Link>
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6 pt-8">
                        <div className="text-center transform transition-all duration-500 hover:scale-110">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="h-6 w-6 text-green-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">5-20%</p>
                          <p className="text-sm text-gray-300">Member Discounts</p>
                        </div>
                        <div className="text-center transform transition-all duration-500 hover:scale-110">
                          <div className="flex items-center justify-center mb-2">
                            <Gift className="h-6 w-6 text-yellow-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">10%</p>
                          <p className="text-sm text-gray-300">Referral Bonus</p>
                        </div>
                        <div className="text-center transform transition-all duration-500 hover:scale-110">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-blue-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">2M+</p>
                          <p className="text-sm text-gray-300">Members</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative z-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        {/* Elite Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-2xl p-8 transform rotate-2 relative z-10 border border-purple-400/20 transition-all duration-500 hover:rotate-1 hover:scale-105">
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
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl p-8 transform -rotate-3 absolute -top-8 -left-8 z-0 border border-yellow-300/30 transition-all duration-500 hover:-rotate-2">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom Navigation */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                current === index + 1 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroSlider;
