import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 pt-24 max-w-6xl">
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-center mb-8"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            About Foldams
          </motion.h1>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Since 2020, Foldams has been a trusted name in providing local logistics services across Canada, 
                    delivering quality automotive and spare parts to African countries, and manufacturing 
                    African and Caribbean food items and ingredients.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    We've grown to become a leading distributor of cultural food products across Canada. 
                    Our agricultural products can be found in local grocery stores nationwide, 
                    making authentic African and Caribbean ingredients accessible to communities 
                    everywhere in Canada.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Foldams Logistics</h3>
                    <p className="text-gray-700 flex-grow">
                      Our logistics operation provides reliable local delivery services across Canada, 
                      ensuring that goods reach their destination safely and on time.
                    </p>
                    <Link to="/#foldams-logistics" className="mt-4">
                      <Button className="w-full bg-foldams-red hover:bg-opacity-90">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-4 text-primary">FDM Autos</h3>
                    <p className="text-gray-700 flex-grow">
                      We specialize in exporting quality vehicles and spare parts from abroad to 
                      African countries, helping to meet transportation needs with reliable automotive solutions.
                    </p>
                    <Link to="/#fdm-autos" className="mt-4">
                      <Button className="w-full bg-foldams-red hover:bg-opacity-90">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Foldams Food</h3>
                    <p className="text-gray-700 flex-grow">
                      We manufacture authentic African and Caribbean food items and ingredients, 
                      bringing the rich flavors and culinary traditions to communities across Canada.
                    </p>
                    <Link to="/#foldams-food" className="mt-4">
                      <Button className="w-full bg-foldams-red hover:bg-opacity-90">Learn More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Meet Our CEO
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="md:flex">
                  <motion.div 
                    className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Avatar className="h-64 w-64">
                        <AvatarImage src="/assets/ceo-image.png" alt="Adams Ibrahim" />
                        <AvatarFallback className="text-4xl">AI</AvatarFallback>
                      </Avatar>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="md:w-2/3 p-8"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-2">Adams Ibrahim</h3>
                    <p className="text-gray-500 mb-4">Chief Executive Officer & Founder</p>
                    
                    <div className="space-y-4 text-gray-700">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                      >
                        Adams Ibrahim is a Nigerian-Canadian business mogul who has dedicated almost his entire life 
                        to business development and problem-solving. With a keen eye for opportunities and a passion 
                        for community development, Adams established Foldams with a clear vision.
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                      >
                        His primary aim is to solve problems for the African and Caribbean communities in Canada, 
                        bridging gaps in logistics, automotive needs, and access to authentic cultural food products.
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.9, duration: 0.5 }}
                      >
                        Under his leadership, Foldams has grown into a multi-faceted enterprise that not only 
                        provides essential services but also creates jobs and fosters cultural connections 
                        through its various business divisions.
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5, type: "spring" }}
          >
            Our Mission
          </motion.h2>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 text-center">
                  To provide quality services and products that meet the unique needs of African and Caribbean 
                  communities in Canada, while fostering cultural connections and creating opportunities for growth.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}