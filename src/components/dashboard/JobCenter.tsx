
import React from 'react';
import { Briefcase, Search, Building, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JobCenter = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Job Center
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-6 p-6">
          {/* Main CTA Section */}
          <div className="flex flex-col items-center text-center pb-6 border-b">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-full mb-4">
              <Briefcase className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Career Opportunities
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Access exclusive job listings and opportunities through our premium job portal. Find your next career move with Club66 Global.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Link to="/jobs">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Link to="/job-dashboard/employee">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Seeker Portal
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="bg-blue-50 p-2 rounded-lg mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mx-auto" />
              </div>
              <div className="text-lg font-bold text-blue-600">150+</div>
              <div className="text-xs text-gray-500">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="bg-green-50 p-2 rounded-lg mb-2">
                <Users className="h-5 w-5 text-green-600 mx-auto" />
              </div>
              <div className="text-lg font-bold text-green-600">500+</div>
              <div className="text-xs text-gray-500">Companies</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 p-2 rounded-lg mb-2">
                <Award className="h-5 w-5 text-purple-600 mx-auto" />
              </div>
              <div className="text-lg font-bold text-purple-600">95%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
          </div>
          
          {/* Employer Section */}
          <div className="text-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
            <div className="bg-white p-3 rounded-full w-fit mx-auto mb-3 shadow-sm">
              <Building className="h-8 w-8 text-gray-600" />
            </div>
            <h4 className="font-semibold mb-2">For Employers</h4>
            <p className="text-gray-600 mb-4 text-sm">
              Are you hiring? Post jobs and find talented candidates from our premium network.
            </p>
            <Button variant="outline" size="sm" asChild className="bg-white hover:bg-gray-50">
              <Link to="/job-dashboard/employer">Employer Dashboard</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCenter;
