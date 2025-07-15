import CountdownTimer from "./CountdownTimer";
import CountdownDialog from "./CountdownDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FdmAutosSection() {
  // Set the launch date for FDM Autos (5 months from current date)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 5);
  
  // Format date for countdown timer: YYYY-MM-DD
  const formattedLaunchDate = launchDate.toISOString().split('T')[0];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"learn" | "register">("learn");

  const handleOpenDialog = (type: "learn" | "register") => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const dialogTitle = dialogType === "register" 
    ? "Register Your Interest" 
    : "FDM Autos Launch Countdown";

  const dialogDescription = dialogType === "register"
    ? "Join our exclusive waiting list for first access to our vehicle export and spare parts services."
    : "Get ready for a revolutionary automotive export experience launching soon!";

  return (
    <section id="fdm-autos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FDM Autos</h2>
            <div className="w-24 h-1 bg-foldams-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Premium automotive solutions exporting luxury vehicles and quality spare parts from abroad to Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div 
              className="rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => handleOpenDialog("learn")}
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <img src="/assets/images/automotive.jpg" alt="Automotive" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">Luxury Automotive Exports</h3>
                    <p className="text-sm mt-2 text-white text-opacity-80">Click to learn about our vehicle and spare parts export services</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose FDM Autos</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-foldams-red rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Premium Selection</h4>
                    <p className="text-gray-600">Carefully curated selection of luxury vehicles and high-quality spare parts for export to African markets.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-foldams-red rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Transparent Process</h4>
                    <p className="text-gray-600">Clear, hassle-free export process with no hidden fees or surprises along the way.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-foldams-red rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Financing Options</h4>
                    <p className="text-gray-600">Flexible payment plans and financing options to make your dream car a reality.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-foldams-red rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">After-Sales Support</h4>
                    <p className="text-gray-600">Comprehensive warranty on vehicles and spare parts with ongoing support to ensure customer satisfaction in Africa.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="bg-foldams-red hover:bg-opacity-90 text-white"
                  onClick={() => handleOpenDialog("register")}
                >
                  Register Interest
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-8">Vehicles & Spare Parts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M5 9l2 -4h7.438a2 2 0 0 1 1.94 1.515l.622 2.485h2a3 3 0 0 1 3 3v3"></path>
                    <path d="M10 9v-4"></path>
                    <path d="M5 9v8"></path>
                    <path d="M19 9v8"></path>
                    <path d="M5 13h14"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Luxury Sedans</h4>
                <p className="text-gray-600">Experience unparalleled comfort and prestige</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M3 9l4 -4h8l4 4"></path>
                    <path d="M5 9v8"></path>
                    <path d="M19 9v8"></path>
                    <path d="M5 13h14"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">SUVs & Crossovers</h4>
                <p className="text-gray-600">Perfect blend of style, space, and versatility</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M5 9l2 -4h7.438a2 2 0 0 1 1.94 1.515l.622 2.485h1a3 3 0 0 1 3 3v1"></path>
                    <path d="M5 9v8"></path>
                    <path d="M19 9v8"></path>
                    <path d="M5 13h14"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Performance Cars</h4>
                <p className="text-gray-600">Engineered for those who demand excellence</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M3 9l4 -4h9l4 4"></path>
                    <path d="M5 9v8"></path>
                    <path d="M19 9v8"></path>
                    <path d="M5 13h14"></path>
                    <path d="M9 9v-4"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Commercial Vehicles</h4>
                <p className="text-gray-600">Reliable workhorses for your business needs</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13l-1 8"></path>
                    <path d="M14 13l1 8"></path>
                    <path d="M12 8v14"></path>
                    <path d="M20 6a2 2 0 0 1 1.743 2.98l-.057 .116a5 5 0 0 1 -2.686 2.72a2 2 0 1 0 -2 3.184a5 5 0 0 1 -6 0a2 2 0 1 0 -2 -3.184a5 5 0 0 1 -2.686 -2.72l-.057 -.116a2 2 0 1 1 1.743 -2.98h12z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Quality Spare Parts</h4>
                <p className="text-gray-600">Genuine components for all vehicle makes and models</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Dialog */}
      <CountdownDialog
        title={dialogTitle}
        description={dialogDescription}
        targetDate={formattedLaunchDate}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </section>
  );
}