
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Article } from '@/types';
import { articles } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

type ArticlesContextType = {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'date'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  getArticle: (id: string) => Article | undefined;
  getFilteredArticles: (language: 'en' | 'ar') => Article[];
};

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  // Initialize articles from mock data or localStorage
  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      setArticles(articles);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, []);

  // Save articles to localStorage whenever they change
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, [articles]);

  const addArticle = (article: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setArticles([...articles, newArticle]);
    toast({
      title: "Article added",
      description: "The article has been added successfully",
    });
  };

  const updateArticle = (id: string, updatedFields: Partial<Article>) => {
    setArticles(
      articles.map((article) => 
        article.id === id ? { ...article, ...updatedFields } : article
      )
    );
    toast({
      title: "Article updated",
      description: "The article has been updated successfully",
    });
  };

  const deleteArticle = (id: string) => {
    setArticles(articles.filter((article) => article.id !== id));
    toast({
      title: "Article deleted",
      description: "The article has been deleted successfully",
    });
  };

  const getArticle = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  const getFilteredArticles = (lang: 'en' | 'ar') => {
    return articles.filter((article) => article.language === lang);
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        articles, 
        addArticle, 
        updateArticle, 
        deleteArticle, 
        getArticle,
        getFilteredArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = (): ArticlesContextType => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};
