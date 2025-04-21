
import { useLanguage } from "@/context/LanguageContext";
import { GavelIcon, ShieldIcon, LandmarkIcon } from "lucide-react";

const About = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: <GavelIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: "Experienced",
      description: "Over 15 years of successful legal practice"
    },
    {
      icon: <ShieldIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: "Trusted",
      description: "Hundreds of satisfied clients across various industries"
    },
    {
      icon: <LandmarkIcon className="w-10 h-10 text-lawfirm-gold" />,
      title: "Dedicated",
      description: "Committed to achieving the best outcomes for our clients"
    }
  ];

  return (
    <section id="about" className={`py-20 bg-gray-50 ${language === "ar" ? "rtl-dir" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className={`text-3xl md:text-4xl font-bold text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-lawfirm-gold mx-auto my-4"></div>
          <p className="text-gray-600 mt-4">{t("about.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <p className="text-gray-700 mb-6 leading-relaxed">
              {t("about.description")}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t("about.mission")}
            </p>
          </div>

          <div className="relative animate-slide-in" style={{animationDelay: "0.2s"}}>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-lawfirm-gold opacity-20 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80" 
              alt="Law Firm Office" 
              className="rounded-lg shadow-lg relative z-10 transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
                {language === "ar" ? ["متمرسون", "موثوقون", "متفانون"][index] : feature.title}
              </h3>
              <p className="text-gray-600">
                {language === "ar" ? 
                  ["أكثر من 15 عامًا من الممارسة القانونية الناجحة", "المئات من العملاء الراضين عبر مختلف الصناعات", "ملتزمون بتحقيق أفضل النتائج لعملائنا"][index] : 
                  feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
