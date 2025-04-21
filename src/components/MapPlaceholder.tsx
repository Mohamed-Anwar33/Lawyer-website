
import { MapPinIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MapPlaceholder = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative h-full w-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
      <div className="absolute inset-0 bg-gradient-to-r from-lawfirm-navy/10 to-lawfirm-navy/10"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <MapPinIcon className="w-16 h-16 text-lawfirm-gold mb-4 animate-bounce" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("contact.address")}</h3>
        <p className="text-gray-600 text-center max-w-md">
          {t("contact.phone")} | {t("contact.email")}
        </p>
        <div className="mt-4 bg-white/80 backdrop-blur p-3 rounded-lg shadow-md">
          <p className="text-sm text-gray-700">
            {t('contact.address')}
          </p>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 right-0" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320">
        <path 
          fill="#fca311" 
          fillOpacity="0.2" 
          d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>
  );
};

export default MapPlaceholder;
