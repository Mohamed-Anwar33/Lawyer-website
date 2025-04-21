
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const TeamPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
      <Navbar />
      <div className="pt-24 pb-10 bg-gray-50">
        <Team />
      </div>
      <Footer />
      <FloatingWhatsApp phoneNumber="201234567890" />
    </div>
  );
};

export default TeamPage;
