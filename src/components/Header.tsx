import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      const subscriberData = { 
        email,
        source: 'header_navbar'
      };

      // Check if we're using the placeholder Supabase URL
      const isUsingFallback = supabase.supabaseUrl === 'https://placeholder-url.supabase.co';
      
      let success = false;
      let isDuplicate = false;
      
      if (isUsingFallback) {
        // Use localStorage as fallback
        console.log("Using localStorage fallback for subscription storage");
        const key = `email_${email.toLowerCase()}`;
        
        // Check for duplicate
        if (localStorage.getItem(key)) {
          isDuplicate = true;
        } else {
          const data = {
            source: 'header_navbar',
            timestamp: new Date().toISOString()
          };
          localStorage.setItem(key, JSON.stringify(data));
          success = true;
        }
      } else {
        // Try to insert subscriber into Supabase
        console.log('Attempting to insert into Supabase:', subscriberData);
        const { error: supabaseError } = await supabase
          .from('subscribers')
          .insert([subscriberData]);
        
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
        }
      }
      
      if (isDuplicate) {
        setError("You're already subscribed with this email address!");
        setIsSubmitting(false);
        return;
      }
      
      // Show success message
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-95 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/assets/images/logo.png" alt="Foldams Inc Logo" className="h-10 mr-3" />
            <span className="text-xl font-bold text-dark-brown">Foldams Inc</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-foldams-red font-medium">Home</a>
            
            <a href="/about" className="text-gray-700 hover:text-foldams-red font-medium">About Us</a>
            
            {/* Businesses Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-foldams-red font-medium flex items-center gap-1">
                Our Businesses
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div className="absolute hidden group-hover:block z-50 mt-2 w-56 origin-top-left bg-white shadow-lg rounded-md divide-y divide-gray-100 focus:outline-none">
                <div className="py-1">
                  <a href="#foldams-logistics" className="text-gray-800 hover:text-foldams-red hover:bg-gray-100 block px-4 py-2 text-sm">
                    Foldams Logistics
                  </a>
                  <a href="#fdm-autos" className="text-gray-800 hover:text-foldams-red hover:bg-gray-100 block px-4 py-2 text-sm">
                    FDM Autos - Automotive
                  </a>
                  <a href="#foldams-food" className="text-gray-800 hover:text-foldams-red hover:bg-gray-100 block px-4 py-2 text-sm">
                    Foldams Food - Agriculture
                  </a>
                </div>
              </div>
            </div>
            
            <a href="#faq" className="text-gray-700 hover:text-foldams-red font-medium">FAQ</a>
            <a href="#contact" className="text-gray-700 hover:text-foldams-red font-medium">Contact</a>
          </nav>
          
          {/* Subscribe button */}
          <div className="hidden md:block">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-foldams-red hover:bg-opacity-90 text-white">
                  Subscribe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Subscribe to our newsletter</DialogTitle>
                  <DialogDescription>
                    Get updates on our services and special offers.
                  </DialogDescription>
                </DialogHeader>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-foldams-red hover:bg-opacity-90"
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
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                  </form>
                ) : (
                  <div className="py-6 text-center">
                    <div className="mb-4 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">Thank you for subscribing!</h3>
                    <p className="text-muted-foreground">You'll receive our latest updates.</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-foldams-red"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-gray-700 hover:text-foldams-red font-medium py-2">Home</a>
              
              <a href="/about" className="text-gray-700 hover:text-foldams-red font-medium py-2">About Us</a>
              
              {/* Mobile Businesses Section */}
              <div className="border-b border-gray-200 pb-2 mb-2">
                <h3 className="text-gray-700 font-medium py-2">Our Businesses</h3>
                <a href="#foldams-logistics" className="text-gray-600 hover:text-foldams-red font-medium py-2 pl-4 block" onClick={() => setIsMenuOpen(false)}>Foldams Logistics</a>
                <a href="#fdm-autos" className="text-gray-600 hover:text-foldams-red font-medium py-2 pl-4 block" onClick={() => setIsMenuOpen(false)}>FDM Autos - Automotive</a>
                <a href="#foldams-food" className="text-gray-600 hover:text-foldams-red font-medium py-2 pl-4 block" onClick={() => setIsMenuOpen(false)}>Foldams Food - Agriculture</a>
              </div>
              
              <a href="#faq" className="text-gray-700 hover:text-foldams-red font-medium py-2" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <a href="#contact" className="text-gray-700 hover:text-foldams-red font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-foldams-red hover:bg-opacity-90 text-white w-full mt-2">
                    Subscribe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Subscribe to our newsletter</DialogTitle>
                    <DialogDescription>
                      Get updates on our services and special offers.
                    </DialogDescription>
                  </DialogHeader>
                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-email">Email</Label>
                        <Input
                          id="mobile-email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-foldams-red hover:bg-opacity-90"
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
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </form>
                  ) : (
                    <div className="py-6 text-center">
                      <div className="mb-4 text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium">Thank you for subscribing!</h3>
                      <p className="text-muted-foreground">You'll receive our latest updates.</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}