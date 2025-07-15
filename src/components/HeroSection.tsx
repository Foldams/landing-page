import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Network nodes
    const nodes: {x: number, y: number, vx: number, vy: number}[] = [];
    const numNodes = Math.floor(window.innerWidth * window.innerHeight / 20000);
    
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
    
    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#3A2B25');
      gradient.addColorStop(0.5, '#1E1512');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nodes and connections
      ctx.strokeStyle = 'rgba(155, 28, 31, 0.1)';
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Move node
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(155, 28, 31, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animation);
    };
  }, []);
  
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Network background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      
      <div className="absolute top-0 left-0 right-0 h-full">
        <div className="relative w-full h-full">
          {/* Global map silhouette */}
          <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/world-map.svg')] bg-no-repeat bg-center bg-contain"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foldams-red">Connecting</span> Continents.<br />
            <span className="text-foldams-red">Delivering</span> Excellence.
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Global logistics, automotive excellence, and agricultural innovation - bringing the world closer together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative group">
              <Button className="bg-foldams-red hover:bg-opacity-90 text-white px-8 py-6 text-lg">
                Our Businesses
              </Button>
              <div className="absolute hidden group-hover:block z-50 mt-2 w-56 origin-top-right bg-white shadow-lg rounded-md divide-y divide-gray-100 focus:outline-none">
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
            <Button 
              asChild
              className="bg-transparent text-white border-white hover:bg-white hover:text-foldams-red px-8 py-6 text-lg"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}