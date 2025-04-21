
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useArticles } from '@/context/ArticlesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { getArticle, getFilteredArticles } = useArticles();
  const navigate = useNavigate();
  
  const article = getArticle(id || '');
  const relatedArticles = getFilteredArticles(language)
    .filter(a => a.id !== id && a.category === article?.category)
    .slice(0, 3);

  if (!article) {
    return (
      <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
        <Navbar />
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">{t('articles.notfound')}</h1>
          <Button onClick={() => navigate('/articles')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('articles')}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/articles')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('articles')}
        </Button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-80 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center mb-6 text-gray-600">
              <span>{t('articles.published')}: {article.date}</span>
              <span className="mx-2">•</span>
              <span>{t('articles.by')}: {article.author}</span>
              <span className="mx-2">•</span>
              <span>{t('articles.category')}: {article.category}</span>
            </div>
            
            <div className="prose lg:prose-lg max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t('articles.related')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArticle) => (
                <Card 
                  key={relArticle.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/articles/${relArticle.id}`)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relArticle.image} 
                      alt={relArticle.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{relArticle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-gray-600">{relArticle.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
