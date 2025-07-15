import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-foldams-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our businesses and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">
                What regions does Foldams Logistics service?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Foldams Logistics primarily operates between Canada, Africa, and the Caribbean. We offer full-service logistics solutions including shipping, customs clearance, warehousing, and last-mile delivery for businesses and individuals moving goods internationally.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">
                How do I track my shipment with Foldams Logistics?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Once your shipment is processed, you'll receive a tracking number via email. You can use this number on our website's tracking portal or contact our customer service team directly for real-time updates on your shipment's status.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">
                What types of vehicles does FDM Autos deal with?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                FDM Autos specializes in both new and quality pre-owned vehicles, focusing on models with proven reliability in African conditions. We also supply genuine spare parts for a wide range of vehicle makes and models, ensuring proper maintenance and longevity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">
                When will Foldams Food products be available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Foldams Food is currently in development with an expected launch in the next 6 months. We're working diligently to bring premium African and Caribbean food products to market. You can subscribe to our newsletter for updates and early access to our product line.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-medium">
                How can I partner with Foldams Inc?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                We welcome partnerships across all our business divisions. For logistics partnerships, automotive dealerships, or food production collaborations, please contact our business development team through the contact form on our website or email us directly at partnerships@foldamsinc.com.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-medium">
                Where are Foldams Inc's offices located?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Foldams Inc is headquartered in Toronto, Canada, with additional operational offices in key African markets and the Caribbean. Our strategic locations allow us to efficiently manage our logistics, automotive, and food businesses across multiple regions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left font-medium">
                What makes Foldams Food products unique?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Foldams Food products stand out through our commitment to authenticity and quality. We work directly with farmers in Africa and the Caribbean to source premium ingredients, preserving traditional recipes and flavors while ensuring sustainable agricultural practices and fair trade principles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}