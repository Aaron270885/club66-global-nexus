
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
        return 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 border border-slate-300';
      case 'Premium':
        return 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white';
      case 'Elite':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900';
      default:
        return 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white';
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
    <Card className="w-full max-w-md mx-auto p-4">
      <div className="text-center mb-4">
        <h3 className="font-bold text-xl">Your Digital Membership Card</h3>
        <p className="text-sm text-gray-500">Present this at participating merchants for discounts</p>
      </div>
      
      <div className="mx-auto flip-card">
        <div className={`flip-card-inner ${showQR ? 'is-flipped' : ''}`}>
          {/* Front of card */}
          <div className={`flip-card-front rounded-xl overflow-hidden shadow-lg ${getCardStyle()}`}>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-xs font-medium ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    {membershipTier} Member
                  </p>
                  <p className="text-lg font-bold">Club66 Global</p>
                </div>
                <div className={`h-14 w-14 rounded-full ${membershipTier === 'Essential' ? 'bg-slate-300' : membershipTier === 'Elite' ? 'bg-yellow-200' : 'bg-blue-300'} flex items-center justify-center`}>
                  <span className={`font-bold text-xl ${membershipTier === 'Elite' ? 'text-gray-900' : 'text-gray-700'}`}>66</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                {profileImage ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white">
                    <img 
                      src={profileImage} 
                      alt={memberName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                    <span className="text-gray-500 font-bold text-xl">
                      {memberName.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                 <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Member Name
                  </div>
                  <div className="font-medium">{memberName}</div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Member ID
                  </div>
                  <div className="text-sm font-medium">{memberID}</div>
                </div>
                <div>
                  <div className={`text-xs ${membershipTier === 'Essential' ? 'text-gray-600' : membershipTier === 'Elite' ? 'text-gray-700' : 'text-white/80'}`}>
                    Expires
                  </div>
                  <div className="text-sm font-medium">{expiryDate}</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  onClick={() => setShowQR(true)}
                  variant={membershipTier === 'Essential' ? 'default' : 'secondary'}
                  className="w-full"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Show QR Code
                </Button>
              </div>
            </div>
          </div>
          
          {/* Back of card (QR Code) */}
          <div className="flip-card-back bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 h-full flex flex-col">
              <h3 className={`text-center font-bold ${membershipTier === 'Essential' ? 'text-gray-900' : 'text-purple-600'} mb-4`}>
                {membershipTier} Membership
              </h3>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-gray-100 w-48 h-48 flex items-center justify-center">
                  {/* Placeholder for QR code */}
                  <div className="w-36 h-36 border-2 border-gray-400 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border border-gray-400"></div>
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
      
      <div className="flex space-x-2 mt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </Card>
  );
};

export default MemberDigitalCard;
