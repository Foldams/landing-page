import CountdownTimer from "./CountdownTimer";
import CountdownDialog from "./CountdownDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FoldFarmSection() {
  // Set the launch date for FoldFarm (6 months from current date)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 6);
  
  // Format date for countdown timer: YYYY-MM-DD
  const formattedLaunchDate = launchDate.toISOString().split('T')[0];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"products" | "story">("products");

  const handleOpenDialog = (type: "products" | "story") => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const dialogTitle = dialogType === "products" 
    ? "FoldFarm Product Launch" 
    : "The FoldFarm Story";

  const dialogDescription = dialogType === "products"
    ? "Be among the first to taste our authentic African delicacies. Pre-order now!"
    : "Learn about our mission to bring African agricultural excellence to the world.";

  return (
    <section id="foldfarm" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FoldFarm</h2>
            <div className="w-24 h-1 bg-foldams-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bringing the authentic taste of Africa to the world through our premium farm products and cuisine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Farm to Table Excellence</h3>
              <p className="text-gray-700 mb-6">
                At FoldFarm, we're passionate about sharing the rich flavors and nutritional benefits of authentic African cuisine with the world. Our products are sourced directly from sustainable farms across Africa.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Our Products</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foldams-red mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Premium Spices & Seasonings
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foldams-red mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Organic Grains & Flours
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foldams-red mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Traditional African Teas
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foldams-red mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ready-to-Cook Meal Kits
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foldams-red mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Gourmet African Snacks
                </li>
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-foldams-red hover:bg-opacity-90 text-white"
                  onClick={() => handleOpenDialog("products")}
                >
                  Explore Products
                </Button>
                <Button 
                  variant="outline" 
                  className="border-foldams-red text-foldams-red hover:bg-foldams-red hover:text-white"
                  onClick={() => handleOpenDialog("story")}
                >
                  Our Story
                </Button>
              </div>
            </div>
            
            <div 
              className="rounded-xl overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => handleOpenDialog("products")}
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <img src="/assets/images/agriculture.jpg" alt="Agriculture" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">Farm-Fresh African Produce</h3>
                    <p className="text-sm mt-2 text-white text-opacity-80">Click to explore our upcoming product line</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-8">The FoldFarm Difference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z"/>
                    <path d="M21 12a9 9 0 0 0-9-9v9h9Z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Authenticity</h4>
                <p className="text-gray-600">
                  Every product stays true to traditional African recipes and preparation methods.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22a8 8 0 0 1 8-8h12a8 8 0 0 1-8 8z"></path>
                    <circle cx="16" cy="8" r="6"></circle>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Sustainability</h4>
                <p className="text-gray-600">
                  Ethically sourced ingredients from small-scale farmers using sustainable practices.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-foldams-red rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 12 2 2 4-4"></path>
                    <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path>
                    <path d="M22 19H2"></path>
                    <path d="M2 11h20"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Quality Assurance</h4>
                <p className="text-gray-600">
                  Rigorous testing and quality controls to ensure the best flavor and nutrition in every product.
                </p>
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