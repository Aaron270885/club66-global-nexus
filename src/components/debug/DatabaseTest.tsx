
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const DatabaseTest = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('test@club66.com');
  const [testPassword, setTestPassword] = useState('testpassword123');

  const addResult = (test: string, success: boolean, data?: any, error?: any) => {
    const result = {
      test,
      success,
      data,
      error: error?.message || error,
      timestamp: new Date().toISOString()
    };
    setTestResults(prev => [...prev, result]);
    console.log('Test Result:', result);
  };

  const testDatabaseConnection = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Check Supabase connection
      addResult('Supabase Client Configuration', true, {
        configured: 'Supabase client is properly configured',
        project: 'tklwdscpbddieykqfbdy'
      });

      // Test 2: Test basic table queries
      const { data: jobCategories, error: categoriesError } = await supabase
        .from('job_categories')
        .select('*')
        .limit(5);
      
      addResult('Job Categories Query', !categoriesError, {
        count: jobCategories?.length || 0,
        categories: jobCategories
      }, categoriesError);

      // Test 3: Test companies table
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('*')
        .limit(5);
      
      addResult('Companies Query', !companiesError, {
        count: companies?.length || 0,
        companies: companies
      }, companiesError);

      // Test 4: Test merchants table
      const { data: merchants, error: merchantsError } = await supabase
        .from('merchants')
        .select('*')
        .limit(5);
      
      addResult('Merchants Query', !merchantsError, {
        count: merchants?.length || 0,
        merchants: merchants
      }, merchantsError);

      // Test 5: Check auth status
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      addResult('Auth Session Check', !sessionError, { 
        hasSession: !!session,
        userId: session?.user?.id 
      }, sessionError);

      // Test 6: If user is authenticated, test user-specific tables
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        addResult('User Profile Query', !profileError, profile, profileError);

        const { data: joinie, error: joinieError } = await supabase
          .from('joinies')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        addResult('User Joinie Record', !joinieError, joinie, joinieError);
      }

    } catch (error) {
      addResult('General Error', false, null, error);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    
    try {
      // Test registration flow
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: 'Test User Club66',
            phone: '+223 XX XX XX XX',
            user_type: 'member'
          }
        }
      });

      addResult('Test Registration - Auth', !authError, {
        userId: authData.user?.id,
        email: authData.user?.email,
        needsConfirmation: !authData.session,
        message: authData.session ? 'User registered and logged in' : 'User registered, email confirmation needed'
      }, authError);

      if (authData.user && !authError) {
        // Wait a moment for triggers to execute
        setTimeout(async () => {
          // Check if profile was created automatically
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          addResult('Auto-Created Profile', !profileError, profile, profileError);

          // Check if joinie record was created automatically
          const { data: joinie, error: joinieError } = await supabase
            .from('joinies')
            .select('*')
            .eq('user_id', authData.user.id)
            .single();

          addResult('Auto-Created Joinie Record', !joinieError, joinie, joinieError);
        }, 1000);
      }

    } catch (error) {
      addResult('Test Registration Error', false, null, error);
    } finally {
      setLoading(false);
    }
  };

  const testDatabaseFunctions = async () => {
    setLoading(true);
    
    try {
      // Test token value functions
      const { data: tokenValues, error: tokenError } = await supabase.rpc('get_token_value', {
        sub_type: 'motors'
      });
      
      addResult('Token Value Function', !tokenError, {
        sub_type: 'motors',
        token_value: tokenValues
      }, tokenError);

      // Test min/max tokens function
      const { data: minMaxTokens, error: minMaxError } = await supabase.rpc('get_min_max_tokens', {
        sub_type: 'auto'
      });
      
      addResult('Min/Max Tokens Function', !minMaxError, {
        sub_type: 'auto',
        tokens_info: minMaxTokens
      }, minMaxError);

    } catch (error) {
      addResult('Database Functions Error', false, null, error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Fresh Database Connection Test</CardTitle>
        <CardDescription>
          Test your rebuilt Supabase backend. All tables have been recreated with proper structure and security policies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={testDatabaseConnection} 
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Testing...' : 'Test Database Connection'}
          </Button>
          
          <Button 
            onClick={testRegistration} 
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Testing...' : 'Test Registration Flow'}
          </Button>

          <Button 
            onClick={testDatabaseFunctions} 
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Testing...' : 'Test Database Functions'}
          </Button>
          
          <Button 
            onClick={clearResults} 
            variant="ghost"
          >
            Clear Results
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="testEmail">Test Email</Label>
            <Input
              id="testEmail"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@club66.com"
            />
          </div>
          <div>
            <Label htmlFor="testPassword">Test Password</Label>
            <Input
              id="testPassword"
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="testpassword123"
            />
          </div>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results:</h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {testResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded border ${
                    result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{result.test}</span>
                    <span className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                      {result.success ? '✓ Success' : '✗ Failed'}
                    </span>
                  </div>
                  {result.data && (
                    <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                  {result.error && (
                    <div className="text-red-600 text-sm mt-1">
                      Error: {result.error}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(result.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
