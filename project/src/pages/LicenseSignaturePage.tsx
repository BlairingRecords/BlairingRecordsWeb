import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { ArrowLeft, FileText, Trash2, Check } from 'lucide-react';

interface License {
  name: string;
  price: number;
  features: string[];
  restrictions?: string[];
}

const LicenseSignaturePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { beat, license } = location.state || {};

  if (!beat || !license) {
    navigate('/beats');
    return null;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (signatureRef.current?.isEmpty()) {
      newErrors.signature = 'Signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const signature = signatureRef.current?.toDataURL();
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/store-agreement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          beatId: beat.id,
          licenseId: license.id,
          signature,
          fullName,
          email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store agreement');
      }

      // Navigate to payment
      navigate('/checkout/payment', { 
        state: { 
          beat,
          license,
          agreementComplete: true
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Failed to process agreement. Please try again.' });
    }
  };

  return (
    <section className="pt-32 pb-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-primary-500 hover:text-primary-400 mb-6"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>

          <div className="bg-dark-800 p-8 rounded-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-display font-bold">{license.name} Agreement</h1>
              <FileText size={24} className="text-primary-500" />
            </div>

            <div className="prose prose-invert prose-primary max-w-none">
              <p className="text-gray-300">
                This License Agreement (the "Agreement") is made effective as of {currentDate} by and between:
              </p>

              <div className="my-6">
                <p className="font-bold">BLAIRING RECORDS ("Licensor")</p>
                <p className="text-gray-300">represented by WTD.TY</p>
              </div>

              <div className="my-6">
                <p className="font-bold">AND</p>
                <p className="text-gray-300">The purchaser of the beat ("Licensee")</p>
              </div>

              <h2 className="text-xl font-bold mt-8 mb-4">1. License Grant</h2>
              <p>
                Upon purchase of the {license.name.toLowerCase()}, the Licensor grants to Licensee a non-exclusive license to use the musical composition (the "Beat") in accordance with the terms and conditions specified in this Agreement.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">2. Permitted Uses</h2>
              <ul className="space-y-2">
                {license.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Restrictions</h2>
              {(license.restrictions?.length ?? 0) > 0 ? (
                <ul className="space-y-2">
                  {license.restrictions?.map((restriction, index) => (
                    <li key={index} className="text-gray-300">• {restriction}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No additional restrictions apply to this license type.</p>
              )}

              <h2 className="text-xl font-bold mt-8 mb-4">4. Credit and Attribution</h2>
              <p>
                Unless explicitly stated otherwise in the license features, the Licensee must provide credit to the Licensor as "Prod. by WTD.TY" in all uses of the Beat.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Term and Termination</h2>
              <p>
                This Agreement shall commence upon the purchase of the license and shall continue in perpetuity unless terminated due to breach of agreement terms.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Ownership</h2>
              <p>
                The Licensor maintains all ownership rights to the Beat, including but not limited to the copyright to the composition. The Licensee's rights to the Beat are limited to those expressly stated in this Agreement.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Payment</h2>
              <p>
                The license is granted in consideration of the payment of ${license.price}, which shall be paid in full at the time of purchase.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Governing Law</h2>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the United States of America.
              </p>
            </div>
          </div>

          <div className="bg-dark-800 p-8 rounded-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">Sign Agreement</h2>
              <FileText size={24} className="text-primary-500" />
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full legal name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Signature
                </label>
                <div className="relative bg-dark-700 border border-dark-600 rounded-md p-4">
                  <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                      className: 'signature-canvas w-full h-40 bg-dark-700',
                      style: { 
                        borderRadius: '0.375rem',
                        touchAction: 'none'
                      }
                    }}
                    backgroundColor="transparent"
                    penColor="white"
                  />
                  <button
                    onClick={clearSignature}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {errors.signature && (
                  <p className="mt-1 text-sm text-red-500">{errors.signature}</p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-md">
                  {errors.submit}
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  Next Step: Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseSignaturePage;