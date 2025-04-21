
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";

const Hero = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section 
      id="home" 
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "linear-gradient(rgba(20, 33, 61, 0.8), rgba(20, 33, 61, 0.8)), url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-lawfirm-navy/90 to-lawfirm-navy/70"></div>
      
      <div className={`container mx-auto px-4 relative z-10 text-center ${language === "ar" ? "rtl" : "ltr"}`}>
        <div className="flex items-center justify-center mb-6">
          <Gavel className="h-16 w-16 text-lawfirm-gold animate-bounce" />
        </div>
        
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white ${language === "ar" ? "font-arabic" : "font-serif"} mb-4 animate-fade-in`}>
          {t("hero.title")}
        </h1>
        
        <div className="mx-auto w-20 h-1 bg-lawfirm-gold my-6"></div>
        
        <p className={`text-xl md:text-2xl text-white ${language === "ar" ? "font-arabic" : ""} mb-8 max-w-3xl mx-auto animate-slide-in`}>
          {t("hero.subtitle")}
        </p>
        
        <a href="#contact">
          <Button 
            className={`bg-lawfirm-gold hover:bg-amber-500 text-lawfirm-navy ${language === "ar" ? "font-arabic" : ""} text-lg px-8 py-6 rounded-md transition-all duration-300 hover:scale-105 animate-pulse`}
          >
            {t("hero.cta")}
          </Button>
        </a>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
