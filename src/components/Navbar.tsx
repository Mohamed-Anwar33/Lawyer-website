
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Globe, Gavel, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAdmin } from "@/context/AdminContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("team"), href: "/team" },
    { label: t("contact"), href: "/#contact" },
    { label: t("articles"), href: "/articles" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <Gavel className="h-8 w-8 text-lawfirm-gold" />
          <span className="text-xl font-bold text-lawfirm-navy">
            {t("firm.name")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 rtl:space-x-reverse items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-gray-700 hover:text-primary transition-colors ${
                (location.pathname === item.href || 
                 (location.pathname === '/' && item.href.startsWith('/#'))) 
                 ? 'font-bold text-lawfirm-gold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Link
              to="/admin"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              {t("admin")}
            </Link>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="ml-2 rtl:ml-0 rtl:mr-2"
          >
            <Globe className="h-5 w-5" />
            <span className="ml-2 rtl:ml-0 rtl:mr-2">{language === "en" ? "AR" : "EN"}</span>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="mr-2 rtl:mr-0 rtl:ml-2"
          >
            <Globe className="h-5 w-5" />
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-8">
                <Gavel className="h-8 w-8 text-lawfirm-gold" />
                <span className="text-xl font-bold text-lawfirm-navy">
                  {t("firm.name")}
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-gray-700 hover:text-primary transition-colors py-2 ${
                      (location.pathname === item.href || 
                       (location.pathname === '/' && item.href.startsWith('/#'))) 
                       ? 'font-bold text-lawfirm-gold' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAuthenticated && (
                  <Link
                    to="/admin"
                    className="text-primary hover:text-primary-dark transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("admin")}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
