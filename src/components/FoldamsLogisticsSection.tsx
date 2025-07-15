import CountdownTimer from "./CountdownTimer";
import CountdownDialog from "./CountdownDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FoldamsLogisticsSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"quote" | "learn">("learn");

  const handleOpenDialog = (type: "quote" | "learn") => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const dialogTitle = dialogType === "quote" 
    ? "Request a Quote" 
    : "Foldams Logistics";

  const dialogDescription = dialogType === "quote"
    ? "Contact us now to get a custom quote for your logistics needs."
    : "Our premium logistics services for all your Canadian delivery needs.";

  return (
    <section id="foldams-logistics" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Foldams Logistics</h2>
            <div className="w-24 h-1 bg-foldams-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our premium logistics division providing fast, reliable, and secure delivery solutions across Canada for businesses and individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To provide seamless logistics solutions across Canada, enabling businesses to thrive with efficient and reliable delivery services.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 mb-6">
                To become the most trusted name in Canadian logistics, known for reliability, innovation, and customer-centered service delivery.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-foldams-red hover:bg-opacity-90 text-white"
                  onClick={() => handleOpenDialog("learn")}
                >
                  Learn More
                </Button>
                <Button 
                  variant="outline" 
                  className="border-foldams-red text-foldams-red hover:bg-foldams-red hover:text-white"
                  onClick={() => handleOpenDialog("quote")}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div 
                className="rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                onClick={() => handleOpenDialog("learn")}
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/assets/images/logistics.jpg" alt="Logistics" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">Canadian Logistics Excellence</h3>
                      <p className="text-sm mt-2 text-white text-opacity-80">Click to learn about our services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Express Delivery</h4>
              <p className="text-gray-600 text-center">
                Fast and reliable delivery to and from any location within Canada, with expedited options available.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Competitive Rates</h4>
              <p className="text-gray-600 text-center">
                Enjoy affordable shipping rates designed to help your business grow without breaking the bank.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-3">Package Protection</h4>
              <p className="text-gray-600 text-center">
                Advanced tracking and insurance options to ensure your packages arrive safely every time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <CountdownDialog
        title={dialogTitle}
        description={dialogDescription}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </section>
  );
}