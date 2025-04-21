
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const ServicesPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
      <Navbar />
      <div className="pt-24 pb-10">
        <Services />
      </div>
      <Footer />
      <FloatingWhatsApp phoneNumber="201234567890" />
    </div>
  );
};

export default ServicesPage;
