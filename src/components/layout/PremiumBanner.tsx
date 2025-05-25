
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PremiumBannerProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  showBackButton?: boolean;
  backUrl?: string;
  children?: React.ReactNode;
}

const PremiumBanner = ({ 
  title, 
  description, 
  backgroundImage,
  showBackButton = false,
  backUrl = "/",
  children 
}: PremiumBannerProps) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 py-16 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="10" cy="10" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {showBackButton && (
          <Link to={backUrl} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        )}
        
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-xl"></div>
    </div>
  );
};

export default PremiumBanner;
