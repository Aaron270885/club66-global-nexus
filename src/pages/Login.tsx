
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to access your Club66 membership benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center">
                  <Link to="/forgot-password" className="text-club66-purple hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <div className="text-sm text-center">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-club66-purple hover:underline">
                    Join Club66 now
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
