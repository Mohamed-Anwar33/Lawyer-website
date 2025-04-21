
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquareIcon, PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import RealMap from "./RealMap";
import { siteSettings } from "@/data/mockData";

const Contact = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: language === "ar" ? "تم إرسال رسالتك بنجاح" : "Message Sent Successfully",
      description: language === "ar" ? "سنتواصل معك قريبًا" : "We'll get back to you soon",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-6 h-6 text-lawfirm-gold" />,
      info: siteSettings.contactInfo.address
    },
    {
      icon: <PhoneIcon className="w-6 h-6 text-lawfirm-gold" />,
      info: siteSettings.contactInfo.phone
    },
    {
      icon: <MailIcon className="w-6 h-6 text-lawfirm-gold" />,
      info: siteSettings.contactInfo.email
    }
  ];

  return (
    <section id="contact" className={`section-padding py-20 ${language === "ar" ? "rtl-dir" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
            {t("contact.title")}
          </h2>
          <div className="golden-divider mx-auto w-20 h-1 bg-lawfirm-gold my-4"></div>
          <p className="text-gray-600 mt-4">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h3 className={`text-xl font-bold mb-6 text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
                {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className={language === "ar" ? "ml-4" : "mr-4"}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-700">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className={`text-xl font-bold mt-8 mb-4 text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
                {language === "ar" ? "ساعات العمل" : "Working Hours"}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  {language === "ar" ? siteSettings.workingHours.monday + " :الاثنين - الجمعة" : "Monday - Friday: " + siteSettings.workingHours.monday}
                </p>
                <p className="text-gray-700">
                  {language === "ar" ? siteSettings.workingHours.saturday + " :السبت" : "Saturday: " + siteSettings.workingHours.saturday}
                </p>
                <p className="text-gray-700">
                  {language === "ar" ? siteSettings.workingHours.sunday + " :الأحد" : "Sunday: " + siteSettings.workingHours.sunday}
                </p>
              </div>
            </div>
            
            {/* Map Container */}
            <div className="h-72 rounded-lg shadow-lg overflow-hidden">
              <RealMap />
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
              <h3 className={`text-xl font-bold mb-6 text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
                {language === "ar" ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.name")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.phone")}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className={`w-full bg-lawfirm-gold hover:bg-amber-500 text-lawfirm-navy hover:scale-105 transition-transform ${language === "ar" ? "font-arabic" : ""}`}
                  >
                    {t("contact.form.submit")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
