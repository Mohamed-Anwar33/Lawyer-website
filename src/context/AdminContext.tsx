
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { adminUser } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

type AdminContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Check if admin is already logged in
  useEffect(() => {
    const adminStatus = localStorage.getItem('adminStatus');
    if (adminStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    console.log("Login attempt:", { email, password });
    console.log("Expected:", { email: adminUser.email, password: adminUser.password });
    
    // Use exact matching for both email and password
    if (email === adminUser.email && password === adminUser.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminStatus', 'authenticated');
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminStatus');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard",
    });
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
