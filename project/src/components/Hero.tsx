import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';

const Hero = () => {
  const waveRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!waveRef.current || !visualizerRef.current) return;
      
      const xPos = e.clientX / window.innerWidth;
      const yPos = e.clientY / window.innerHeight;
      
      // Parallax effect for waves
      waveRef.current.style.transform = `translateX(${xPos * -20}px) translateY(${yPos * -10}px)`;
      
      // Parallax effect for visualizer
      visualizerRef.current.style.transform = `translateX(${xPos * 20}px) translateY(${yPos * 20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark-950 opacity-90"></div>
        
        {/* Moving background elements */}
        <div ref={waveRef} className="absolute bottom-0 left-0 right-0 z-10">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-float"></div>
        
        {/* Background Visualizer */}
        <div 
          ref={visualizerRef}
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(90deg, rgba(20,184,166,0.1) 1px, transparent 1px), linear-gradient(rgba(20,184,166,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h5 className="text-primary-500 font-display tracking-widest mb-2">BLAIRING RECORDS</h5>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Premium Beats By <br />
            <span className="text-primary-400">WTD.TY</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Elevate your sound with professional, high-quality beats crafted for artists who 
            demand excellence. Unique sounds that help you stand out.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/beats" className="btn-primary">
              Browse Beats
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {/* Legal Links */}
          <div className="mt-8 text-sm text-gray-400 flex gap-4">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-primary-500 text-sm mb-2">Scroll Down</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0L8 20" stroke="#14B8A6" strokeWidth="2"/>
          <path d="M15 13L8 20L1 13" stroke="#14B8A6" strokeWidth="2"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;