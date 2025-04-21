
export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: string;
  language: 'en' | 'ar';
}

export interface Admin {
  email: string;
  password: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export interface SocialMedia {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface WorkingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Location {
  lat: number;
  lng: number;
  zoom: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  image: string;
  rating: number;
}

export interface SiteSettings {
  contactInfo: ContactInfo;
  socialMedia: SocialMedia;
  workingHours: WorkingHours;
  location: Location;
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
}
