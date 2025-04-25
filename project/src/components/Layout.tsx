import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Music } from 'lucide-react';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Simulate page loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? (
        <div className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <Music size={48} className="text-primary-500 animate-pulse" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-primary-500" 
                  style={{
                    animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;