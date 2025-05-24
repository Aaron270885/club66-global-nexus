
import React from 'react';
import { Briefcase, Search, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JobCenter = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Job Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center pb-4 border-b">
            <Briefcase className="h-12 w-12 text-club66-purple mb-4" />
            <h3 className="text-lg font-medium mb-2">Career Opportunities</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Access exclusive job listings and opportunities through our job portal. Find your next career move with Club66 Global.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild>
                <Link to="/jobs">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/job-dashboard/employee">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Seeker Portal
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <Building className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <h4 className="font-medium mb-2">For Employers</h4>
            <p className="text-gray-500 mb-4 text-sm">
              Are you hiring? Post jobs and find talented candidates.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/job-dashboard/employer">Employer Dashboard</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCenter;
