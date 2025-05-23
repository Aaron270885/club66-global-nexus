
import React from 'react';
import { Briefcase } from 'lucide-react';
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
        <div className="text-center py-8">
          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Find Opportunities</h3>
          <p className="text-gray-500 mb-6">
            Access exclusive job listings and opportunities through our job portal.
          </p>
          <Button asChild>
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCenter;
