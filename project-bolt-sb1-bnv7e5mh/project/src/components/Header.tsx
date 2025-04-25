import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, X, Menu } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/beats', label: 'Beats' },
    { path: '/contact', label: 'Contact' },
    { path: '/licenses', label: 'Licenses' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-dark-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Music className="h-8 w-8 text-primary-500 mr-2" />
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tighter text-white">BLAIRING</span>
              <span className="font-display text-xs tracking-widest text-primary-500">RECORDS</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/beats" className="btn-primary">
              Buy Beats
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark-950/95 z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <Music className="h-8 w-8 text-primary-500 mr-2" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tighter text-white">BLAIRING</span>
                <span className="font-display text-xs tracking-widest text-primary-500">RECORDS</span>
              </div>
            </Link>
            <button 
              className="text-white"
              onClick={toggleMobileMenu}
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-2xl font-display ${isActive(link.path) ? 'text-primary-500' : 'text-white'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/beats" 
              className="btn-primary text-center text-lg mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy Beats
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;