
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Upload, Star } from 'lucide-react';
import { Testimonial } from '@/types';

const defaultTestimonials: Testimonial[] = [
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
  }
];

// Form schema
const testimonialSchema = z.object({
  name: z.string().min(1, { message: "اسم العميل مطلوب" }),
  company: z.string().min(1, { message: "اسم الشركة/المؤسسة مطلوب" }),
  text: z.string().min(1, { message: "نص الشهادة مطلوب" }),
  rating: z.coerce.number().min(1).max(5),
  image: z.string().optional()
});

const TestimonialsManager = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editTestimonialId, setEditTestimonialId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // Load testimonials from localStorage or use defaults
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials(defaultTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials));
    }
  }, []);

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      company: '',
      text: '',
      rating: 5,
      image: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const editTestimonial = (testimonial: Testimonial) => {
    setEditTestimonialId(testimonial.id);
    form.reset({
      name: testimonial.name,
      company: testimonial.company,
      text: testimonial.text,
      rating: testimonial.rating,
      image: testimonial.image
    });
    setImagePreview(testimonial.image);
  };

  const deleteTestimonial = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
      const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
      setTestimonials(updatedTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
      
      toast({
        title: "تم الحذف",
        description: "تم حذف الشهادة بنجاح",
      });
    }
  };

  const resetForm = () => {
    form.reset({
      name: '',
      company: '',
      text: '',
      rating: 5,
      image: ''
    });
    setEditTestimonialId(null);
    setSelectedImage(null);
    setImagePreview('');
  };

  const onSubmit = (data: z.infer<typeof testimonialSchema>) => {
    // Use the image preview if a new image was selected
    const imageUrl = selectedImage ? imagePreview : data.image;
    
    if (editTestimonialId) {
      // Update existing testimonial
      const updatedTestimonials = testimonials.map(testimonial => 
        testimonial.id === editTestimonialId ? 
        { ...testimonial, ...data, image: imageUrl || testimonial.image } : 
        testimonial
      );
      setTestimonials(updatedTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث الشهادة بنجاح",
      });
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        id: uuidv4(),
        name: data.name,
        company: data.company,
        text: data.text,
        rating: data.rating,
        image: imageUrl || 'https://via.placeholder.com/150?text=صورة+العميل'
      };
      
      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
      
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة شهادة جديدة بنجاح",
      });
    }
    
    resetForm();
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة آراء وشهادات العملاء</h2>
        {editTestimonialId && (
          <Button variant="outline" onClick={resetForm}>
            إضافة شهادة جديدة
          </Button>
        )}
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editTestimonialId ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم العميل</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="أدخل اسم العميل" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الشركة/المؤسسة</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="أدخل اسم الشركة أو المؤسسة" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نص الشهادة</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="أدخل نص شهادة العميل" 
                        className="min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التقييم (من 1 إلى 5)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input 
                          {...field} 
                          type="number" 
                          min="1" 
                          max="5" 
                          className="w-20" 
                        />
                        <div className="flex">
                          {renderStars(field.value)}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>صورة العميل</FormLabel>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('testimonial-image-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    اختر صورة
                  </Button>
                  <input
                    id="testimonial-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="text-sm text-gray-500">
                    {selectedImage ? selectedImage.name : 'لم يتم اختيار صورة'}
                  </span>
                </div>
                
                {imagePreview && (
                  <div className="mt-4 relative">
                    <img
                      src={imagePreview}
                      alt="معاينة"
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                {editTestimonialId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                )}
                <Button type="submit">
                  {editTestimonialId ? 'حفظ التغييرات' : 'إضافة شهادة'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mb-4">شهادات العملاء الحالية</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map(testimonial => (
          <Card key={testimonial.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                    <div className="flex mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => editTestimonial(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteTestimonial(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
