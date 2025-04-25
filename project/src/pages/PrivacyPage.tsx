import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-primary max-w-none">
            <p>
              At Blairing Records, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your personal information when you use our website.
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account, 
              purchase a beat, or contact us. This may include:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and payment information</li>
              <li>Any other information you choose to provide</li>
            </ul>
            
            <p>
              We also automatically collect certain information when you visit our website, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Pages viewed</li>
              <li>Time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Process transactions</li>
              <li>Send you transaction confirmations</li>
              <li>Respond to your comments and questions</li>
              <li>Provide customer service</li>
              <li>Send you promotional emails (if you opt in)</li>
              <li>Improve our website and offerings</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties except 
              in the following circumstances:
            </p>
            <ul>
              <li>To service providers who assist us in operating our website and business</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
              <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            </ul>
            
            <h2>4. Cookies</h2>
            <p>
              We use cookies to improve your experience on our website. You can choose to disable cookies 
              through your browser settings, but this may affect your ability to use some features of our website.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement a variety of security measures to protect your personal information. However, no 
              method of transmission over the Internet or electronic storage is 100% secure, so we cannot 
              guarantee absolute security.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to certain processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
            
            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically 
              for any changes.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: Info@BlairingRecords.com<br />
              Phone: (734) 536-4562
            </p>
            
            <p className="mt-8 text-sm text-gray-400">
              Last updated: June 15, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;