import { Article, Admin, SiteSettings, Testimonial } from '@/types';

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Importance of Legal Consultation in Business',
    content: 'Legal consultation is crucial for businesses to avoid potential pitfalls and ensure compliance with regulations...',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4ca698?auto=format&fit=crop&w=1000&q=80',
    author: 'John Smith',
    category: 'Business Law',
    date: '2024-01-20',
    language: 'en'
  },
  {
    id: '2',
    title: 'أهمية الاستشارة القانونية في مجال الأعمال',
    content: 'الاستشارة القانونية ضرورية للشركات لتجنب المخاطر المحتملة وضمان الامتثال للوائح...',
    image: 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1000&q=80',
    author: 'أحمد محمد',
    category: 'قانون الأعمال',
    date: '2024-01-20',
    language: 'ar'
  },
  {
    id: '3',
    title: 'Real Estate Law: Key Considerations',
    content: 'Navigating real estate law requires careful attention to detail. This article outlines the key considerations...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    author: 'Emily Johnson',
    category: 'Real Estate Law',
    date: '2024-01-15',
    language: 'en'
  },
  {
    id: '4',
    title: 'قانون العقارات: اعتبارات أساسية',
    content: 'يتطلب التنقل في قانون العقارات اهتمامًا دقيقًا بالتفاصيل. تحدد هذه المقالة الاعتبارات الرئيسية ...',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
    author: 'ليلى خالد',
    category: 'قانون العقارات',
    date: '2024-01-15',
    language: 'ar'
  },
  {
    id: '5',
    title: 'Intellectual Property Rights: A Comprehensive Guide',
    content: 'Protecting your intellectual property is essential in today\'s competitive market. Learn about patents, trademarks, and copyrights...',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
    author: 'David Brown',
    category: 'Intellectual Property',
    date: '2024-01-10',
    language: 'en'
  },
  {
    id: '6',
    title: 'حقوق الملكية الفكرية: دليل شامل',
    content: 'تعد حماية حقوق الملكية الفكرية الخاصة بك أمرًا ضروريًا في سوق اليوم التنافسي. تعرف على براءات الاختراع والعلامات التجارية وحقوق التأليف والنشر ...',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&h=400&q=80',
    author: 'فاطمة حسين',
    category: 'الملكية الفكرية',
    date: '2024-01-10',
    language: 'ar'
  }
];

export const adminUser: Admin = {
  email: 'mohamed@gmail.com',
  password: 'mohamed123'
};

export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'محمد علي',
    company: 'شركة الأمل للتطوير العقاري',
    text: 'حصلنا على خدمة ممتازة من مكتب المحاماة. الفريق محترف ويتعامل مع القضايا بحرفية عالية.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'سمية أحمد',
    company: 'مؤسسة الرواد',
    text: 'أنصح بشدة بخدمات مكتب المحاماة، لقد ساعدونا في حل قضية معقدة كانت تواجهنا منذ فترة طويلة.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4
  },
  {
    id: '3',
    name: 'أحمد محمود',
    company: 'البنك التجاري',
    text: 'خدمة متميزة وفريق محترف. استجابة سريعة واهتمام بالتفاصيل. سعيد جدًا بالنتائج التي حققناها معهم.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5
  }
];

export const siteSettings: SiteSettings = {
  contactInfo: {
    address: 'شارع العليا، الرياض، المملكة العربية السعودية',
    phone: '+966 11 2345678',
    email: 'info@lawfirm.com',
    whatsapp: '+966 50 1234567'
  },
  socialMedia: {
    facebook: 'https://facebook.com/lawfirm',
    twitter: 'https://twitter.com/lawfirm',
    linkedin: 'https://linkedin.com/company/lawfirm',
    instagram: 'https://instagram.com/lawfirm'
  },
  workingHours: {
    monday: '9:00 - 17:00',
    tuesday: '9:00 - 17:00',
    wednesday: '9:00 - 17:00',
    thursday: '9:00 - 17:00',
    friday: '9:00 - 12:00',
    saturday: 'مغلق',
    sunday: 'مغلق'
  },
  location: {
    lat: 24.7136,
    lng: 46.6753,
    zoom: 15
  },
  teamMembers: [],
  testimonials: []
};
