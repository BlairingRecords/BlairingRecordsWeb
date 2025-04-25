import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Clock, Check } from 'lucide-react';
import { Beat } from '../types/Beat';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLicense, setSelectedLicense] = useState<string>('');
  const [beat] = useState<Beat | null>(location.state?.beat || null);
  const [agreed, setAgreed] = useState(false);
  
  useEffect(() => {
    if (!beat) {
      navigate('/beats');
    }
  }, [beat, navigate]);

  const licenses = [
    {
      id: 'basic',
      name: "Basic License",
      price: 29.99,
      features: [
        "MP3 File",
        "For non-profit use only",
        "Up to 10,000 streams",
        "Credit required (Prod. by WTD.TY)",
        "1 music video"
      ]
    },
    {
      id: 'premium',
      name: "Premium License",
      price: 69.99,
      features: [
        "MP3 & WAV Files",
        "For commercial use",
        "Up to 100,000 streams",
        "Credit required (Prod. by WTD.TY)",
        "1 music video",
        "Radio broadcasting",
        "Distribution on all platforms"
      ]
    },
    {
      id: 'unlimited',
      name: "Unlimited License",
      price: 149.99,
      features: [
        "MP3, WAV & Trackout Files",
        "Unlimited commercial use",
        "Unlimited streams",
        "Credit required (Prod. by WTD.TY)",
        "Multiple music videos",
        "Radio broadcasting",
        "Worldwide distribution rights"
      ]
    }
  ];

  const handleNextStep = () => {
    if (!selectedLicense || !agreed) return;
    
    const license = licenses.find(l => l.id === selectedLicense);
    navigate('/license-signature', { 
      state: { 
        beat,
        license
      }
    });
  };

  if (!beat) return null;

  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-display font-bold mb-6">Select Your License</h1>
            
            <div className="bg-dark-800 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-display font-bold mb-4">Selected Beat</h2>
              <div className="flex items-center">
                <img 
                  src={beat.imageUrl} 
                  alt={beat.title} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{beat.title}</h3>
                  <p className="text-gray-400">{beat.bpm} BPM • {beat.key}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {licenses.map((license) => (
                <div 
                  key={license.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedLicense === license.id 
                      ? 'border-primary-500 bg-primary-900/20' 
                      : 'border-dark-700 hover:border-primary-500/50'
                  }`}
                  onClick={() => setSelectedLicense(license.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-display font-bold">{license.name}</h3>
                    <span className="text-xl font-bold text-primary-500">
                      ${license.price}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {license.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-start">
                        <Check size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-dark-800 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-display font-bold mb-4">Next Steps</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Review & Sign Agreement</h3>
                    <p className="text-gray-400">
                      In the next step, you'll review and sign the complete license agreement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Download size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Complete Purchase</h3>
                    <p className="text-gray-400">
                      After signing, you'll complete your purchase and receive instant access to your files.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Receive Documentation</h3>
                    <p className="text-gray-400">
                      Your signed agreement and purchase receipt will be emailed to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark-800 p-6 rounded-lg mb-8">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-400">
                  I understand that I will need to review and sign a license agreement before completing my purchase.
                </span>
              </label>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!selectedLicense || !agreed}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step: Sign Agreement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;