
import React from 'react';
import { 
  Check, X, AlertTriangle, Mail, Shield, MailCheck, Zap, User, Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface VerificationResultsProps {
  results: {
    email: string;
    user: string;
    domain: string;
    status: "OK" | "Invalid" | "Unknown";
    reason: string;
    disposable: boolean;
  };
}

const VerificationResults: React.FC<VerificationResultsProps> = ({ results }) => {
  const isValid = results.status === "OK";
  const isUnknown = results.status === "Unknown";
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="result-card border-none bg-opacity-10 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-gradient-future">Verification Results</CardTitle>
              <CardDescription>Analysis for {results.email}</CardDescription>
            </div>
            <Badge 
              variant={isValid ? "default" : isUnknown ? "outline" : "destructive"}
              className="ml-2 bg-opacity-90"
            >
              {isValid ? (
                <span className="flex items-center">
                  <Check className="mr-1 h-3 w-3" />
                  Valid
                </span>
              ) : isUnknown ? (
                <span className="flex items-center">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Unknown
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
        <Separator className="opacity-30" />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultItem 
              title="Status" 
              value={results.status}
              icon={<Zap className="h-5 w-5" />}
              status={isValid ? "success" : isUnknown ? "warning" : "error"}
            />
            <ResultItem 
              title="Reason" 
              value={results.reason}
              icon={<MailCheck className="h-5 w-5" />}
              status={isValid ? "success" : isUnknown ? "warning" : "error"}
            />
            <ResultItem 
              title="Username" 
              value={results.user}
              icon={<User className="h-5 w-5" />}
              status="info"
            />
            <ResultItem 
              title="Domain" 
              value={results.domain}
              icon={<Globe className="h-5 w-5" />}
              status="info"
            />
            <ResultItem 
              title="Disposable Email" 
              value={results.disposable ? "Yes (Temporary)" : "No (Standard)"}
              icon={<Shield className="h-5 w-5" />}
              status={results.disposable ? "warning" : "success"}
            />
          </div>
        </CardContent>
        <CardFooter className="text-sm text-gray-400">
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-2" />
            Verification completed at {new Date().toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

interface ResultItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'success' | 'error' | 'warning' | 'info';
}

const ResultItem: React.FC<ResultItemProps> = ({ title, value, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-900/20 text-green-400 border border-green-500/20';
      case 'error':
        return 'bg-red-900/20 text-red-400 border border-red-500/20';
      case 'warning':
        return 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/20';
      case 'info':
        return 'bg-blue-900/20 text-blue-400 border border-blue-500/20';
      default:
        return 'bg-gray-800/40 text-gray-300 border border-gray-700/50';
    }
  };

  return (
    <div className="flex items-center p-3 backdrop-blur-lg bg-black/10 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
      <div className="mr-3 text-primary-foreground/80">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-200">{title}</h4>
        <div className={`${getStatusColor()} inline-block rounded-md px-2 py-0.5 text-xs mt-1 font-mono`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default VerificationResults;
