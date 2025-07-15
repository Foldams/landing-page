import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="/assets/images/logo.png" alt="Foldams Inc Logo" className="h-10" />
              <h3 className="text-xl font-bold mt-2">Foldams Inc</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting continents. Delivering excellence. From logistics to lifestyle to African cuisine.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-foldams-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-foldams-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-foldams-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-foldams-red transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-foldams-red transition-colors">Home</a>
              </li>
              <li>
                <a href="#foldams-logistics" className="text-gray-400 hover:text-foldams-red transition-colors">Foldams Logistics</a>
              </li>
              <li>
                <a href="#fdm-autos" className="text-gray-400 hover:text-foldams-red transition-colors">FDM Autos</a>
              </li>
              <li>
                <a href="#foldams-food" className="text-gray-400 hover:text-foldams-red transition-colors">Foldams Food</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-foldams-red transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Friday:</span>
                <span className="text-gray-400">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday:</span>
                <span className="text-gray-400">10:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday:</span>
                <span className="text-gray-400">Closed</span>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red mt-1 flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-400">1504 - 1975 St Laurent Blvd., Ottawa, ON, Canada</span>
              </li>
              <li className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red mt-1 flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div className="text-gray-400">
                  <div><a href="tel:+14389945649" className="hover:text-foldams-red transition-colors">+1 (438) 994-5649</a></div>
                  <div><a href="tel:+16137933004" className="hover:text-foldams-red transition-colors">+1 (613) 793-3004</a></div>
                </div>
              </li>
              <li className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foldams-red mt-1 flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-gray-400"><a href="mailto:info@foldams.com" className="hover:text-foldams-red transition-colors">info@foldams.com</a></span>
              </li>
            </ul>

          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Foldams Inc. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-foldams-red text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-foldams-red text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-foldams-red text-sm">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}