import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FoldamsLogisticsSection from "@/components/FoldamsLogisticsSection";
import FdmAutosSection from "@/components/FdmAutosSection";
import FoldamsFoodSection from "@/components/FoldamsFoodSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Index() {
  // Scroll to the contact section if the URL hash is #contact
  useEffect(() => {
    if (window.location.hash === "#contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (window.location.hash === "#faq") {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <FoldamsLogisticsSection />
        <FdmAutosSection />
        <FoldamsFoodSection />
        <FAQSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}