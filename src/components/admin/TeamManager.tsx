
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
import { Edit, Trash2, Plus, Upload } from 'lucide-react';
import { TeamMember } from '@/types';

const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    position: 'محامي رئيسي',
    bio: 'خبرة أكثر من 15 عامًا في القضايا المدنية والتجارية.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: '2',
    name: 'سارة أحمد',
    position: 'مستشار قانوني',
    bio: 'متخصصة في قانون الشركات والملكية الفكرية.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80'
  }
];

// Form schema
const teamMemberSchema = z.object({
  name: z.string().min(1, { message: "الاسم مطلوب" }),
  position: z.string().min(1, { message: "المنصب مطلوب" }),
  bio: z.string().min(1, { message: "نبذة مختصرة مطلوبة" }),
  image: z.string().optional()
});

const TeamManager = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // Load team members from localStorage or use defaults
    const savedMembers = localStorage.getItem('teamMembers');
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    } else {
      setTeamMembers(defaultTeamMembers);
      localStorage.setItem('teamMembers', JSON.stringify(defaultTeamMembers));
    }
  }, []);

  const form = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      position: '',
      bio: '',
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

  const editMember = (member: TeamMember) => {
    setEditMemberId(member.id);
    form.reset({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image
    });
    setImagePreview(member.image);
  };

  const deleteMember = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      const updatedMembers = teamMembers.filter(member => member.id !== id);
      setTeamMembers(updatedMembers);
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      
      toast({
        title: "تم الحذف",
        description: "تم حذف عضو الفريق بنجاح",
      });
    }
  };

  const resetForm = () => {
    form.reset({
      name: '',
      position: '',
      bio: '',
      image: ''
    });
    setEditMemberId(null);
    setSelectedImage(null);
    setImagePreview('');
  };

  const onSubmit = (data: z.infer<typeof teamMemberSchema>) => {
    // Use the image preview if a new image was selected
    const imageUrl = selectedImage ? imagePreview : data.image;
    
    if (editMemberId) {
      // Update existing member
      const updatedMembers = teamMembers.map(member => 
        member.id === editMemberId ? 
        { ...member, ...data, image: imageUrl || member.image } : 
        member
      );
      setTeamMembers(updatedMembers);
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات عضو الفريق بنجاح",
      });
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: uuidv4(),
        name: data.name,
        position: data.position,
        bio: data.bio,
        image: imageUrl || 'https://via.placeholder.com/400x400?text=صورة+الموظف'
      };
      
      const updatedMembers = [...teamMembers, newMember];
      setTeamMembers(updatedMembers);
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة عضو جديد للفريق بنجاح",
      });
    }
    
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة فريق العمل</h2>
        {editMemberId && (
          <Button variant="outline" onClick={resetForm}>
            إضافة عضو جديد
          </Button>
        )}
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editMemberId ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="أدخل اسم العضو" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المنصب</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="أدخل المنصب الوظيفي" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نبذة مختصرة</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="أدخل نبذة مختصرة عن العضو" 
                        className="min-h-[100px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>الصورة الشخصية</FormLabel>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    اختر صورة
                  </Button>
                  <input
                    id="image-upload"
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
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                {editMemberId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                )}
                <Button type="submit">
                  {editMemberId ? 'حفظ التغييرات' : 'إضافة عضو'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mb-4">أعضاء الفريق الحاليين</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <Card key={member.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{member.name}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => editMember(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMember(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <p className="text-sm font-medium text-amber-600">{member.position}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
