
import { useLanguage } from "@/context/LanguageContext";
import { 
  BuildingIcon, 
  UsersIcon, 
  ShieldIcon, 
  LandmarkIcon, 
  BookIcon, 
  GavelIcon 
} from "lucide-react";

const Services = () => {
  const { language, t } = useLanguage();

  const services = [
    {
      icon: <BuildingIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.1.title"),
      description: t("service.1.description")
    },
    {
      icon: <UsersIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.2.title"),
      description: t("service.2.description")
    },
    {
      icon: <ShieldIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.3.title"),
      description: t("service.3.description")
    },
    {
      icon: <LandmarkIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.4.title"),
      description: t("service.4.description")
    },
    {
      icon: <BookIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.5.title"),
      description: t("service.5.description")
    },
    {
      icon: <GavelIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: t("service.6.title"),
      description: t("service.6.description")
    }
  ];

  return (
    <section id="services" className={`py-20 ${language === "ar" ? "rtl-dir" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className={`text-3xl md:text-4xl font-bold text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
            {t("services.title")}
          </h2>
          <div className="w-20 h-1 bg-lawfirm-gold mx-auto my-4"></div>
          <p className="text-gray-600 mt-4">{t("services.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex justify-center md:justify-start mb-4">
                {service.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 text-lawfirm-navy text-center md:text-left ${language === "ar" ? "font-arabic" : "font-serif"}`}>
                {service.title}
              </h3>
              <p className="text-gray-600 text-center md:text-left">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-lawfirm-navy rounded-lg shadow-xl p-8 md:p-12 text-center text-white transform transition-transform hover:scale-105 duration-500 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h3 className={`text-2xl font-bold mb-4 ${language === "ar" ? "font-arabic" : "font-serif"}`}>
            {language === "ar" ? "هل تحتاج إلى استشارة قانونية؟" : "Need Legal Consultation?"}
          </h3>
          <p className="mb-6">
            {language === "ar" 
              ? "فريقنا من المحامين ذوي الخبرة جاهز لمساعدتك. اتصل بنا اليوم."
              : "Our team of experienced attorneys is ready to help you. Contact us today."}
          </p>
          <a 
            href="#contact" 
            className={`inline-block bg-lawfirm-gold hover:bg-amber-500 text-lawfirm-navy font-bold py-3 px-8 rounded-md transition-all hover:scale-105 ${language === "ar" ? "font-arabic" : ""}`}
          >
            {language === "ar" ? "اتصل بنا" : "Contact Us"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
