
import Layout from '@/components/layout/Layout';

const AppPage = () => {
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Club66 Global App</h1>
          <p className="text-center text-gray-600 mb-8">
            Download our mobile app to access your membership benefits on the go.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AppPage;
