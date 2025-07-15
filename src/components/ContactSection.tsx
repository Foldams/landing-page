import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animation";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issues
// Using type assertion to avoid direct 'any' usage
const iconDefault = L.Icon.Default.prototype as Record<string, unknown>;
delete iconDefault._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Location coordinates for the map (Ottawa, St Laurent Blvd)
  const position: [number, number] = [45.4206, -75.6427]; // Approximate coordinates for St Laurent Blvd

  // Add side effect to delay map loading for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Import the email sending utility
        const { sendContactFormNotification } = await import('@/lib/send-email');
        
        // Send the contact form data to the admin email
        const result = await sendContactFormNotification(
          formState.name,
          formState.email,
          formState.message
        );
        
        if (result.success) {
          console.log("Contact form submitted successfully");
          
          // Show success state
          setIsSubmitted(true);
          
          // Reset form
          setFormState({
            name: "",
            email: "",
            subject: "",
            message: ""
          });
          
          // Reset after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          setSubmitError(`Error: ${result.error || 'Failed to send email. Please try again later.'}`);
          console.error("Error sending contact form:", result.error);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setSubmitError(`Error: ${errorMessage}`);
        console.error("Error sending contact form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={fadeIn("up", 0.1)}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-foldams-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or want to learn more about our services? Reach out to us today and our team will be happy to assist you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={fadeIn("right", 0.2)}>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                    </div>
                    
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        <p className="text-sm">{submitError}</p>
                      </div>
                    )}
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-foldams-red hover:bg-opacity-90 text-white transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : 'Send Message'}
                      </Button>
                    </motion.div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
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
                    <h3 className="text-xl font-bold">Message Sent!</h3>
                    <p className="text-gray-600 mt-2">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn("left", 0.3)}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Address</h4>
                      <p className="text-gray-600 mt-1">
                        1504 - 1975 St Laurent Blvd.<br />
                        Ottawa, ON, Canada
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Phone</h4>
                      <p className="text-gray-600 mt-1">
                        <a href="tel:+14389945649" className="hover:text-foldams-red transition-colors">+1 (438) 994-5649</a><br />
                        <a href="tel:+16137933004" className="hover:text-foldams-red transition-colors">+1 (613) 793-3004</a>
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Email</h4>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:info@foldams.com" className="hover:text-foldams-red transition-colors">info@foldams.com</a><br />
                        <a href="mailto:support@foldams.com" className="hover:text-foldams-red transition-colors">support@foldams.com</a>
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">Business Hours</h4>
                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                className="h-64 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: mapLoaded ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {mapLoaded && (
                  <MapContainer 
                    center={position} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>
                        Foldams Inc. <br /> 1504 - 1975 St Laurent Blvd.
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}