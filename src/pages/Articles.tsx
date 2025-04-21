
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useArticles } from '@/context/ArticlesContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Articles = () => {
  const { t, language } = useLanguage();
  const { getFilteredArticles } = useArticles();
  const navigate = useNavigate();
  
  const filteredArticles = getFilteredArticles(language);

  return (
    <div className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
      <Navbar />
      <div className="py-32 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold text-lawfirm-navy mb-4 ${language === "ar" ? "font-arabic" : "font-serif"}`}>
              {t('articles')}
            </h1>
            <div className="h-1 w-24 bg-lawfirm-gold mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {language === "ar" 
                ? "اكتشف أحدث المقالات والأخبار القانونية من خبرائنا"
                : "Discover the latest legal articles and news from our experts"}
            </p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <svg 
                className="w-16 h-16 mx-auto text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 3v18m6-13l-6 6-6-6" />
              </svg>
              <p className="text-xl text-gray-600 mb-2">{t('articles.notfound')}</p>
              <p className="text-gray-500">
                {language === "ar" 
                  ? "سيتم إضافة مقالات جديدة قريبًا"
                  : "New articles will be added soon"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer bg-white" 
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block bg-lawfirm-gold px-3 py-1 text-sm text-lawfirm-navy font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 hover:text-lawfirm-gold transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>
                      {t('articles.published')}: {article.date} | {t('articles.by')}: {article.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-gray-600">{article.content}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-end">
                    <p className="text-lawfirm-gold font-medium group-hover:underline flex items-center">
                      {t('articles.readmore')} 
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${language === "ar" ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp phoneNumber="201234567890" />
    </div>
  );
};

export default Articles;
