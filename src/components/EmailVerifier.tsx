
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2, Check, AlertTriangle } from 'lucide-react';
import VerificationResults from './VerificationResults';
import { verifyEmail } from '@/lib/emailVerifier';

const EmailVerifier = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const data = await verifyEmail(email);
      setResults(data);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying this email",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="blob-gradient left-[20%] top-20"></div>
      <div className="blob-gradient right-[20%] bottom-20"></div>
      <div className="mesh-gradient"></div>
      
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-main-gradient mb-3">
          Email Clarity Scan
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Verify any email address instantly. Check deliverability, MX records, 
          syntax validity, and more with our professional email verification tool.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter an email address to verify"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input pl-10"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-main-gradient hover:opacity-90 transition-opacity text-white font-medium px-6 py-6 h-auto"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </form>

      {results && <VerificationResults results={results} />}
    </div>
  );
};

export default EmailVerifier;
