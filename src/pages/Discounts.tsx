
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import PremiumBanner from '@/components/layout/PremiumBanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Percent, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface Merchant {
  id: string;
  name: string;
  logo_url: string;
  sector: string;
  location: string;
  contact_phone: string;
  contact_email: string;
  discount_percentage: number;
  is_active: boolean;
}

const Discounts = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: merchants, isLoading } = useQuery({
    queryKey: ['merchants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as Merchant[];
    }
  });

  const useDiscountMutation = useMutation({
    mutationFn: async (merchantId: string) => {
      if (!user) throw new Error('Please login to use discounts');

      const { error } = await supabase
        .from('discount_usage')
        .insert({
          user_id: user.id,
          merchant_id: merchantId,
          used_at: new Date().toISOString()
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Discount usage recorded! Show this to the merchant.');
      queryClient.invalidateQueries({ queryKey: ['discount-usage'] });
    },
    onError: (error: any) => {
      toast.error('Failed to record discount usage');
      console.error('Discount usage error:', error);
    }
  });

  const sectors = [...new Set(merchants?.map(m => m.sector) || [])];
  
  const filteredMerchants = merchants?.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || merchant.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const getSectorColor = (sector: string) => {
    const colors: { [key: string]: string } = {
      health: 'bg-red-100 text-red-800',
      food: 'bg-orange-100 text-orange-800',
      transport: 'bg-blue-100 text-blue-800',
      education: 'bg-green-100 text-green-800',
      retail: 'bg-purple-100 text-purple-800',
      finance: 'bg-yellow-100 text-yellow-800',
      technology: 'bg-indigo-100 text-indigo-800',
    };
    return colors[sector] || 'bg-gray-100 text-gray-800';
  };

  const handleUseDiscount = (merchantId: string) => {
    if (!user) {
      toast.error('Please login to use discounts');
      return;
    }
    useDiscountMutation.mutate(merchantId);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PremiumBanner
        title="Member Discounts"
        description="Exclusive discounts for Club66 Global members across various sectors including health, food, transport, and education."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search merchants or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Merchants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchants?.map((merchant) => (
              <Card key={merchant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <img 
                      src={merchant.logo_url || 'https://placehold.co/100x100/e9d5ff/7c3aed?text=' + merchant.name.charAt(0)}
                      alt={merchant.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <CardTitle className="text-lg">{merchant.name}</CardTitle>
                  <CardDescription>
                    <Badge className={getSectorColor(merchant.sector)}>
                      {merchant.sector.charAt(0).toUpperCase() + merchant.sector.slice(1)}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Percent className="h-6 w-6 mr-2 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">
                          {merchant.discount_percentage}% OFF
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{merchant.location}</span>
                      </div>
                      
                      {merchant.contact_phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{merchant.contact_phone}</span>
                        </div>
                      )}
                      
                      {merchant.contact_email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="truncate">{merchant.contact_email}</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={() => handleUseDiscount(merchant.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={useDiscountMutation.isPending}
                    >
                      {useDiscountMutation.isPending ? 'Recording...' : 'Use Discount'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMerchants?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No merchants found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
