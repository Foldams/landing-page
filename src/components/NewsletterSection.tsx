import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, scaleIn } from "@/lib/animation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
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
    
    // Start loading state
    setIsSubmitting(true);

    try {
      const subscriberData = { 
        email,
        source: 'newsletter_section'
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
            source: 'newsletter_section',
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
      setIsSubmitted(true);
      setEmail("");
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      className="py-16 bg-dark-brown text-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            variants={fadeIn("up", 0.1)}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.2)}
            className="text-gray-300 mb-8"
          >
            Stay updated with the latest news, upcoming launches, and special promotions from all our divisions.
          </motion.p>
          
          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              variants={fadeIn("up", 0.3)}
            >
              <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
                <motion.div 
                  className="w-full" 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white text-gray-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    type="submit" 
                    className="bg-foldams-red hover:bg-opacity-90 text-white md:px-8 transition-all duration-300"
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
                </motion.div>
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
              
              <motion.p 
                variants={fadeIn("up", 0.4)}
                className="text-sm text-gray-400 mt-4"
              >
                By subscribing, you agree to our Privacy Policy and consent to receive updates from Foldams Inc.
              </motion.p>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mb-4 text-green-400"
              >
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
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold"
              >
                Thank you for subscribing!
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 mt-2"
              >
                You've successfully subscribed to our newsletter. Get ready to receive the latest updates from Foldams Inc.
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}