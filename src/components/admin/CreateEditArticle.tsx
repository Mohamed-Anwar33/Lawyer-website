
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useArticles } from '@/context/ArticlesContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  image: z.string().url({ message: "Valid image URL is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  language: z.enum(['en', 'ar']),
});

interface CreateEditArticleProps {
  articleId: string | null;
  isCreateMode: boolean;
  onCancel: () => void;
}

const CreateEditArticle: React.FC<CreateEditArticleProps> = ({ 
  articleId, 
  isCreateMode,
  onCancel
}) => {
  const { t, language } = useLanguage();
  const { getArticle, addArticle, updateArticle } = useArticles();
  
  const article = articleId ? getArticle(articleId) : undefined;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      image: article?.image || "",
      author: article?.author || "",
      category: article?.category || "",
      language: article?.language || language,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isCreateMode) {
      addArticle({
        title: values.title,
        content: values.content,
        image: values.image,
        author: values.author,
        category: values.category,
        language: values.language,
      });
    } else if (articleId) {
      updateArticle(articleId, {
        title: values.title,
        content: values.content,
        image: values.image,
        author: values.author,
        category: values.category,
        language: values.language,
      });
    }
    onCancel();
  }

  const categories = [
    { value: language === 'en' ? 'Corporate Law' : 'قانون الشركات' },
    { value: language === 'en' ? 'Family Law' : 'قانون الأسرة' },
    { value: language === 'en' ? 'Criminal Defense' : 'الدفاع الجنائي' },
    { value: language === 'en' ? 'Real Estate Law' : 'قانون العقارات' },
    { value: language === 'en' ? 'Intellectual Property' : 'الملكية الفكرية' },
    { value: language === 'en' ? 'Civil Litigation' : 'التقاضي المدني' },
  ];

  const authors = [
    { value: language === 'en' ? 'Ahmed Ibrahim' : 'أحمد إبراهيم' },
    { value: language === 'en' ? 'Layla Mohammed' : 'ليلى محمد' },
    { value: language === 'en' ? 'Omar Abdullah' : 'عمر عبدالله' },
    { value: language === 'en' ? 'Sarah Khalid' : 'سارة خالد' },
  ];

  const placeholderImages = [
    'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742',
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Button variant="ghost" onClick={onCancel} className="mr-2 p-1">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {isCreateMode ? t('admin.add.article') : t('admin.edit.article')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.article.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.article.content')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={10}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('articles.category')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('articles.by')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.value} value={author.value}>
                          {author.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.article.image')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select image" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {placeholderImages.map((url) => (
                        <SelectItem key={url} value={url}>
                          <div className="flex items-center">
                            <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                              <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <span>Image {placeholderImages.indexOf(url) + 1}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.getValues().image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                <div className="h-40 overflow-hidden rounded-md border">
                  <img 
                    src={form.getValues().image} 
                    alt="Article preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {isCreateMode ? t('admin.article.publish') : t('admin.edit.article')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateEditArticle;
