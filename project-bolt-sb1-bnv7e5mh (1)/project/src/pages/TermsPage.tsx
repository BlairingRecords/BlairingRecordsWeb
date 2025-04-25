import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
          
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert prose-primary max-w-none">
            <p>
              Welcome to Blairing Records. These Terms of Service govern your use of our website and the purchase 
              of beats. By accessing our website and purchasing our beats, you agree to these terms.
            </p>
            
            <h2>1. Licensing</h2>
            <p>
              All beats purchased from Blairing Records are subject to the licensing terms specified at the 
              time of purchase. You may not use our beats outside the scope of the license you purchase. 
              For detailed licensing information, please refer to our Licenses page.
            </p>
            
            <h2>2. Payments</h2>
            <p>
              All payments are processed securely through our payment processors. Prices are subject to change 
              without notice. All purchases are final and non-refundable unless otherwise specified.
            </p>
            
            <h2>3. Beat Ownership</h2>
            <p>
              When you purchase a beat from Blairing Records, you are purchasing a license to use the beat 
              according to the terms of the license. The copyright and ownership of the beat remain with 
              Blairing Records and the producer WTD.TY. 
            </p>
            
            <h2>4. User Content</h2>
            <p>
              If you provide any content to our website (such as comments, feedback, etc.), you grant us a 
              non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute that 
              content for any purpose.
            </p>
            
            <h2>5. Prohibited Activities</h2>
            <p>
              You may not use our website or beats for any illegal or unauthorized purpose. You agree not to 
              violate any laws or regulations when using our services.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              Blairing Records is not liable for any damages arising from your use of our website or beats. 
              We provide our beats "as is" without any warranties.
            </p>
            
            <h2>7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our website and services at any time, 
              without notice, for conduct that we believe violates these Terms or is harmful to other users, 
              us, or third parties, or for any other reason.
            </p>
            
            <h2>8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. It is your responsibility to check our website 
              periodically for changes. Your continued use of our website following the posting of changes 
              constitutes your acceptance of those changes.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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

export default TermsPage;