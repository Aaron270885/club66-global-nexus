
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MemberDigitalCardProps {
  memberName: string;
  memberID: string;
  expiryDate: string;
  membershipTier: 'Essential' | 'Premium' | 'Elite';
  profileImage?: string;
}

const MemberDigitalCard = ({ 
  memberName, 
  memberID, 
  expiryDate, 
  membershipTier,
  profileImage
}: MemberDigitalCardProps) => {
  const [showQR, setShowQR] = useState(false);
  
  // Get card styling based on membership tier
  const getCardStyle = () => {
    switch (membershipTier) {
      case 'Essential':
        return 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400';
      case 'Premium':
        return 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700';
      case 'Elite':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';
      default:
        return 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700';
    }
  };

  // Mock function to download card as image
  const handleDownload = () => {
    // In a real implementation, this would capture the card as an image and download it
    alert('Card download functionality would be implemented here.');
  };

  // Mock function to share card
  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    alert('Card sharing functionality would be implemented here.');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-gray-900">Your Digital Membership Card</h3>
        <p className="text-sm text-gray-500">Present this at participating merchants for discounts</p>
      </div>
      
      <div className="mx-auto">
        <div className={`flip-card-inner ${showQR ? 'is-flipped' : ''}`}>
          {/* Front of card */}
          <div className={`relative rounded-2xl overflow-hidden shadow-lg min-h-[280px] ${getCardStyle()}`}>
            <div className="p-6 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-medium ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-800' : 'text-white/80'}`}>
                    {membershipTier} Member
                  </p>
                  <p className={`text-lg font-bold ${membershipTier === 'Essential' ? 'text-gray-900' : membershipTier === 'Elite' ? 'text-gray-900' : 'text-white'}`}>Club66 Global</p>
                </div>
                <div className={`h-12 w-12 rounded-full ${membershipTier === 'Essential' ? 'bg-white/20' : membershipTier === 'Elite' ? 'bg-white/30' : 'bg-white/20'} flex items-center justify-center`}>
                  <span className={`font-bold text-lg ${membershipTier === 'Essential' ? 'text-gray-800' : membershipTier === 'Elite' ? 'text-gray-800' : 'text-white'}`}>66</span>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="flex items-center space-x-3">
                {profileImage ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img 
                      src={profileImage} 
                      alt={memberName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-full ${membershipTier === 'Essential' ? 'bg-white/20' : membershipTier === 'Elite' ? 'bg-white/30' : 'bg-white/20'} flex items-center justify-center`}>
                    <span className={`font-bold text-lg ${membershipTier === 'Essential' ? 'text-gray-800' : membershipTier === 'Elite' ? 'text-gray-800' : 'text-white'}`}>
                      {memberName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                
                <div className="flex-1">
                  <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Member Name
                  </div>
                  <div className={`font-semibold ${membershipTier === 'Essential' ? 'text-gray-900' : membershipTier === 'Elite' ? 'text-gray-900' : 'text-white'}`}>{memberName}</div>
                </div>
              </div>
              
              {/* Bottom Info */}
              <div className="flex justify-between items-end">
                <div>
                  <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Member ID
                  </div>
                  <div className={`text-sm font-medium ${membershipTier === 'Essential' ? 'text-gray-900' : membershipTier === 'Elite' ? 'text-gray-900' : 'text-white'}`}>{memberID}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Expires
                  </div>
                  <div className={`text-sm font-medium ${membershipTier === 'Essential' ? 'text-gray-900' : membershipTier === 'Elite' ? 'text-gray-900' : 'text-white'}`}>{expiryDate}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back of card (QR Code) */}
          <div className="flip-card-back bg-white rounded-2xl overflow-hidden shadow-lg min-h-[280px]">
            <div className="p-6 h-full flex flex-col">
              <h3 className="text-center font-bold text-gray-900 mb-4">
                {membershipTier} Membership
              </h3>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-gray-100 w-32 h-32 flex items-center justify-center rounded-lg">
                  {/* Placeholder for QR code */}
                  <div className="w-24 h-24 border-2 border-gray-400 grid grid-cols-4 grid-rows-4 gap-px">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}`}></div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Present this QR code to receive your member discount
                </p>
              </div>
              
              <div className="mt-4 text-center">
                <Button
                  onClick={() => setShowQR(false)}
                  variant="outline"
                  className="w-full"
                >
                  Show Front
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-4 text-center">
        <Button
          onClick={() => setShowQR(!showQR)}
          className={`w-full ${membershipTier === 'Essential' ? 'bg-gray-600 hover:bg-gray-700' : membershipTier === 'Premium' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white`}
        >
          <QrCode className="h-4 w-4 mr-2" />
          {showQR ? 'Show Card' : 'Show QR Code'}
        </Button>
      </div>
      
      <div className="flex space-x-2 mt-3">
        <Button 
          variant="outline" 
          className="flex-1 text-sm"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 text-sm"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default MemberDigitalCard;
