
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const AboutPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
      <Navbar />
      <div className="pt-24 pb-10 bg-gray-50">
        <About />
      </div>
      <Footer />
      <FloatingWhatsApp phoneNumber="201234567890" />
    </div>
  );
};

export default AboutPage;
