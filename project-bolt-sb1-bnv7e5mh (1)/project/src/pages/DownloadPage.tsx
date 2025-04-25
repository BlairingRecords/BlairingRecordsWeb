import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Download, FileText, Mail, ArrowRight } from 'lucide-react';
import { stripePromise } from '../lib/stripe';

const DownloadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Verify the payment and get order details
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          navigate('/beats');
        });
    } else if (!location.state?.beat || !location.state?.license) {
      navigate('/beats');
    } else {
      setOrderDetails({
        beat: location.state.beat,
        license: location.state.license
      });
      setIsLoading(false);
    }
  }, [sessionId, navigate, location.state]);

  if (isLoading || !orderDetails) return null;

  const { beat, license } = orderDetails;

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const generateReceipt = () => {
    // Generate PDF receipt
    const receiptData = {
      orderDate: new Date().toLocaleDateString(),
      beat: beat.title,
      license: license.name,
      price: license.price,
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    // For now, we'll just console.log the receipt data
    console.log('Receipt:', receiptData);
  };

  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download size={32} className="text-primary-500" />
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-4">Thank You for Your Purchase!</h1>
          <p className="text-gray-400 mb-8">
            Your files are ready for download. The license agreement will be sent to your email within 7 business days.
          </p>

          <div className="bg-dark-800 p-8 rounded-lg mb-8">
            <h2 className="text-xl font-display font-bold mb-4">Order Summary</h2>
            <div className="flex items-center justify-center mb-6">
              <img 
                src={beat.imageUrl} 
                alt={beat.title} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="ml-4 text-left">
                <h3 className="font-bold">{beat.title}</h3>
                <p className="text-gray-400">{license.name}</p>
                <p className="text-primary-500 font-bold">${license.price}</p>
              </div>
            </div>

            <div className="space-y-4">
              {license.id === 'basic' && (
                <button 
                  className="w-full btn-primary"
                  onClick={() => handleDownload(beat.files.mp3)}
                >
                  <Download size={16} className="mr-2" />
                  Download MP3
                </button>
              )}
              
              {(license.id === 'premium' || license.id === 'unlimited') && (
                <>
                  <button 
                    className="w-full btn-primary"
                    onClick={() => handleDownload(beat.files.mp3)}
                  >
                    <Download size={16} className="mr-2" />
                    Download MP3
                  </button>
                  <button 
                    className="w-full btn-primary"
                    onClick={() => handleDownload(beat.files.wav!)}
                  >
                    <Download size={16} className="mr-2" />
                    Download WAV
                  </button>
                </>
              )}
              
              {license.id === 'unlimited' && beat.files.stems && (
                <button 
                  className="w-full btn-primary"
                  onClick={() => beat.files.stems!.forEach(stem => handleDownload(stem))}
                >
                  <Download size={16} className="mr-2" />
                  Download Stems
                </button>
              )}
              
              <button 
                className="w-full btn-outline"
                onClick={generateReceipt}
              >
                <FileText size={16} className="mr-2" />
                Download Purchase Receipt
              </button>
            </div>
          </div>

          <div className="bg-primary-900/30 border border-primary-800 text-primary-200 p-6 rounded-lg mb-8">
            <h3 className="font-bold mb-2">What's Next?</h3>
            <p>
              We'll send the license agreement to your email within 7 business days. 
              Please review, sign, and return it to complete the licensing process.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/beats" className="btn-outline inline-flex items-center">
              Continue Shopping <ArrowRight size={16} className="ml-2" />
            </Link>
            
            <div className="text-sm text-gray-400">
              Questions? Contact us at{' '}
              <a href="mailto:Info@BlairingRecords.com" className="text-primary-500 hover:text-primary-400">
                Info@BlairingRecords.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;