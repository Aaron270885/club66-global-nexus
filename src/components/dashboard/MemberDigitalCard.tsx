
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import QRCodeGenerator from '@/components/utilities/QRCodeGenerator';

interface MemberDigitalCardProps {
  memberName: string;
  memberID: string;
  expiryDate: string;
  membershipTier: 'Essential' | 'Premium' | 'Elite';
  profileImage?: string;
  address?: string;
}

const MemberDigitalCard = ({ 
  memberName, 
  memberID, 
  expiryDate, 
  membershipTier,
  profileImage,
  address
}: MemberDigitalCardProps) => {
  const [showQR, setShowQR] = useState(false);
  
  // Create QR data for the card
  const qrData = JSON.stringify({
    memberID,
    name: memberName,
    tier: membershipTier,
    expiry: expiryDate
  });

  // Get card styling based on membership tier
  const getTierColors = () => {
    switch (membershipTier) {
      case 'Essential':
        return {
          background: 'bg-white',
          statusColor: 'text-gray-800',
          border: 'border-gray-200'
        };
      case 'Premium':
        return {
          background: 'bg-gradient-to-br from-blue-600 to-blue-800',
          statusColor: 'text-white',
          border: 'border-blue-600'
        };
      case 'Elite':
        return {
          background: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
          statusColor: 'text-gray-900',
          border: 'border-yellow-400'
        };
      default:
        return {
          background: 'bg-white',
          statusColor: 'text-gray-800',
          border: 'border-gray-200'
        };
    }
  };

  const colors = getTierColors();

  // Mock function to download card as image
  const handleDownload = () => {
    alert('Card download functionality would be implemented here.');
  };

  // Mock function to share card
  const handleShare = () => {
    alert('Card sharing functionality would be implemented here.');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-gray-900">Your Digital Membership Card</h3>
        <p className="text-sm text-gray-500">Present this at participating merchants for discounts</p>
      </div>
      
      <Card className={`relative rounded-2xl overflow-hidden shadow-2xl ${colors.border} border-2`}>
        {/* Card Header with Zenika and Club66 Logo */}
        <div className={`${colors.background} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className={`text-2xl font-bold ${membershipTier === 'Essential' ? 'text-gray-900' : membershipTier === 'Elite' ? 'text-gray-900' : 'text-white'}`}>
                Zenika
              </h2>
              <div className="bg-club66-purple text-white px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                <span>CLUB</span>
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">6</span>
                </div>
                <span>GLOBAL</span>
              </div>
            </div>
          </div>

          {/* Member Info Section */}
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {profileImage ? (
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/30">
                  <img 
                    src={profileImage} 
                    alt={memberName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-white/30">
                  <span className="text-2xl font-bold text-gray-600">
                    {memberName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Member Details */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold ${colors.statusColor} mb-1`}>
                {memberName}
              </h3>
              <p className={`text-sm font-medium ${colors.statusColor} mb-2`}>
                Statut: {membershipTier}
              </p>
              {address && (
                <p className={`text-xs ${colors.statusColor} opacity-80 mb-2`}>
                  {address}
                </p>
              )}
              <div className="space-y-1">
                <p className={`text-xs ${colors.statusColor} opacity-80`}>
                  ID {memberID}
                </p>
                <p className={`text-xs ${colors.statusColor} opacity-80`}>
                  Valide jusqu'au: {expiryDate}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-white p-1 rounded">
                <QRCodeGenerator
                  data={qrData}
                  size={56}
                  className="border-0 shadow-none"
                  showDownload={false}
                  showShare={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Changing Lives Footer */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-3 px-4">
          <h4 className="text-center font-italic text-lg">
            Changing Lives
          </h4>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
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
