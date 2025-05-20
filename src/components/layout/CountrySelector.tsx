
import { useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Country {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

interface CountrySelectorProps {
  onClose?: () => void; // Make onClose optional
}

const CountrySelector = ({ onClose }: CountrySelectorProps) => {
  const countries: Country[] = [
    { id: '1', name: 'Mali', code: 'ML', active: true },
    { id: '2', name: 'Nigeria', code: 'NG', active: false },
    { id: '3', name: 'Ghana', code: 'GH', active: false },
    { id: '4', name: 'Senegal', code: 'SN', active: false },
    { id: '5', name: 'South Africa', code: 'ZA', active: false },
    { id: '6', name: 'Kenya', code: 'KE', active: false },
    { id: '7', name: 'Ivory Coast', code: 'CI', active: false },
    { id: '8', name: 'Egypt', code: 'EG', active: false },
  ];

  const [selectedCountry, setSelectedCountry] = useState<string>('Mali');
  const [open, setOpen] = useState(false);

  const handleSelect = (country: Country) => {
    if (!country.active) {
      alert("This country is not yet available. Currently, only Mali is active.");
      return;
    }
    
    setSelectedCountry(country.name);
    setOpen(false);
    if (onClose) onClose(); // Call onClose if provided
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{selectedCountry}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="max-h-80 overflow-y-auto">
          <div className="p-2">
            <h3 className="font-medium text-sm text-gray-700 mb-2">Select Country</h3>
            <div className="space-y-1">
              {countries.map((country) => (
                <div
                  key={country.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    country.active ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                  } ${selectedCountry === country.name ? 'bg-club66-purple/10' : ''}`}
                  onClick={() => handleSelect(country)}
                >
                  <div className="flex-1">
                    <span className="text-sm">
                      {country.name}
                      {!country.active && (
                        <span className="text-xs ml-2 text-gray-400">(Coming Soon)</span>
                      )}
                    </span>
                  </div>
                  {selectedCountry === country.name && (
                    <Check className="h-4 w-4 text-club66-purple" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelector;
