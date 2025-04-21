
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';
import { useArticles } from '@/context/ArticlesContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Plus, LogOut, Settings, User, FileText, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CreateEditArticle from '@/components/admin/CreateEditArticle';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import TeamManager from '@/components/admin/TeamManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated, logout } = useAdmin();
  const { articles, deleteArticle } = useArticles();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [editArticleId, setEditArticleId] = useState<string | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [activeTab, setActiveTab] = useState('articles');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditArticle = (id: string) => {
    setEditArticleId(id);
    setIsCreateMode(false);
  };

  const handleCreateArticle = () => {
    setEditArticleId(null);
    setIsCreateMode(true);
  };

  const resetEditState = () => {
    setEditArticleId(null);
    setIsCreateMode(false);
  };

  const englishArticles = articles.filter(a => a.language === 'en');
  const arabicArticles = articles.filter(a => a.language === 'ar');

  const confirmDeleteArticle = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المقالة؟')) {
      deleteArticle(id);
      toast({
        title: "تم الحذف",
        description: "تم حذف المقالة بنجاح",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${language === "ar" ? "rtl-dir" : "ltr-dir"}`}>
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              {t('home')}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('admin.logout')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {(isCreateMode || editArticleId) ? (
          <CreateEditArticle
            articleId={editArticleId}
            isCreateMode={isCreateMode}
            onCancel={resetEditState}
          />
        ) : (
          <>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="articles">
                  <FileText className="w-4 h-4 mr-2" />
                  {t('admin.articles.management')}
                </TabsTrigger>
                <TabsTrigger value="team">
                  <Users className="w-4 h-4 mr-2" />
                  فريق العمل
                </TabsTrigger>
                <TabsTrigger value="testimonials">
                  <Star className="w-4 h-4 mr-2" />
                  آراء العملاء
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('admin.site.settings')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{t('admin.articles')}</h2>
                  <Button onClick={handleCreateArticle}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('admin.add.article')}
                  </Button>
                </div>

                <Tabs defaultValue="arabic">
                  <TabsList className="mb-6">
                    <TabsTrigger value="arabic">المقالات العربية</TabsTrigger>
                    <TabsTrigger value="english">المقالات الإنجليزية</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="arabic">
                    <div className="grid grid-cols-1 gap-4">
                      {arabicArticles.length === 0 ? (
                        <Card>
                          <CardContent className="py-8 text-center text-gray-500">
                            لا توجد مقالات عربية بعد. أضف مقالتك الأولى!
                          </CardContent>
                        </Card>
                      ) : (
                        arabicArticles.map(article => (
                          <Card key={article.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex justify-between items-center">
                                <span>{article.title}</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditArticle(article.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => confirmDeleteArticle(article.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardTitle>
                              <CardDescription>
                                {t('articles.published')}: {article.date} | {t('articles.category')}: {article.category}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="line-clamp-2">{article.content}</p>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="english">
                    <div className="grid grid-cols-1 gap-4">
                      {englishArticles.length === 0 ? (
                        <Card>
                          <CardContent className="py-8 text-center text-gray-500">
                            No English articles found. Create your first article!
                          </CardContent>
                        </Card>
                      ) : (
                        englishArticles.map(article => (
                          <Card key={article.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="flex justify-between items-center">
                                <span>{article.title}</span>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEditArticle(article.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => confirmDeleteArticle(article.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardTitle>
                              <CardDescription>
                                {t('articles.published')}: {article.date} | {t('articles.category')}: {article.category}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="line-clamp-2">{article.content}</p>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="team">
                <TeamManager />
              </TabsContent>
              
              <TabsContent value="testimonials">
                <TestimonialsManager />
              </TabsContent>
              
              <TabsContent value="settings">
                <SiteSettingsManager />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
