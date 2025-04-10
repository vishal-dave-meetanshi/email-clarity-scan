
interface EmailVerificationResult {
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
}

export async function verifyEmail(email: string): Promise<EmailVerificationResult> {
  // This is a mock implementation since we can't actually verify emails from the frontend
  // In a real application, this would call a backend API
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract domain from email
  const domain = email.split('@')[1];
  
  // Basic email validation regex
  const formatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // List of known disposable email domains
  const disposableDomains = [
    'tempmail.com', 'throwawaymail.com', 'mailinator.com', 
    'guerrillamail.com', 'yopmail.com', '10minutemail.com'
  ];
  
  // Check if it's a role-based email
  const roleEmails = ['admin@', 'support@', 'info@', 'contact@', 'help@', 'service@'];
  const isRoleEmail = roleEmails.some(role => email.toLowerCase().startsWith(role));
  
  // For the demo, generate random but reasonable-looking MX records based on the domain
  const mxRecords = [];
  if (formatValid && domain && !domain.includes('invalid')) {
    // Generate mock MX records based on the domain
    if (domain.includes('gmail')) {
      mxRecords.push({ host: 'aspmx.l.google.com', priority: 1 });
      mxRecords.push({ host: 'alt1.aspmx.l.google.com', priority: 5 });
      mxRecords.push({ host: 'alt2.aspmx.l.google.com', priority: 10 });
    } else if (domain.includes('yahoo')) {
      mxRecords.push({ host: 'mx-yahoo.mail.om.yahoo.com', priority: 1 });
      mxRecords.push({ host: 'mx1.mail.yahoo.com', priority: 5 });
    } else if (domain.includes('outlook') || domain.includes('hotmail')) {
      mxRecords.push({ host: 'outlook-com.olc.protection.outlook.com', priority: 1 });
      mxRecords.push({ host: 'mx2.hotmail.com', priority: 5 });
    } else {
      mxRecords.push({ host: `mx1.${domain}`, priority: 10 });
      mxRecords.push({ host: `mx2.${domain}`, priority: 20 });
    }
  }
  
  // Generate mock result
  const isDisposable = disposableDomains.some(d => domain?.includes(d));
  const deliverable = formatValid && mxRecords.length > 0 && !isDisposable;
  
  return {
    valid: formatValid && deliverable,
    deliverable,
    mxRecords,
    formatValid,
    disposable: isDisposable,
    role: isRoleEmail,
    domain: domain || ''
  };
}
