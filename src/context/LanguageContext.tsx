import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type LanguageContextType = {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    'home': 'Home',
    'about': 'About Us',
    'services': 'Services',
    'team': 'Our Team',
    'contact': 'Contact Us',
    'firm.name': 'Elite Law Firm',
    'hero.title': 'Excellence in Legal Services',
    'hero.subtitle': 'Defending Your Rights with Dedication and Expertise',
    'hero.cta': 'Free Consultation',
    'about.title': 'About Our Firm',
    'about.subtitle': 'Committed to Justice Since 2005',
    'about.description': 'Elite Law Firm has been providing exceptional legal services for over 15 years. Our experienced team of legal professionals is committed to serving clients with integrity, expertise, and dedication.',
    'about.mission': 'Our mission is to provide accessible, high-quality legal representation to individuals and businesses alike. We believe in justice for all and work tirelessly to uphold the law and protect our clients\' rights.',
    'services.title': 'Our Practice Areas',
    'services.subtitle': 'Comprehensive Legal Services',
    'service.1.title': 'Corporate Law',
    'service.1.description': 'Expert advice on business formation, contracts, and corporate governance.',
    'service.2.title': 'Family Law',
    'service.2.description': 'Compassionate representation in divorce, custody, and family matters.',
    'service.3.title': 'Criminal Defense',
    'service.3.description': 'Vigorous defense against criminal charges and investigations.',
    'service.4.title': 'Real Estate Law',
    'service.4.description': 'Guidance through property transactions, disputes, and regulations.',
    'service.5.title': 'Intellectual Property',
    'service.5.description': 'Protection for your innovations, brands, and creative works.',
    'service.6.title': 'Civil Litigation',
    'service.6.description': 'Representation in civil disputes, lawsuits, and mediations.',
    'team.title': 'Our Legal Experts',
    'team.subtitle': 'Experienced Attorneys at Your Service',
    'attorney.1.name': 'Ahmed Ibrahim',
    'attorney.1.position': 'Managing Partner',
    'attorney.1.bio': 'With over 20 years of experience in corporate law and litigation.',
    'attorney.2.name': 'Layla Mohammed',
    'attorney.2.position': 'Senior Partner',
    'attorney.2.bio': 'Specializing in family law and dispute resolution.',
    'attorney.3.name': 'Omar Abdullah',
    'attorney.3.position': 'Associate Attorney',
    'attorney.3.bio': 'Expert in intellectual property and commercial law.',
    'attorney.4.name': 'Sarah Khalid',
    'attorney.4.position': 'Associate Attorney',
    'attorney.4.bio': 'Focusing on criminal defense and civil rights.',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re Here to Help',
    'contact.address': '123 Legal Street, City Center',
    'contact.phone': '+123 456 7890',
    'contact.email': 'info@elitelawfirm.com',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'footer.rights': 'All Rights Reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'admin': 'Admin Dashboard',
    'admin.login': 'Admin Login',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.login.button': 'Login',
    'admin.title': 'Admin Dashboard',
    'admin.articles': 'Articles Management',
    'admin.add.article': 'Add New Article',
    'admin.edit.article': 'Edit Article',
    'admin.delete.article': 'Delete Article',
    'admin.article.title': 'Article Title',
    'admin.article.content': 'Article Content',
    'admin.article.image': 'Article Image',
    'admin.article.publish': 'Publish Article',
    'admin.logout': 'Logout',
    'articles': 'Articles',
    'articles.readmore': 'Read More',
    'articles.published': 'Published',
    'articles.by': 'By',
    'articles.category': 'Category',
    'articles.notfound': 'No articles found',
    'articles.related': 'Related Articles',
  },
  ar: {
    'home': 'الرئيسية',
    'about': 'من نحن',
    'services': 'خدماتنا',
    'team': 'فريقنا',
    'contact': 'اتصل بنا',
    'firm.name': 'شركة النخبة للمحاماة',
    'hero.title': 'التميز في الخدمات القانونية',
    'hero.subtitle': 'ندافع عن حقوقك بتفانٍ وخبرة',
    'hero.cta': 'استشارة مجانية',
    'about.title': 'عن شركتنا',
    'about.subtitle': 'ملتزمون بالعدالة منذ عام 2005',
    'about.description': 'تقدم شركة النخبة للمحاماة خدمات قانونية استثنائية منذ أكثر من 15 عامًا. يلتزم فريقنا المتمرس من المحترفين القانونيين بخدمة العملاء بنزاهة وخبرة وتفانٍ.',
    'about.mission': 'مهمتنا هي تقديم تمثيل قانوني ذو جودة عالية وسهولة الوصول للأفراد والشركات على حد سواء. نؤمن بالعدالة للجميع ونعمل بلا كلل لإعلاء شأن القانون وحماية حقوق عملائنا.',
    'services.title': 'مجالات ممارستنا',
    'services.subtitle': 'خدمات قانونية شاملة',
    'service.1.title': 'قانون الشركات',
    'service.1.description': 'نصائح خبيرة في تأسيس الشركات والعقود وحوكمة الشركات.',
    'service.2.title': 'قانون الأسرة',
    'service.2.description': 'تمثيل رحيم في قضايا الطلاق والحضانة والشؤون العائلية.',
    'service.3.title': 'الدفاع الجنائي',
    'service.3.description': 'دفاع قوي ضد التهم الجنائية والتحقيقات.',
    'service.4.title': 'قانون العقارات',
    'service.4.description': 'إرشاد خلال معاملات الممتلكات والنزاعات واللوائح.',
    'service.5.title': 'الملكية الفكرية',
    'service.5.description': 'حماية لابتكاراتك وعلاماتك التجارية وأعمالك الإبداعية.',
    'service.6.title': 'التقاضي المدني',
    'service.6.description': 'تمثيل في النزاعات المدنية والدعاوى القضائية والوساطات.',
    'team.title': 'خبراؤنا القانونيون',
    'team.subtitle': 'محامون ذوو خبرة في خدمتك',
    'attorney.1.name': 'أحمد إبراهيم',
    'attorney.1.position': 'الشريك المدير',
    'attorney.1.bio': 'يتمتع بخبرة تزيد عن 20 عامًا في قانون الشركات والتقاضي.',
    'attorney.2.name': 'ليلى محمد',
    'attorney.2.position': 'شريك رئيسي',
    'attorney.2.bio': 'متخصصة في قانون الأسرة وحل النزاعات.',
    'attorney.3.name': 'عمر عبدالله',
    'attorney.3.position': 'محامٍ مشارك',
    'attorney.3.bio': 'خبير في الملكية الفكرية والقانون التجاري.',
    'attorney.4.name': 'سارة خالد',
    'attorney.4.position': 'محامية مشاركة',
    'attorney.4.bio': 'متخصصة في الدفاع الجنائي وحقوق الإنسان.',
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا للمساعدة',
    'contact.address': '123 شارع القانون، وسط المدينة',
    'contact.phone': '+123 456 7890',
    'contact.email': 'info@elitelawfirm.com',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'admin': 'لوحة التحكم',
    'admin.login': 'تسجيل دخول المدير',
    'admin.email': 'البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.login.button': 'تسجيل الدخول',
    'admin.title': 'لوحة التحكم',
    'admin.articles': 'إدارة المقالات',
    'admin.add.article': 'إضافة مقال جديد',
    'admin.edit.article': 'تعديل المقال',
    'admin.delete.article': 'حذف المقال',
    'admin.article.title': 'عنوان المقال',
    'admin.article.content': 'محتوى المقال',
    'admin.article.image': 'صورة المقال',
    'admin.article.publish': 'نشر المقال',
    'admin.logout': 'تسجيل الخروج',
    'articles': 'المقالات',
    'articles.readmore': 'قراءة المزيد',
    'articles.published': 'تم النشر',
    'articles.by': 'بواسطة',
    'articles.category': 'التصنيف',
    'articles.notfound': 'لم يتم العثور على مقالات',
    'articles.related': 'مقالات ذات صلة',
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar'); // Set Arabic as default

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
