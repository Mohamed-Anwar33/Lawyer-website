
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Testimonial } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { defaultTestimonials } from '@/data/mockData';

const Testimonials = () => {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage or use defaults
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials(defaultTestimonials || []);
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
      />
    ));
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className={`py-20 bg-white ${language === "ar" ? "rtl-dir" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-lawfirm-navy ${language === "ar" ? "font-arabic" : "font-serif"}`}>
            {language === "ar" ? "آراء العملاء" : "Client Testimonials"}
          </h2>
          <div className="w-20 h-1 bg-lawfirm-gold mx-auto my-4"></div>
          <p className="text-gray-600 mt-4">
            {language === "ar" 
              ? "اطلع على ما يقوله عملاؤنا عن خدماتنا القانونية"
              : "See what our clients say about our legal services"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center mt-auto pt-4 border-t">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-lawfirm-navy">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
