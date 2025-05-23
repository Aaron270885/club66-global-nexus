
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProjectsAndScholarships = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Project & Scholarship Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
          <p className="text-gray-500 mb-6">
            You haven't submitted any project or scholarship applications.
          </p>
          <Button>
            Submit a Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsAndScholarships;
