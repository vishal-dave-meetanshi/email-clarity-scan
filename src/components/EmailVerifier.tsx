
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, Zap, AlertCircle } from 'lucide-react';
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
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="mesh-orb top-[-100px] left-[-100px]"></div>
      <div className="mesh-orb bottom-[-150px] right-[-100px]"></div>
      <div className="mesh-orb bottom-[-50px] left-[20%]"></div>
      <div className="cyber-grid"></div>
      
      <div className="text-center mb-12 animate-fade-in relative">
        <div className="text-glow mb-2">EMAIL VERIFICATION</div>
        <h1 className="text-4xl font-bold text-gradient-future mb-3 tracking-tight">
          Neural Email Scanner
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
          Deploy advanced verification to analyze email addresses in real-time. Check deliverability, 
          validate syntax, and detect disposable services with our quantum verification system.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-12 relative z-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter email address for neural scanning"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input pl-12 bg-black/20 border-white/10 focus:border-primary/60 text-white"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="cyber-button transition-all"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Zap className="mr-2 h-5 w-5" />
            )}
            {loading ? "Analyzing..." : "Verify Email"}
          </Button>
        </div>
      </form>

      {results && <VerificationResults results={results} />}

      {!results && !loading && (
        <div className="flex items-center justify-center p-6 rounded-lg bg-black/20 border border-white/5 text-gray-400 mt-8">
          <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
          Enter an email address above to initiate neural verification
        </div>
      )}
    </div>
  );
};

export default EmailVerifier;
