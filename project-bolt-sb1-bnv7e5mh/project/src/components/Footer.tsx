import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, Phone, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Music className="h-6 w-6 text-primary-500 mr-2" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-tighter text-white">BLAIRING</span>
                <span className="font-display text-xs tracking-widest text-primary-500">RECORDS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Premium beats crafted by producer WTD.TY. Elevate your sound with our high-quality productions.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/beats" className="text-gray-400 hover:text-primary-500 transition-colors">All Beats</Link>
              </li>
              <li>
                <Link to="/licenses" className="text-gray-400 hover:text-primary-500 transition-colors">Licensing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-primary-500" />
                <a href="mailto:Info@BlairingRecords.com" className="hover:text-primary-500 transition-colors">
                  Info@BlairingRecords.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-primary-500" />
                <a href="tel:7345364562" className="hover:text-primary-500 transition-colors">
                  (734) 536-4562
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Blairing Records. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/terms" className="text-gray-500 hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/licenses" className="text-gray-500 hover:text-primary-500 transition-colors">
              Licenses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;