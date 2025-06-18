
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  employment_type: string;
  salary_min?: number;
  salary_max?: number;
  currency: string;
  description: string;
  requirements?: string;
  benefits?: string;
  experience_level: string;
  skills?: string[];
  remote_allowed: boolean;
  application_count: number;
  created_at: string;
  application_deadline?: string;
  posted_by?: string;
  company_id?: string;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (filters?: {
    search?: string;
    location?: string;
    employmentType?: string;
    experienceLevel?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.employmentType) {
        query = query.eq('employment_type', filters.employmentType);
      }

      if (filters?.experienceLevel) {
        query = query.eq('experience_level', filters.experienceLevel);
      }

      const { data, error } = await query;

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, loading, error, fetchJobs };
};

export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  return { job, loading, error };
};

export const useJobBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_bookmarks')
        .select('job_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setBookmarks(data?.map(b => b.job_id) || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    }
  };

  const toggleBookmark = async (jobId: string) => {
    if (!user) return;

    try {
      const isBookmarked = bookmarks.includes(jobId);
      
      if (isBookmarked) {
        const { error } = await supabase
          .from('job_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('job_id', jobId);

        if (error) throw error;
        setBookmarks(prev => prev.filter(id => id !== jobId));
      } else {
        const { error } = await supabase
          .from('job_bookmarks')
          .insert({ user_id: user.id, job_id: jobId });

        if (error) throw error;
        setBookmarks(prev => [...prev, jobId]);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  return { bookmarks, toggleBookmark, fetchBookmarks };
};

export const useJobApplications = () => {
  const { user } = useAuth();

  const applyToJob = async (jobId: string, applicationData: {
    coverLetter?: string;
    expectedSalary?: number;
    availableFrom?: string;
    experienceYears?: number;
    portfolioUrl?: string;
  }) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
          cover_letter: applicationData.coverLetter,
          expected_salary: applicationData.expectedSalary,
          available_from: applicationData.availableFrom,
          experience_years: applicationData.experienceYears,
          portfolio_url: applicationData.portfolioUrl,
          status: 'pending'
        });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error applying to job:', err);
      throw err;
    }
  };

  const getUserApplications = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          jobs (
            id,
            title,
            company,
            location
          )
        `)
        .eq('applicant_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching applications:', err);
      return [];
    }
  };

  return { applyToJob, getUserApplications };
};
