
-- Drop all existing tables and related objects if they exist
DROP TABLE IF EXISTS public.discount_usage CASCADE;
DROP TABLE IF EXISTS public.token_transactions CASCADE;
DROP TABLE IF EXISTS public.admin_pages CASCADE;
DROP TABLE IF EXISTS public.admin_sections CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.merchants CASCADE;
DROP TABLE IF EXISTS public.user_education CASCADE;
DROP TABLE IF EXISTS public.secours_subscriptions CASCADE;
DROP TABLE IF EXISTS public.admin_menu_items CASCADE;
DROP TABLE IF EXISTS public.job_bookmarks CASCADE;
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.competition_votes CASCADE;
DROP TABLE IF EXISTS public.competitions CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.competition_participants CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.project_funding CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.admin_form_submissions CASCADE;
DROP TABLE IF EXISTS public.admin_settings CASCADE;
DROP TABLE IF EXISTS public.agents CASCADE;
DROP TABLE IF EXISTS public.admin_forms CASCADE;
DROP TABLE IF EXISTS public.user_experience CASCADE;
DROP TABLE IF EXISTS public.rescue_requests CASCADE;
DROP TABLE IF EXISTS public.job_categories CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.memberships CASCADE;
DROP TABLE IF EXISTS public.project_contributions CASCADE;
DROP TABLE IF EXISTS public.user_skills CASCADE;
DROP TABLE IF EXISTS public.admin_media CASCADE;
DROP TABLE IF EXISTS public.joinies CASCADE;

-- Drop custom types if they exist
DROP TYPE IF EXISTS public.secours_type CASCADE;
DROP TYPE IF EXISTS public.token_transaction_type CASCADE;
DROP TYPE IF EXISTS public.rescue_status CASCADE;
DROP TYPE IF EXISTS public.competition_status CASCADE;
DROP TYPE IF EXISTS public.payment_status CASCADE;
DROP TYPE IF EXISTS public.membership_tier CASCADE;
DROP TYPE IF EXISTS public.agent_type CASCADE;

-- Create custom types
CREATE TYPE public.secours_type AS ENUM (
  'motors',
  'cata_catanis', 
  'auto',
  'telephone',
  'school_fees'
);

CREATE TYPE public.token_transaction_type AS ENUM (
  'purchase',
  'rescue_claim',
  'refund'
);

CREATE TYPE public.rescue_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'completed'
);

CREATE TYPE public.competition_status AS ENUM (
  'upcoming',
  'active',
  'completed',
  'cancelled'
);

CREATE TYPE public.payment_status AS ENUM (
  'pending',
  'completed',
  'failed',
  'refunded'
);

CREATE TYPE public.membership_tier AS ENUM (
  'essential',
  'premium',
  'vip'
);

CREATE TYPE public.agent_type AS ENUM (
  'individual',
  'business',
  'organization'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Mali',
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create joinies table for new user registrations
CREATE TABLE public.joinies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Mali',
  user_type TEXT DEFAULT 'member',
  membership_tier TEXT,
  referral_code TEXT,
  registration_source TEXT DEFAULT 'website',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create memberships table
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_id TEXT UNIQUE,
  tier membership_tier NOT NULL DEFAULT 'essential',
  registration_fee_paid BOOLEAN DEFAULT false,
  monthly_fee_current BOOLEAN DEFAULT false,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expiry_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  physical_card_requested BOOLEAN DEFAULT false,
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create agents table
CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  agent_type agent_type NOT NULL DEFAULT 'individual',
  total_commissions INTEGER DEFAULT 0,
  commissions_withdrawn INTEGER DEFAULT 0,
  commissions_pending INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  qr_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create merchants table
CREATE TABLE public.merchants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  location TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  logo_url TEXT,
  discount_percentage INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create discount_usage table
CREATE TABLE public.discount_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
  amount_saved INTEGER,
  discount_percentage INTEGER,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_id UUID REFERENCES public.memberships(id),
  payment_type TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  commission_amount INTEGER NOT NULL,
  commission_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Ô Secours subscriptions table
CREATE TABLE public.secours_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_type secours_type NOT NULL,
  token_balance INTEGER NOT NULL DEFAULT 0,
  subscription_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_token_purchase_date TIMESTAMP WITH TIME ZONE,
  last_rescue_claim_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, subscription_type)
);

-- Create token transactions table
CREATE TABLE public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES public.secours_subscriptions(id) ON DELETE CASCADE,
  transaction_type token_transaction_type NOT NULL,
  token_amount INTEGER NOT NULL,
  token_value_fcfa INTEGER NOT NULL,
  payment_method TEXT,
  transaction_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rescue requests table
CREATE TABLE public.rescue_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES public.secours_subscriptions(id) ON DELETE CASCADE,
  request_description TEXT NOT NULL,
  rescue_value_fcfa INTEGER NOT NULL,
  token_balance_at_request INTEGER NOT NULL,
  status rescue_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job categories table
CREATE TABLE public.job_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  location TEXT,
  industry TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'CFA',
  experience_level TEXT DEFAULT 'entry',
  skills TEXT[],
  remote_allowed BOOLEAN DEFAULT false,
  application_count INTEGER DEFAULT 0,
  category_id UUID REFERENCES public.job_categories(id),
  company_id UUID REFERENCES public.companies(id),
  posted_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  application_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'pending',
  experience_years INTEGER,
  expected_salary INTEGER,
  available_from DATE,
  portfolio_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job bookmarks table
CREATE TABLE public.job_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Create user skills table
CREATE TABLE public.user_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  experience_level TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user experience table
CREATE TABLE public.user_experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user education table
CREATE TABLE public.user_education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  grade TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create competitions table
CREATE TABLE public.competitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  prize TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status competition_status DEFAULT 'upcoming',
  max_entries INTEGER,
  current_entries INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create competition participants table
CREATE TABLE public.competition_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competition_id UUID NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  participant_phone TEXT NOT NULL,
  profile_picture_url TEXT,
  vote_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create competition votes table
CREATE TABLE public.competition_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competition_id UUID NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.competition_participants(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_date DATE DEFAULT CURRENT_DATE,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create project funding table
CREATE TABLE public.project_funding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  description TEXT NOT NULL,
  goal_amount INTEGER NOT NULL,
  current_amount INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'CFA',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  category TEXT NOT NULL,
  location TEXT,
  image_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project contributions table
CREATE TABLE public.project_contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.project_funding(id) ON DELETE CASCADE,
  contributor_id UUID REFERENCES auth.users(id),
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'CFA',
  contributor_name TEXT,
  contributor_email TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create utility functions
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.generate_member_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    new_id := 'C66-ML-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
    SELECT EXISTS(SELECT 1 FROM public.memberships WHERE member_id = new_id) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    new_code := 'REF' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM public.agents WHERE referral_code = new_code) INTO exists_check;
    EXIT WHEN NOT exists_check;
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.set_member_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.member_id IS NULL THEN
    NEW.member_id := generate_member_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_new_joinie()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.joinies (
    user_id, 
    full_name, 
    email, 
    phone,
    user_type,
    created_at, 
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'member'),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_token_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.transaction_type = 'purchase' THEN
    UPDATE public.secours_subscriptions 
    SET 
      token_balance = token_balance + NEW.token_amount,
      last_token_purchase_date = now(),
      updated_at = now()
    WHERE id = NEW.subscription_id;
  ELSIF NEW.transaction_type = 'rescue_claim' THEN
    UPDATE public.secours_subscriptions 
    SET 
      token_balance = token_balance - NEW.token_amount,
      last_rescue_claim_date = now(),
      updated_at = now()
    WHERE id = NEW.subscription_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_project_funding_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.project_funding 
    SET current_amount = current_amount + NEW.amount,
        updated_at = now()
    WHERE id = NEW.project_id;
  ELSIF OLD.status = 'completed' AND NEW.status != 'completed' THEN
    UPDATE public.project_funding 
    SET current_amount = current_amount - OLD.amount,
        updated_at = now()
    WHERE id = NEW.project_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.increment_job_application_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.jobs 
  SET application_count = application_count + 1 
  WHERE id = NEW.job_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.get_token_value(sub_type secours_type)
RETURNS INTEGER AS $$
BEGIN
  CASE sub_type
    WHEN 'motors', 'telephone' THEN RETURN 250;
    WHEN 'auto' THEN RETURN 750;
    WHEN 'cata_catanis', 'school_fees' THEN RETURN 500;
    ELSE RETURN 0;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION public.get_min_max_tokens(sub_type secours_type)
RETURNS TABLE(min_tokens INTEGER, max_tokens INTEGER, min_value_fcfa INTEGER, max_value_fcfa INTEGER) AS $$
BEGIN
  CASE sub_type
    WHEN 'motors', 'telephone' THEN 
      RETURN QUERY SELECT 30, 60, 7500, 15000;
    WHEN 'auto' THEN 
      RETURN QUERY SELECT 30, 60, 22500, 45000;
    WHEN 'cata_catanis', 'school_fees' THEN 
      RETURN QUERY SELECT 30, 60, 15000, 30000;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_created_joinie
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_joinie();

CREATE TRIGGER set_member_id_trigger
  BEFORE INSERT ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.set_member_id();

CREATE TRIGGER set_referral_code_trigger
  BEFORE INSERT ON public.agents
  FOR EACH ROW EXECUTE FUNCTION public.set_referral_code();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_joinies_updated_at
  BEFORE UPDATE ON public.joinies
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_merchants_updated_at
  BEFORE UPDATE ON public.merchants
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_secours_subscriptions_updated_at
  BEFORE UPDATE ON public.secours_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_rescue_requests_updated_at
  BEFORE UPDATE ON public.rescue_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_competitions_updated_at
  BEFORE UPDATE ON public.competitions
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_project_funding_updated_at
  BEFORE UPDATE ON public.project_funding
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_token_balance_trigger
  AFTER INSERT ON public.token_transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_token_balance();

CREATE TRIGGER update_project_funding_amount_trigger
  AFTER INSERT OR UPDATE ON public.project_contributions
  FOR EACH ROW EXECUTE FUNCTION public.update_project_funding_amount();

CREATE TRIGGER increment_application_count_trigger
  AFTER INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.increment_job_application_count();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.joinies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secours_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_funding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contributions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for joinies
CREATE POLICY "Joinies are viewable by authenticated users" ON public.joinies
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own joinie record" ON public.joinies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own joinie record" ON public.joinies
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for memberships
CREATE POLICY "Users can view their own membership" ON public.memberships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership" ON public.memberships
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all memberships" ON public.memberships
  FOR ALL USING (true);

-- Create RLS policies for agents
CREATE POLICY "Users can view their own agent profile" ON public.agents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agent profile" ON public.agents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent profile" ON public.agents
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for merchants
CREATE POLICY "Anyone can view active merchants" ON public.merchants
  FOR SELECT USING (is_active = true);

-- Create RLS policies for discount usage
CREATE POLICY "Users can view their own discount usage" ON public.discount_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own discount usage" ON public.discount_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all payments" ON public.payments
  FOR ALL USING (true);

-- Create RLS policies for referrals
CREATE POLICY "Agents can view their own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM agents WHERE id = referrals.agent_id));

-- Create RLS policies for secours subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.secours_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" ON public.secours_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.secours_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for token transactions
CREATE POLICY "Users can view their own token transactions" ON public.token_transactions
  FOR SELECT USING (
    auth.uid() = (
      SELECT user_id FROM public.secours_subscriptions 
      WHERE id = token_transactions.subscription_id
    )
  );

CREATE POLICY "Service can manage token transactions" ON public.token_transactions
  FOR ALL USING (true);

-- Create RLS policies for rescue requests
CREATE POLICY "Users can view their own rescue requests" ON public.rescue_requests
  FOR SELECT USING (
    auth.uid() = (
      SELECT user_id FROM public.secours_subscriptions 
      WHERE id = rescue_requests.subscription_id
    )
  );

CREATE POLICY "Users can create their own rescue requests" ON public.rescue_requests
  FOR INSERT WITH CHECK (
    auth.uid() = (
      SELECT user_id FROM public.secours_subscriptions 
      WHERE id = rescue_requests.subscription_id
    )
  );

CREATE POLICY "Service can manage rescue requests" ON public.rescue_requests
  FOR ALL USING (true);

-- Create RLS policies for job categories
CREATE POLICY "Job categories are viewable by everyone" ON public.job_categories
  FOR SELECT USING (true);

-- Create RLS policies for companies
CREATE POLICY "Companies are viewable by everyone" ON public.companies
  FOR SELECT USING (true);

-- Create RLS policies for jobs
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own posted jobs" ON public.jobs
  FOR UPDATE USING (auth.uid() = posted_by);

-- Create RLS policies for job applications
CREATE POLICY "Users can view their own applications" ON public.job_applications
  FOR SELECT USING (auth.uid() = applicant_id OR auth.uid() IN (SELECT posted_by FROM jobs WHERE id = job_id));

CREATE POLICY "Users can create job applications" ON public.job_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own applications" ON public.job_applications
  FOR UPDATE USING (auth.uid() = applicant_id);

-- Create RLS policies for job bookmarks
CREATE POLICY "Users can view their own bookmarks" ON public.job_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks" ON public.job_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON public.job_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user skills
CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for user experience
CREATE POLICY "Users can manage their own experience" ON public.user_experience
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for user education
CREATE POLICY "Users can manage their own education" ON public.user_education
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for competitions
CREATE POLICY "Anyone can view active competitions" ON public.competitions
  FOR SELECT USING (true);

-- Create RLS policies for competition participants
CREATE POLICY "Anyone can view competition participants" ON public.competition_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can participate in competitions" ON public.competition_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for competition votes
CREATE POLICY "Users can view competition votes" ON public.competition_votes
  FOR SELECT USING (true);

CREATE POLICY "Users can vote in competitions" ON public.competition_votes
  FOR INSERT WITH CHECK (auth.uid() = voter_id);

-- Create RLS policies for project funding
CREATE POLICY "Anyone can view active projects" ON public.project_funding
  FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can create projects" ON public.project_funding
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project creators can update their projects" ON public.project_funding
  FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for project contributions
CREATE POLICY "Anyone can view non-anonymous contributions" ON public.project_contributions
  FOR SELECT USING (is_anonymous = false);

CREATE POLICY "Contributors can view their own contributions" ON public.project_contributions
  FOR SELECT USING (auth.uid() = contributor_id);

CREATE POLICY "Anyone can create contributions" ON public.project_contributions
  FOR INSERT WITH CHECK (true);

-- Insert default data
INSERT INTO public.job_categories (name, description) VALUES
('Technology', 'Software development, IT, and tech roles'),
('Marketing', 'Digital marketing, advertising, and promotion'),
('Finance', 'Banking, accounting, and financial services'),
('Healthcare', 'Medical, nursing, and healthcare services'),
('Education', 'Teaching, training, and educational roles'),
('Sales', 'Sales representatives and business development'),
('Engineering', 'Civil, mechanical, and other engineering roles'),
('Design', 'Graphic design, UI/UX, and creative roles')
ON CONFLICT DO NOTHING;

INSERT INTO public.companies (name, description, industry, location) VALUES
('Tech Solutions Mali', 'Leading technology company in Mali', 'Technology', 'Bamako, Mali'),
('Club66 Global', 'Premium membership platform', 'Technology', 'Bamako, Mali'),
('Innovation Hub', 'Innovation and startup incubator', 'Technology', 'Bamako, Mali'),
('Digital Solutions', 'Digital transformation consultancy', 'Technology', 'Bamako, Mali'),
('TechCorp Africa', 'Pan-African technology solutions', 'Technology', 'Multiple Locations')
ON CONFLICT DO NOTHING;

INSERT INTO public.merchants (name, sector, discount_percentage, location, is_active) VALUES
('Fashion Store Mali', 'Clothing & Fashion', 15, 'Bamako', true),
('Tech Mall', 'Electronics', 10, 'Bamako', true),
('Green Market', 'Groceries & Food', 5, 'Bamako', true),
('Hotel Paradise', 'Hotels & Accommodation', 20, 'Bamako', true),
('Beauty Spa', 'Beauty & Wellness', 12, 'Bamako', true)
ON CONFLICT DO NOTHING;
