
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteSettings } from "@/data/mockData";

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

const FloatingWhatsApp = ({ phoneNumber }: FloatingWhatsAppProps) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [phoneNum, setPhoneNum] = useState(phoneNumber);

  useEffect(() => {
    // Check if there are settings in localStorage
    const storedSettings = localStorage.getItem('siteSettings');
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings.contactInfo && parsedSettings.contactInfo.whatsapp) {
        setPhoneNum(parsedSettings.contactInfo.whatsapp);
      }
    } else {
      setPhoneNum(siteSettings.contactInfo.whatsapp || phoneNumber);
    }
    
    // Show button after page load
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }, [phoneNumber]);

  const handleClick = () => {
    // Format the phone number (remove spaces, dashes, etc.)
    const formattedPhone = phoneNum.replace(/\D/g, "");
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div 
      className={`fixed bottom-6 ${language === "ar" ? "left-6" : "right-6"} z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex items-center justify-center rounded-full bg-green-500 p-4 shadow-lg transition-all duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
        style={{
          boxShadow: isHovered 
            ? "0 0 0 8px rgba(74, 222, 128, 0.3), 0 10px 20px rgba(0, 0, 0, 0.2)" 
            : "0 4px 12px rgba(0, 0, 0, 0.15)"
        }}
      >
        <div className={`absolute -top-10 ${language === "ar" ? "right-0" : "left-0"} whitespace-nowrap bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          {language === "ar" ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
        </div>
        <div className={`absolute w-3 h-3 bg-white transform rotate-45 ${language === "ar" ? "-top-1 right-7" : "-top-1 left-7"} transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}></div>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-25"></span>
        
        {/* Icon */}
        <MessageSquare className="h-8 w-8 text-white" />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
