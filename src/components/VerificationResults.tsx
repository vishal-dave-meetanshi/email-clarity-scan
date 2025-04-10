
import React from 'react';
import { 
  Check, X, AlertTriangle, Server, Mail, Shield, MailCheck, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface VerificationResultsProps {
  results: {
    valid: boolean;
    deliverable: boolean;
    mxRecords: {
      host: string;
      priority: number;
    }[];
    formatValid: boolean;
    disposable: boolean;
    role: boolean;
    domain: string;
  };
}

const VerificationResults: React.FC<VerificationResultsProps> = ({ results }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="result-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Verification Results</CardTitle>
              <CardDescription>Detailed analysis for {results.domain}</CardDescription>
            </div>
            <Badge 
              variant={results.valid ? "default" : "destructive"}
              className="ml-2 bg-opacity-90"
            >
              {results.valid ? (
                <span className="flex items-center">
                  <Check className="mr-1 h-3 w-3" />
                  Valid
                </span>
              ) : (
                <span className="flex items-center">
                  <X className="mr-1 h-3 w-3" />
                  Invalid
                </span>
              )}
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultItem 
              title="Email Format" 
              value={results.formatValid ? "Valid syntax" : "Invalid syntax"}
              icon={<Mail />}
              status={results.formatValid ? "success" : "error"}
            />
            <ResultItem 
              title="Deliverability" 
              value={results.deliverable ? "Can receive emails" : "Undeliverable"}
              icon={<MailCheck />}
              status={results.deliverable ? "success" : "error"}
            />
            <ResultItem 
              title="Disposable Email" 
              value={results.disposable ? "Temporary email" : "Not disposable"}
              icon={<Shield />}
              status={results.disposable ? "warning" : "success"}
            />
            <ResultItem 
              title="Role Account" 
              value={results.role ? "Role address" : "Personal address"}
              icon={<AlertTriangle />}
              status={results.role ? "warning" : "success"}
            />
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Server className="h-4 w-4 mr-2" />
              MX Records
            </h3>
            {results.mxRecords && results.mxRecords.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="grid grid-cols-2 gap-2 font-medium text-gray-600 mb-2">
                  <div>Host</div>
                  <div>Priority</div>
                </div>
                {results.mxRecords.map((record, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 text-gray-700 border-t border-gray-200 py-2">
                    <div className="truncate">{record.host}</div>
                    <div>{record.priority}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm">
                No MX records found for this domain
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Analysis performed on {new Date().toLocaleString()}
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p className="flex items-center justify-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          The verification results are for demonstration purposes only
        </p>
      </div>
    </div>
  );
};

interface ResultItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'success' | 'error' | 'warning';
}

const ResultItem: React.FC<ResultItemProps> = ({ title, value, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <div className="mr-3 text-gray-500">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-700">{title}</h4>
        <div className={`${getStatusColor()} inline-block rounded-md px-2 py-0.5 text-xs mt-1`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default VerificationResults;
