import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface NewsletterFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  source?: string;
}

export default function NewsletterForm({
  isOpen,
  setIsOpen,
  title = "Subscribe to Our Newsletter",
  source = "general"
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Function to save subscriber to localStorage as fallback
  const saveToLocalStorage = (subscriberData: { email: string; name?: string; source: string }) => {
    try {
      // Store with email as key prefix for easier migration
      const key = `email_${subscriberData.email.toLowerCase()}`;
      const data = {
        name: subscriberData.name || '',
        source: subscriberData.source,
        timestamp: new Date().toISOString()
      };
      
      // Check if already exists
      if (localStorage.getItem(key)) {
        return { success: false, isDuplicate: true };
      }
      
      // Store the subscriber data
      localStorage.setItem(key, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return { success: false, error };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Prepare subscriber data
      const subscriberData = { 
        email,
        name: name || null,
        source
      };

      // Check if we're using the placeholder Supabase URL
      const isUsingFallback = supabase.supabaseUrl === 'https://placeholder-url.supabase.co';
      
      let success = false;
      let isDuplicate = false;
      
      if (isUsingFallback) {
        // Use localStorage as fallback
        console.log("Using localStorage fallback for subscription storage");
        const result = saveToLocalStorage(subscriberData);
        success = result.success;
        isDuplicate = result.isDuplicate || false;
      } else {
        // Try to insert subscriber into Supabase
        console.log('Attempting to insert into Supabase:', subscriberData);
        const { error: supabaseError, data: supabaseData } = await supabase
          .from('app_756f9e3ca9454cb782f1af778d02d691_subscribers')
          .insert([subscriberData]);
        
        console.log('Supabase response:', { error: supabaseError, data: supabaseData });
        
        if (supabaseError) {
          // Handle duplicate email error gracefully
          if (supabaseError.code === '23505') {
            isDuplicate = true;
          } else {
            console.error("Supabase error:", supabaseError);
            throw new Error(supabaseError.message);
          }
        } else {
          success = true;
          
          // Send welcome email
          try {
            const { sendWelcomeEmail } = await import('@/lib/send-email');
            sendWelcomeEmail(email, name)
              .then(result => console.log('Welcome email result:', result))
              .catch(err => console.error('Error sending welcome email:', err));
          } catch (emailError) {
            // Don't fail the subscription if email sending fails
            console.error('Error importing email module:', emailError);
          }
        }
      }
      
      if (isDuplicate) {
        setError("You're already subscribed with this email address!");
        setIsSubmitting(false);
        return;
      }
      
      if (!success) {
        throw new Error("Failed to save subscription");
      }
      
      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds and close
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setName("");
        setIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md flex flex-col items-center">
        <DialogHeader className="w-full text-center">
          <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 md:p-6 w-full">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="text-sm text-gray-500">
                Subscribe to get notified about product launches, special offers and company news.
              </div>
              <Button 
                type="submit"
                className="w-full bg-foldams-red hover:bg-opacity-90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-xl font-medium">Thank you for subscribing!</div>
              <p className="text-center text-gray-500">
                You will now receive updates about our latest news and offers.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}