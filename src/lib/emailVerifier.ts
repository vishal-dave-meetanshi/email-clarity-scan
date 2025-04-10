
interface EmailVerificationResponse {
  email: string;
  user: string;
  domain: string;
  status: "OK" | "Invalid" | "Unknown";
  reason: string;
  disposable: boolean;
}

export async function verifyEmail(email: string): Promise<EmailVerificationResponse> {
  try {
    const response = await fetch(`https://api.meetanshi.com/verify.php?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error('Failed to verify email');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
}
