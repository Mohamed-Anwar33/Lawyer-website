
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { siteSettings } from '@/data/mockData';
import { SiteSettings } from '@/types';

const SiteSettingsManager = () => {
  const { toast } = useToast();
  const [localSettings, setLocalSettings] = useState<SiteSettings>(siteSettings);
  
  // Schema for contact information
  const contactFormSchema = z.object({
    address: z.string().min(1, { message: "العنوان مطلوب" }),
    phone: z.string().min(1, { message: "رقم الهاتف مطلوب" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
    whatsapp: z.string().min(1, { message: "رقم الواتساب مطلوب" }),
  });

  // Schema for social media
  const socialFormSchema = z.object({
    facebook: z.string().url({ message: "يجب أن يكون رابط صالح" }),
    twitter: z.string().url({ message: "يجب أن يكون رابط صالح" }),
    linkedin: z.string().url({ message: "يجب أن يكون رابط صالح" }),
    instagram: z.string().url({ message: "يجب أن يكون رابط صالح" }),
  });

  // Schema for working hours
  const hoursFormSchema = z.object({
    monday: z.string().min(1, { message: "مطلوب" }),
    tuesday: z.string().min(1, { message: "مطلوب" }),
    wednesday: z.string().min(1, { message: "مطلوب" }),
    thursday: z.string().min(1, { message: "مطلوب" }),
    friday: z.string().min(1, { message: "مطلوب" }),
    saturday: z.string().min(1, { message: "مطلوب" }),
    sunday: z.string().min(1, { message: "مطلوب" }),
  });

  // Schema for location
  const locationFormSchema = z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    zoom: z.coerce.number().min(1).max(20),
  });

  // Setup forms
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      address: localSettings.contactInfo.address,
      phone: localSettings.contactInfo.phone,
      email: localSettings.contactInfo.email,
      whatsapp: localSettings.contactInfo.whatsapp,
    },
  });

  const socialForm = useForm<z.infer<typeof socialFormSchema>>({
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      facebook: localSettings.socialMedia.facebook,
      twitter: localSettings.socialMedia.twitter,
      linkedin: localSettings.socialMedia.linkedin,
      instagram: localSettings.socialMedia.instagram,
    },
  });

  const hoursForm = useForm<z.infer<typeof hoursFormSchema>>({
    resolver: zodResolver(hoursFormSchema),
    defaultValues: {
      monday: localSettings.workingHours.monday,
      tuesday: localSettings.workingHours.tuesday,
      wednesday: localSettings.workingHours.wednesday,
      thursday: localSettings.workingHours.thursday,
      friday: localSettings.workingHours.friday,
      saturday: localSettings.workingHours.saturday,
      sunday: localSettings.workingHours.sunday,
    },
  });

  const locationForm = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      lat: localSettings.location.lat,
      lng: localSettings.location.lng,
      zoom: localSettings.location.zoom,
    },
  });

  // Form submission handlers
  const saveContactInfo = (data: z.infer<typeof contactFormSchema>) => {
    const newSettings = {
      ...localSettings,
      contactInfo: {
        address: data.address,
        phone: data.phone,
        email: data.email,
        whatsapp: data.whatsapp
      }
    };
    setLocalSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ معلومات الاتصال بنجاح",
    });
  };

  const saveSocialMedia = (data: z.infer<typeof socialFormSchema>) => {
    const newSettings = {
      ...localSettings,
      socialMedia: {
        facebook: data.facebook,
        twitter: data.twitter,
        linkedin: data.linkedin,
        instagram: data.instagram
      }
    };
    setLocalSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ روابط التواصل الاجتماعي بنجاح",
    });
  };

  const saveWorkingHours = (data: z.infer<typeof hoursFormSchema>) => {
    const newSettings = {
      ...localSettings,
      workingHours: {
        monday: data.monday,
        tuesday: data.tuesday,
        wednesday: data.wednesday,
        thursday: data.thursday,
        friday: data.friday,
        saturday: data.saturday,
        sunday: data.sunday
      }
    };
    setLocalSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ ساعات العمل بنجاح",
    });
  };

  const saveLocation = (data: z.infer<typeof locationFormSchema>) => {
    const newSettings = {
      ...localSettings,
      location: {
        lat: data.lat,
        lng: data.lng,
        zoom: data.zoom
      }
    };
    setLocalSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ معلومات الموقع بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إعدادات الموقع</h2>
      <p className="text-gray-500">تحكم في معلومات الموقع والتواصل وساعات العمل والموقع الجغرافي</p>

      <Tabs defaultValue="contact">
        <TabsList className="mb-4">
          <TabsTrigger value="contact">معلومات الاتصال</TabsTrigger>
          <TabsTrigger value="social">التواصل الاجتماعي</TabsTrigger>
          <TabsTrigger value="hours">ساعات العمل</TabsTrigger>
          <TabsTrigger value="location">الموقع</TabsTrigger>
        </TabsList>

        {/* Contact Information Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الاتصال</CardTitle>
              <CardDescription>إدارة معلومات الاتصال التي تظهر في الموقع</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(saveContactInfo)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل العنوان" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رقم الهاتف" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل البريد الإلكتروني" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الواتساب</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رقم الواتساب" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">حفظ معلومات الاتصال</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>مواقع التواصل الاجتماعي</CardTitle>
              <CardDescription>إدارة روابط مواقع التواصل الاجتماعي</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...socialForm}>
                <form onSubmit={socialForm.handleSubmit(saveSocialMedia)} className="space-y-4">
                  <FormField
                    control={socialForm.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>فيسبوك</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رابط فيسبوك" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={socialForm.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تويتر</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رابط تويتر" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={socialForm.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>لينكد إن</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رابط لينكد إن" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={socialForm.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>انستجرام</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل رابط انستجرام" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">حفظ مواقع التواصل</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Working Hours Tab */}
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>ساعات العمل</CardTitle>
              <CardDescription>إدارة ساعات العمل التي تظهر في الموقع</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...hoursForm}>
                <form onSubmit={hoursForm.handleSubmit(saveWorkingHours)} className="space-y-4">
                  <FormField
                    control={hoursForm.control}
                    name="monday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاثنين</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="tuesday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الثلاثاء</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="wednesday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الأربعاء</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="thursday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الخميس</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="friday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الجمعة</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="saturday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>السبت</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={hoursForm.control}
                    name="sunday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الأحد</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="أدخل ساعات العمل" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">حفظ ساعات العمل</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>الموقع الجغرافي</CardTitle>
              <CardDescription>تعديل إحداثيات الموقع على الخريطة</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...locationForm}>
                <form onSubmit={locationForm.handleSubmit(saveLocation)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={locationForm.control}
                      name="lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>خط العرض</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.0001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={locationForm.control}
                      name="lng"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>خط الطول</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.0001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={locationForm.control}
                    name="zoom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مستوى التكبير (1-20)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" max="20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="h-72 bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.449450963656!2d46.68402631500884!3d24.706569984129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1650318787101!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <Button type="submit">حفظ الموقع</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsManager;
