
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

interface JoinieRecord {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  user_type?: string;
  membership_tier?: string;
  referral_code?: string;
  registration_source?: string;
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [joinie, setJoinie] = useState<JoinieRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setProfile(null);
      setJoinie(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
        setError(profileError.message);
      } else {
        setProfile(profileData);
      }

      // Fetch joinie record
      const { data: joinieData, error: joinieError } = await supabase
        .from('joinies')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (joinieError && joinieError.code !== 'PGRST116') {
        console.error('Joinie fetch error:', joinieError);
        setError(joinieError.message);
      } else {
        setJoinie(joinieData);
      }

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        return { error: error.message };
      }

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { error: 'Failed to update profile' };
    }
  };

  return {
    profile,
    joinie,
    loading,
    error,
    updateProfile,
    refetch: fetchUserData
  };
}
